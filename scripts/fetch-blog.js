/**
 * Pre-build script: Fetches published articles from Notion database,
 * downloads cover images locally, and updates blogData in data.json.
 *
 * Usage: node scripts/fetch-blog.js
 * Requires: NOTION_TOKEN env var (get from https://www.notion.so/my-integrations)
 *
 * Notion Database ID: 3042c773-5483-4ede-b5a2-0c984e038a4d
 *
 * Workflow:
 *   1. Write article in Notion, upload a cover image, set Status = Published
 *   2. Run: npm run fetch-blog
 *   3. Script downloads cover images to public/images/blog/
 *   4. Script updates src/data.json blogData array
 *   5. Deploy: npm run build
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '..', 'src', 'data.json');
const imgDir = path.join(__dirname, '..', 'public', 'images', 'blog');

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DB_ID = process.env.NOTION_BLOG_DB_ID || '3042c773-5483-4ede-b5a2-0c984e038a4d';

if (!NOTION_TOKEN) {
  console.log('⚠ NOTION_TOKEN not set — skipping blog fetch. Using existing data.json.');
  console.log('  Set it via: export NOTION_TOKEN=ntn_xxx  (or add to .env)');
  process.exit(0);
}

// Ensure blog images directory exists
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

async function notionFetch(endpoint, body) {
  const res = await fetch(`https://api.notion.com/v1${endpoint}`, {
    method: body ? 'POST' : 'GET',
    headers: {
      'Authorization': `Bearer ${NOTION_TOKEN}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`Notion API error: ${res.status} ${await res.text()}`);
  return res.json();
}

/**
 * Downloads an image from a URL and saves it locally.
 * Returns the local path like /images/blog/my-article.jpg
 */
async function downloadImage(url, slug) {
  // If it's already a local path, keep it
  if (url.startsWith('/images/')) return url;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const contentType = res.headers.get('content-type') || 'image/jpeg';
    const ext = contentType.includes('png') ? '.png'
      : contentType.includes('webp') ? '.webp'
      : contentType.includes('gif') ? '.gif'
      : '.jpg';

    const filename = `${slug}${ext}`;
    const filePath = path.join(imgDir, filename);
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    console.log(`  📷 Downloaded: ${filename} (${Math.round(buffer.length / 1024)}KB)`);
    return `/images/blog/${filename}`;
  } catch (err) {
    console.warn(`  ⚠ Failed to download image for "${slug}": ${err.message}`);
    return '/images/services-3.jpg'; // fallback
  }
}

/**
 * Finds the first image block in the page content (uploaded to Notion).
 * Notion image blocks have type: "image" with file.url or external.url
 */
function findFirstImage(blocks) {
  for (const block of blocks) {
    if (block.type === 'image') {
      if (block.image?.file?.url) return block.image.file.url;
      if (block.image?.external?.url) return block.image.external.url;
    }
  }
  return null;
}

function slugify(text) {
  return text.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 60);
}

function richTextToHtml(richTextArray) {
  return richTextArray.map(rt => {
    let text = rt.plain_text || '';
    if (rt.annotations?.bold) text = `<strong>${text}</strong>`;
    if (rt.annotations?.italic) text = `<em>${text}</em>`;
    if (rt.annotations?.code) text = `<code>${text}</code>`;
    if (rt.href) text = `<a href="${rt.href}" target="_blank">${text}</a>`;
    return text;
  }).join('');
}

function blocksToParaList(blocks) {
  const paraList = [];
  for (const block of blocks) {
    let html = '';
    switch (block.type) {
      case 'paragraph':
        html = richTextToHtml(block.paragraph?.rich_text || []);
        if (html) paraList.push({ text: html });
        break;
      case 'heading_1':
        html = richTextToHtml(block.heading_1?.rich_text || []);
        if (html) paraList.push({ text: `<strong>${html}</strong>` });
        break;
      case 'heading_2':
        html = richTextToHtml(block.heading_2?.rich_text || []);
        if (html) paraList.push({ text: `<strong>${html}</strong>` });
        break;
      case 'heading_3':
        html = richTextToHtml(block.heading_3?.rich_text || []);
        if (html) paraList.push({ text: `<strong>${html}</strong>` });
        break;
      case 'bulleted_list_item':
        html = richTextToHtml(block.bulleted_list_item?.rich_text || []);
        if (html) paraList.push({ text: `• ${html}` });
        break;
      case 'numbered_list_item':
        html = richTextToHtml(block.numbered_list_item?.rich_text || []);
        if (html) paraList.push({ text: html });
        break;
      case 'quote':
        html = richTextToHtml(block.quote?.rich_text || []);
        if (html) paraList.push({ text: `<em>"${html}"</em>` });
        break;
      // Skip image blocks (they're used for cover, not inline)
      case 'image':
        break;
      default:
        break;
    }
  }
  return paraList;
}

function formatDate(isoDate) {
  const d = new Date(isoDate);
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  return `${d.getDate()} ${months[d.getMonth()]}, ${d.getFullYear()}`;
}

async function main() {
  console.log('📝 Fetching published articles from Notion...\n');

  const queryResult = await notionFetch(`/databases/${NOTION_DB_ID}/query`, {
    filter: { property: 'Status', select: { equals: 'Published' } },
    sorts: [{ property: 'Date', direction: 'descending' }],
  });

  console.log(`Found ${queryResult.results.length} published article(s)\n`);

  const articles = [];
  for (const page of queryResult.results) {
    const props = page.properties;
    const title = props.Title?.title?.[0]?.plain_text || 'Untitled';
    const date = props.Date?.date?.start || new Date().toISOString().split('T')[0];
    const slug = slugify(title);

    console.log(`→ "${title}"`);

    // Fetch page blocks for content
    const blocksResult = await notionFetch(`/blocks/${page.id}/children`);
    const blocks = blocksResult.results;

    // Resolve cover image (priority: Notion page cover > first image block > Image property > fallback)
    let imageUrl = null;

    // 1. Check for Notion page cover
    if (page.cover?.file?.url) imageUrl = page.cover.file.url;
    else if (page.cover?.external?.url) imageUrl = page.cover.external.url;

    // 2. Check for first image block in content
    if (!imageUrl) imageUrl = findFirstImage(blocks);

    // 3. Fall back to the Image property field
    if (!imageUrl) imageUrl = props.Image?.url || null;

    // 4. Download and save locally (or use fallback)
    const localImgPath = imageUrl
      ? await downloadImage(imageUrl, slug)
      : '/images/services-3.jpg';

    // Convert blocks to paragraph list (excluding image blocks)
    const paraList = blocksToParaList(blocks);

    // If no content blocks, use summary
    if (paraList.length === 0) {
      const summary = props.Summary?.rich_text?.[0]?.plain_text || '';
      if (summary) paraList.push({ text: summary });
    }

    articles.push({
      ImgLink: localImgPath,
      date: formatDate(date),
      delay: String(700 + articles.length * 100),
      title,
      paragraphList: paraList,
    });

    console.log(`  ✅ ${paraList.length} paragraph(s), image: ${localImgPath}\n`);
  }

  if (articles.length === 0) {
    console.log('No published articles found. Keeping existing blogData.');
    return;
  }

  // Update data.json
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  data.blogData = articles;
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  console.log(`\n✅ Updated blogData with ${articles.length} articles.`);
  console.log(`   Images saved to: public/images/blog/`);
  console.log(`   Now run: npm run build`);
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});

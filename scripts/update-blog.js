import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '..', 'src', 'data.json');

const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Clean up accidental markers
delete data.blogData_old_removed;
delete data.blogData_marker;

// Fresh blog articles
data.blogData = [
  {
    ImgLink: "/images/services-3.jpg",
    date: "1 April, 2026",
    delay: "700",
    title: "The Agentic AI Framework: Building Autonomous Enterprise Systems",
    paragraphList: [
      { text: "The enterprise AI landscape is shifting from single-purpose models to multi-agent systems that can reason, plan, and act autonomously. As VP of Data, Analytics & AI, I have been at the forefront of designing and deploying Agentic AI frameworks that fundamentally change how organizations operate." },
      { text: "<strong>What Are Agentic AI Systems?</strong>" },
      { text: "Unlike traditional AI that responds to a single prompt, Agentic AI deploys multiple specialized agents that collaborate on complex workflows. Think of it as an autonomous workforce: one agent monitors data pipelines, another handles anomaly detection, a third generates executive reports, and an orchestration layer coordinates them all without human intervention." },
      { text: "<strong>The Architecture That Works</strong>" },
      { text: "After deploying these systems across financial services and enterprise environments, I have found that successful Agentic AI requires three layers: an orchestration engine (typically LLM-powered with tool-use capabilities), a retrieval-augmented generation (RAG) layer for grounding agents in real enterprise data, and a governance framework that ensures every autonomous decision is auditable and compliant." },
      { text: "<strong>Real-World Impact</strong>" },
      { text: "At Alpha Data Capital, our Agentic AI systems handle everything from automated due diligence workflows to real-time market signal processing. The results speak for themselves: 40+ hours saved per month on average, 3x improvement in lead response rates, and deployment timelines measured in days rather than quarters." },
      { text: "<strong>The Key Insight</strong>" },
      { text: "The organizations that win with Agentic AI are not the ones with the most sophisticated models. They are the ones with the cleanest data architecture, the clearest governance policies, and leadership that understands AI as a strategic capability rather than a technology experiment. The agent is only as good as the data foundation it stands on." }
    ]
  },
  {
    ImgLink: "/images/consulting.png",
    date: "15 March, 2026",
    delay: "800",
    title: "From BI Dashboards to Decision Intelligence: The Evolution of Analytics Leadership",
    paragraphList: [
      { text: "Over 14 years in data and analytics, I have watched the industry evolve from static report generation to real-time decision intelligence. The shift is not just technological. It is a fundamental change in how organizations value and leverage data at every level." },
      { text: "<strong>Phase 1: The Report Builder Era</strong>" },
      { text: "Early in my career at companies like Infosys and Axis Reinsurance, analytics meant building reports. Extract data, format it, deliver it to stakeholders who would make decisions days later. The value was in accuracy and presentation. Tools like SAP BusinessObjects and early Tableau dominated." },
      { text: "<strong>Phase 2: Self-Service & Democratization</strong>" },
      { text: "At MUFG and later at Adobe, the paradigm shifted. Leadership no longer wanted reports delivered to them. They wanted to explore data themselves. My role evolved from builder to architect: designing self-service ecosystems where business users could find answers independently while maintaining data quality and governance underneath." },
      { text: "<strong>Phase 3: Predictive & Prescriptive Analytics</strong>" },
      { text: "At Nomura, directing BI and analytics across the Americas, the question changed from 'what happened' to 'what will happen and what should we do about it.' Machine learning models started sitting alongside dashboards, feeding predictions directly into trading and risk workflows." },
      { text: "<strong>Phase 4: Decision Intelligence & Agentic Systems</strong>" },
      { text: "Today at Alpha Data Capital, we are building systems that do not just predict outcomes. They take action. Agentic AI pipelines that monitor, reason, and execute based on the data architecture we have spent years perfecting. The dashboard is no longer the end product. It is one interface into an intelligent system that never sleeps." },
      { text: "<strong>What This Means for Analytics Leaders</strong>" },
      { text: "The most important skill for a modern analytics leader is not technical mastery of any single tool. It is the ability to translate business strategy into data architecture, build teams that span engineering and business acumen, and create governance frameworks that make autonomous systems trustworthy." }
    ]
  },
  {
    ImgLink: "/images/services-12.jpg",
    date: "1 March, 2026",
    delay: "900",
    title: "Enterprise AI Cost Optimization: Model Routing & Strategic Infrastructure",
    paragraphList: [
      { text: "Enterprise AI adoption is accelerating, but so are the bills. Many organizations are discovering that their AI infrastructure costs are growing faster than the value they deliver. After designing AI cost optimization frameworks for multiple enterprises, here is the practical playbook for cutting AI spend by 40% or more without sacrificing capability." },
      { text: "<strong>The Problem: One Model Does Not Fit All</strong>" },
      { text: "Most enterprises default to routing every AI request through their most powerful (and expensive) model. A simple text classification task gets the same compute as a complex reasoning chain. This is like flying first class for a trip to the corner store." },
      { text: "<strong>Strategy 1: Intelligent Model Routing</strong>" },
      { text: "The biggest single lever for cost reduction. Implement a routing layer that analyzes each request and directs it to the appropriate model tier. Simple tasks go to smaller, cheaper models. Complex reasoning goes to frontier models. In practice, 60-70% of enterprise AI requests can be handled by smaller models at a fraction of the cost." },
      { text: "<strong>Strategy 2: Caching & Semantic Deduplication</strong>" },
      { text: "Many enterprise AI requests are semantically identical. A well-designed caching layer with semantic similarity matching can eliminate 20-30% of redundant API calls. Combine this with prompt template optimization and you significantly reduce token consumption." },
      { text: "<strong>Strategy 3: RAG Over Fine-Tuning</strong>" },
      { text: "Fine-tuning is expensive and creates model management overhead. For most enterprise use cases, retrieval-augmented generation (RAG) with a well-structured knowledge base delivers comparable results at a fraction of the cost. Reserve fine-tuning for truly specialized domains." },
      { text: "<strong>Strategy 4: Governance-First Architecture</strong>" },
      { text: "Without governance, AI costs spiral. Implement usage monitoring, per-team budgets, and automated alerts. Create a model catalog that maps approved models to use cases. This is not just about cost. It is about ensuring every AI dollar delivers measurable business value." },
      { text: "<strong>The Dashboard Approach</strong>" },
      { text: "I have built a Power BI dashboard that visualizes enterprise AI spend across these dimensions: model routing efficiency, cache hit rates, cost-per-inference by use case, and projected savings from optimization strategies. It turns abstract cost conversations into actionable executive decisions." }
    ]
  }
];

// Add Power BI project to portfolioData (insert after Beast Games)
const powerBiProject = {
  ImgLink: "/images/comingsoon-1.jpg",
  subTitle: "Power BI \u00b7 AI Strategy \u00b7 Model Routing",
  title: "Enterprise AI Cost Optimization Dashboard",
  link: "",
  paragraphList: [
    { text: "<strong>Overview</strong><br/>A Power BI executive dashboard designed to visualize and optimize enterprise AI infrastructure spend. The dashboard provides real-time visibility into AI costs across model tiers, use cases, and business units, enabling data-driven decisions about where to invest, where to cut, and how to maximize ROI on AI initiatives." },
    { text: "<strong>Key Features</strong><br/>\u2022 <strong>Model Routing Analysis</strong> \u2014 Visualizes request distribution across model tiers (frontier vs. mid-tier vs. lightweight), identifying opportunities to route 60-70% of simple tasks to cheaper models<br/>\u2022 <strong>Cost-Per-Inference Tracking</strong> \u2014 Breaks down spend by department, use case, and model<br/>\u2022 <strong>Cache Hit Rate Monitoring</strong> \u2014 Measures semantic deduplication effectiveness and projects savings<br/>\u2022 <strong>Savings Simulator</strong> \u2014 Interactive what-if analysis showing projected cost reduction from implementing optimization strategies" },
    { text: "<strong>Business Impact</strong><br/>The framework demonstrates how enterprises can reduce AI infrastructure costs by 40%+ through intelligent model routing, tiered inference architecture, and governance-first design \u2014 without sacrificing model quality or response time." },
    { text: "<strong>Tech Stack</strong><br/>Built with <strong>Power BI</strong> (DAX, Power Query), connected to AI usage telemetry via <strong>Azure Monitor</strong> and <strong>REST APIs</strong>. Data modeling follows a star schema optimized for cost attribution across organizational hierarchies." }
  ]
};

// Insert at position 1 (after Beast Games)
data.portfolioData.splice(1, 0, powerBiProject);

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log("Done: Updated blogData (3 articles) and added Power BI portfolio entry");

# Visual asset manifest — 2026-08-27

Generation mode: built-in ImageGen. The final prompt set used a shared direction of natural, photorealistic documentary/editorial photography for regulated financial-services work; restrained navy, near-black, muted violet, and teal accents; believable office light; centered crop-safe subjects; no logos, watermarks, readable interface copy, or recognizable third-party faces. Umair's supplied photographs were used only as identity references for the two portraits.

| Asset | Final prompt subject / intended alt text |
| --- | --- |
| `/images/home-banner-fde.webp` | Umair Tareen in a navy suit inside a financial-services operations office at night. |
| `/images/about-banner-fde.webp` | Head-and-shoulders portrait of Umair Tareen in the same late-night office. |
| `/images/services-discovery.webp` | Two colleagues marking up a scope and workstream plan. |
| `/images/services-client-environment.webp` | Engineer at a controlled release console with an access badge. |
| `/images/services-audit-chain.webp` | Physical chain of tamper-evident record blocks with one broken record. |
| `/images/services-handover.webp` | Client operators at a console with a completed runbook and access keys. |
| `/images/deploy-grc-onsite.webp` | Risk committee reviewing a controls matrix and evidence pack. |
| `/images/deploy-bank-audit.webp` | Audit binder and terminal on an investment-bank operations floor at night. |
| `/images/deploy-ledgerproof.webp` | Local server beneath an accounting desk with redaction and audit console. |
| `/images/deploy-orchest.webp` | Owned GPU workstation and local-model console in an ordinary office. |
| `/images/deploy-cost-dashboard.webp` | Dark model-routing dashboard with cost curves and governance thresholds. |
| `/images/blog/onsite-playbook.webp` | Blank visitor badge, laptop, and notebook at an unfamiliar office entrance. |
| `/images/blog/fde-job.webp` | Engineer embedded beside a client operator at a shared workstation. |
| `/images/blog/change-control.webp` | Release cards moving through an orderly approval gate. |
| `/images/blog/audit-trail-product.webp` | Examiner following chained evidence records through a printed audit pack. |
| `/images/blog/own-your-ai.webp` | Local dual-GPU workstation downloading open model weights. |
| `/images/blog/pipelines-loops-agents.svg` | Straight pipeline, guarded loop, and branching agent paths. This is an authored SVG, not a generated raster. |
| `/images/beast-games-dashboard.png` | Existing real Beast Games dashboard screenshot, deliberately retained. |

All new raster assets are WebP and remain below their handoff budgets: hero 69 KB, about 37 KB, cards 52–124 KB, and article covers 52–105 KB.

## Integration map

- `src/data.json` owns every visual path.
- `src/components/Service/Service.jsx` mounts the hash chain for “Production with an audit trail.”
- `src/components/Portfolio/Portfolio.jsx` mounts the compact and expanded Ledgerproof hash-chain states.
- `src/components/Blog/Blog.jsx` mounts the pipeline/loop/agent graphic for the matching Field Note.
- `src/components/graphics/HashChainVisual.jsx` and `PipelineFlowGraphic.jsx` contain the reduced-motion-safe GSAP behavior.
- Runtime dependency: `gsap@3.15.0`.


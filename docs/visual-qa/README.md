# Visual QA — 2026-08-27

The refreshed portfolio was reviewed in the local production build with OpenCLI at a 1918 px desktop viewport. The final mobile Lighthouse run used the default simulated mobile profile.

## Screenshots

- [Home hero](./home-desktop.png)
- [How I work](./how-i-work-desktop.png)
- [Deployments](./deployments-desktop.png)
- [Field notes](./field-notes-desktop.png)
- [Audit-chain motion](./hash-chain-desktop.png)

## Lighthouse comparison

| Category | Before (repository HEAD) | After |
| --- | ---: | ---: |
| Performance | 80 | 85 |
| Accessibility | 88 | 88 |
| Best Practices | 100 | 100 |
| SEO | 83 | 83 |

Final lab metrics: FCP 3.0 s, LCP 3.4 s, TBT 130 ms, CLS 0, Speed Index 3.3 s. The machine-readable final report is [lighthouse-mobile-after.json](./lighthouse-mobile-after.json).

The remaining accessibility findings (ARIA attribute usage, an unnamed button, and heading order) predate this visual pass and are outside its scope.

## Motion and performance notes

- `HashChainVisual` and `PipelineFlowGraphic` load with `React.lazy`.
- GSAP is dynamically imported only after each graphic intersects the viewport.
- Both graphics respect `prefers-reduced-motion`; their static state remains meaningful.
- The three motion chunks total about 30.5 KB gzip, comfortably below the 200 KB handoff budget.
- The optional Three.js hero was not added because a documentary portrait communicates the positioning more directly and avoids unnecessary main-thread/GPU cost.


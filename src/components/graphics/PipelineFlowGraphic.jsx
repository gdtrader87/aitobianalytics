import { useEffect, useRef, useState } from 'react';

const PipelineFlowGraphic = () => {
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    let active = true;
    let context;
    import('gsap').then(({ gsap }) => {
      if (!active || !containerRef.current) return;
      context = gsap.context(() => {
        const timeline = gsap.timeline({ repeat: -1, repeatDelay: 0.45 });
        timeline
          .fromTo('[data-dot="pipeline"]', { x: 0, autoAlpha: 0.35 }, { x: 304, autoAlpha: 1, duration: 1.7, ease: 'none' })
          .fromTo('[data-dot="loop"]', { rotation: 0 }, { rotation: 360, duration: 2, ease: 'none', transformOrigin: '0px 0px' }, 0.25)
          .fromTo('[data-dot="agent-main"]', { x: 0, autoAlpha: 0.35 }, { x: 132, autoAlpha: 1, duration: 0.8, ease: 'power1.inOut' }, 1.1)
          .fromTo('[data-dot="agent-top"]', { x: 0, y: 0, autoAlpha: 0 }, { x: 174, y: -30, autoAlpha: 1, duration: 1.05, ease: 'power2.inOut' })
          .fromTo('[data-dot="agent-bottom"]', { x: 0, y: 0, autoAlpha: 0 }, { x: 174, y: 30, autoAlpha: 1, duration: 1.05, ease: 'power2.inOut' }, '<0.12');
      }, containerRef);
    });

    return () => {
      active = false;
      context?.revert();
    };
  }, [inView]);

  return (
    <div ref={containerRef} className="pipeline-flow-graphic" role="img" aria-label="A straight pipeline, a guarded loop, and a branching agent">
      <svg viewBox="0 0 440 250" className="h-full w-full" aria-hidden="true">
        <g>
          <text x="22" y="40" className="fill-white/60 text-[12px] font-semibold uppercase tracking-[0.16em]">Pipeline</text>
          <path d="M92 35H396" className="fill-none stroke-[#575272] stroke-[7]" strokeLinecap="round" />
          {[92, 194, 295, 396].map((x) => <circle key={x} cx={x} cy="35" r="8" className="fill-[#0d0b1c] stroke-[#26af81] stroke-[3]" />)}
          <circle data-dot="pipeline" cx="92" cy="35" r="5" className="fill-[#8df0c9]" />
        </g>

        <g>
          <text x="22" y="122" className="fill-white/60 text-[12px] font-semibold uppercase tracking-[0.16em]">Loop</text>
          <ellipse cx="242" cy="116" rx="150" ry="34" className="fill-none stroke-[#575272] stroke-[7]" />
          <circle cx="92" cy="116" r="8" className="fill-[#0d0b1c] stroke-[#26af81] stroke-[3]" />
          <circle cx="242" cy="82" r="8" className="fill-[#0d0b1c] stroke-[#26af81] stroke-[3]" />
          <circle cx="392" cy="116" r="9" className="fill-[#0d0b1c] stroke-[#e4a84b] stroke-[3]" />
          <g data-dot="loop" transform="translate(242 116)"><circle cx="0" cy="-34" r="5" className="fill-[#8df0c9]" /></g>
        </g>

        <g>
          <text x="22" y="208" className="fill-white/60 text-[12px] font-semibold uppercase tracking-[0.16em]">Agent</text>
          <path d="M92 202H224m0 0 174-30m-174 30 174 30" className="fill-none stroke-[#575272] stroke-[7]" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="92" cy="202" r="8" className="fill-[#0d0b1c] stroke-[#26af81] stroke-[3]" />
          <circle cx="224" cy="202" r="8" className="fill-[#0d0b1c] stroke-[#26af81] stroke-[3]" />
          <circle cx="398" cy="172" r="8" className="fill-[#0d0b1c] stroke-[#26af81] stroke-[3]" />
          <circle cx="398" cy="232" r="8" className="fill-[#0d0b1c] stroke-[#26af81] stroke-[3]" />
          <circle data-dot="agent-main" cx="92" cy="202" r="5" className="fill-[#8df0c9]" />
          <circle data-dot="agent-top" cx="224" cy="202" r="5" className="fill-[#8df0c9]" />
          <circle data-dot="agent-bottom" cx="224" cy="202" r="5" className="fill-[#8df0c9]" />
        </g>
      </svg>
    </div>
  );
};

export default PipelineFlowGraphic;

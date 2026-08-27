import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

const HashChainVisual = ({ compact = false }) => {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || !inView || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    let active = true;
    let context;

    import('gsap').then(({ gsap }) => {
      if (!active || !containerRef.current) return;
      context = gsap.context(() => {
        const timeline = gsap.timeline({ paused: true });
        timeline
          .to('[data-chain="edited"]', {
            y: -5,
            duration: 0.24,
            ease: 'power2.out',
          })
          .to('[data-hash="edited"]', {
            scaleX: 0.56,
            transformOrigin: 'left center',
            duration: 0.22,
            ease: 'power2.inOut',
          }, '<')
          .to('[data-chain="downstream"]', {
            color: '#ef6a73',
            duration: 0.34,
            stagger: 0.08,
            ease: 'power2.out',
          })
          .to('[data-link="broken"]', {
            opacity: 1,
            duration: 0.18,
          }, '<');
        timelineRef.current = timeline;
        timeline.play(0);
      }, containerRef);
    });

    return () => {
      active = false;
      timelineRef.current?.kill();
      timelineRef.current = null;
      context?.revert();
    };
  }, [inView]);

  const breakChain = () => timelineRef.current?.play();
  return (
    <div
      ref={containerRef}
      className={`hash-chain-visual ${compact ? 'hash-chain-visual--compact' : ''}`}
      onMouseEnter={breakChain}
      onFocus={breakChain}
      role="img"
      aria-label="A tamper-evident chain: editing one record invalidates every record after it"
      tabIndex={0}
    >
      {!compact && (
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-theme)]">Integrity demo</p>
            <p className="mt-1 text-sm text-white/60">Change one record; every downstream proof breaks.</p>
          </div>
          <span className="hidden text-xs text-white/40 sm:block">Hover or focus</span>
        </div>
      )}
      <div className="relative grid grid-cols-4 items-center gap-2 sm:gap-3">
        {[0, 1, 2, 3].map((index) => {
          const edited = index === 1;
          const downstream = index > 1;
          return (
            <div key={index} className="relative flex items-center">
              <div
                data-chain={edited ? 'edited' : downstream ? 'downstream' : 'valid'}
                className={`relative z-10 flex aspect-[1.2/1] w-full flex-col justify-between rounded-lg border border-current bg-[#121027] p-2 shadow-lg shadow-black/20 sm:p-3 ${downstream ? 'text-[#ef6a73]' : 'text-[#26af81]'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="h-1.5 w-1.5 rounded-full bg-current sm:h-2 sm:w-2" />
                  <span className="font-mono text-[9px] text-white/40 sm:text-[10px]">0{index + 1}</span>
                </div>
                <div className="space-y-1.5">
                  <span data-hash={edited ? 'edited' : undefined} className="block h-1 rounded-full bg-current opacity-80" />
                  <span className="block h-1 w-3/4 rounded-full bg-current opacity-[0.35]" />
                </div>
              </div>
              {index < 3 && (
                <div className={`absolute left-[92%] z-0 h-px w-[22%] bg-current sm:left-[94%] sm:w-[20%] ${index === 1 ? 'text-[#ef6a73]' : 'text-[#26af81]'}`}>
                  {index === 1 && <span data-link="broken" className="absolute left-1/2 top-1/2 h-3 w-0.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#ef6a73]" />}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

HashChainVisual.propTypes = {
  compact: PropTypes.bool,
};

export default HashChainVisual;

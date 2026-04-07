import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useEffect } from 'react';
import parse from 'html-react-parser';
import { Link as ScrollLink } from 'react-scroll';
import { TypingAnimation } from '@/components/ui/typing-animation';
import { SparklesText } from '@/components/ui/sparkles-text';
import { Particles } from '@/components/ui/particles';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { BlurFade } from '@/components/ui/blur-fade';

const Hero = ({ data }) => {
  const {
    title,
    subTitle1,
    subTitle2,
    subTitle3,
    subTitle4,
    location,
    ImgLink,
    phone,
    email,
    socialData,
  } = data;

  useEffect(() => {
    const handleScroll = () => {
      const scrollValue = window.scrollY;
      const heroElements = document.querySelector('.hb-me');
      if (heroElements) {
        heroElements.style.right = `${scrollValue * -0.25}px`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /* Strip <span> tags from subtitles (they come with wrapping <span>) */
  const stripSpan = (str) => str.replace(/<\/?span>/g, '');

  /**
   * Custom replacer for html-react-parser:
   * Replaces the <span> wrapping "Tareen..." with SparklesText
   */
  const titleReplacer = {
    replace: (domNode) => {
      if (domNode.type === 'tag' && domNode.name === 'span') {
        const textContent =
          domNode.children &&
          domNode.children.map((c) => (c.type === 'text' ? c.data : '')).join('');
        return (
          <SparklesText
            colors={{ first: '#26af81', second: '#1a8a62' }}
            sparklesCount={8}
            className="inline text-[inherit] font-bold"
          >
            {textContent}
          </SparklesText>
        );
      }
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen bg-dark flex items-center overflow-hidden"
    >
      {/* Particle background */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={50}
        color="#26af81"
        size={0.6}
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-screen items-center">
          <div className="w-full lg:w-7/12 xl:w-7/12 2xl:w-6/12">
            <div className="space-y-6">
              {/* Title */}
              <BlurFade delay={0.2} duration={0.6} inView>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  {parse(title, titleReplacer)}
                </h1>
              </BlurFade>

              {/* Typing subtitle */}
              <BlurFade delay={0.4} duration={0.6} inView>
                <p className="text-lg sm:text-xl text-theme font-medium">
                  <TypingAnimation
                    words={[
                      stripSpan(subTitle1),
                      stripSpan(subTitle2),
                      stripSpan(subTitle3),
                      stripSpan(subTitle4),
                    ]}
                    loop
                    typeSpeed={70}
                    deleteSpeed={40}
                    pauseDelay={1500}
                    className="text-theme"
                  />
                </p>
              </BlurFade>

              {/* Location */}
              <BlurFade delay={0.5} duration={0.6} inView>
                <p className="text-base text-white/70 [&>span]:text-theme [&>span]:font-semibold">
                  {parse(location)}
                </p>
              </BlurFade>

              {/* CTA Button */}
              <BlurFade delay={0.6} duration={0.6} inView>
                <div className="pt-2">
                  <ScrollLink
                    to="contact"
                    spy={true}
                    smooth={true}
                    duration={500}
                    className="inline-block cursor-pointer"
                  >
                    <ShimmerButton
                      shimmerColor="#26af81"
                      background="rgba(38, 175, 129, 0.15)"
                      borderRadius="12px"
                      className="text-base font-semibold text-white px-8 py-3.5 gap-2"
                    >
                      Work with ME
                      <Icon icon="bi:arrow-up-right" className="text-lg" />
                    </ShimmerButton>
                  </ScrollLink>
                </div>
              </BlurFade>

              {/* Contact Info */}
              <BlurFade delay={0.7} duration={0.6} inView>
                <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-white/60">
                  {phone && (
                    <p className="flex items-center gap-2">
                      <Icon icon="bi-phone" className="text-theme text-base" />
                      <span>{phone}</span>
                    </p>
                  )}
                  {email && (
                    <p className="flex items-center gap-2">
                      <Icon icon="bi-envelope" className="text-theme text-base" />
                      <span>{email}</span>
                    </p>
                  )}
                </div>
              </BlurFade>
            </div>
          </div>
        </div>
      </div>

      {/* Background image - positioned right */}
      <div
        className="hb-me absolute top-0 right-0 h-full w-[45%] bg-no-repeat bg-right-bottom bg-contain pointer-events-none z-[1] hidden lg:block"
        style={{ backgroundImage: `url(${ImgLink})` }}
      />

      {/* Vertical social links */}
      <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-4">
        <div className="w-px h-8 bg-white/20" />
        {socialData.map((element, index) => (
          <a
            href={element.link}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-white/50 hover:bg-theme/20 hover:text-theme transition-all duration-300"
          >
            <Icon icon={`fa6-brands:${element.icon}`} className="text-base" />
          </a>
        ))}
        <div className="w-px h-8 bg-white/20" />
      </div>
    </section>
  );
};

Hero.propTypes = {
  data: PropTypes.object,
};

export default Hero;

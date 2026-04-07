import PropTypes from 'prop-types';
import SectionHeading from '../SectionHeading/SectionHeading';
import perser from 'html-react-parser';
import { Icon } from '@iconify/react';
import { BlurFade } from '@/components/ui/blur-fade';
import { Marquee } from '@/components/ui/marquee';

const About = ({ data }) => {
  const { aboutLeft, aboutRight } = data;
  const { ImgLink, name, designation } = aboutLeft;
  const { aboutText, contactInfo, archivement } = aboutRight;

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading title="WELCOME TO..." subTitle="Nice to meet you!" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
          {/* Left Column - Avatar + Name */}
          <div className="lg:col-span-5">
            <BlurFade delay={0.1} duration={0.6} direction="up">
              <div className="flex flex-col items-center lg:items-start">
                <div className="w-64 h-64 rounded-2xl overflow-hidden border-2 border-[var(--color-theme)] shadow-lg">
                  <img
                    src={ImgLink}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mt-5">{name}</h3>
                <div className="text-gray-400 mt-1">{perser(designation)}</div>
              </div>
            </BlurFade>
          </div>

          {/* Right Column - Bio + Contact + Achievements */}
          <div className="lg:col-span-7 lg:pl-6">
            {/* Bio */}
            <BlurFade delay={0.2} duration={0.6} direction="up">
              <p className="text-gray-300 leading-relaxed text-base">
                {aboutText}
              </p>
            </BlurFade>

            {/* Contact Info */}
            <BlurFade delay={0.3} duration={0.6} direction="up">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {contactInfo.map((element, index) => {
                  if (!element.data) return null;
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <Icon
                        icon={`bi:${element.icon}`}
                        className="text-[var(--color-theme)] text-lg shrink-0"
                      />
                      <span className="text-sm">{element.data}</span>
                    </div>
                  );
                })}
              </div>
            </BlurFade>

            {/* Achievements */}
            <div className="mt-8 space-y-8">
              {archivement.map((element, index) => (
                <BlurFade
                  key={index}
                  delay={0.4 + index * 0.15}
                  duration={0.6}
                  direction="up"
                >
                  <div>
                    <div className="flex items-baseline gap-3 mb-2">
                      <h6 className="text-3xl font-bold text-[var(--color-theme)]">
                        {element.number}
                      </h6>
                      <span className="text-white font-medium">
                        {perser(element.meta)}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">
                      {perser(element.text)}
                    </p>
                    {element.logos && element.logos.length > 0 && (
                      <div className="overflow-hidden rounded-lg">
                        <Marquee pauseOnHover>
                          {element.logos.map((logo, logoIndex) => (
                            <img
                              key={logoIndex}
                              src={logo}
                              alt="Logo"
                              className="h-10 w-auto mx-4 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                            />
                          ))}
                        </Marquee>
                      </div>
                    )}
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

About.propTypes = {
  data: PropTypes.object,
};

export default About;

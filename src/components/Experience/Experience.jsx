import PropTypes from 'prop-types';
import SectionHeading from '../SectionHeading/SectionHeading';
import { BlurFade } from '@/components/ui/blur-fade';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

const Experience = ({ data }) => {
  const { text, experience, careerTimeline } = data;

  return (
    <section className="py-20 bg-gradient-theme">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column - Education */}
          <div className="lg:col-span-5">
            <BlurFade delay={0.1} duration={0.6} direction="up">
              <SectionHeading title="Education & Background" subTitle="" />
            </BlurFade>

            <BlurFade delay={0.2} duration={0.6} direction="up">
              <p className="text-white/90 mt-4 leading-relaxed">{text}</p>
            </BlurFade>

            <div className="mt-6 space-y-4">
              {experience.map((element, index) => (
                <BlurFade
                  key={index}
                  delay={0.3 + index * 0.1}
                  duration={0.6}
                  direction="up"
                >
                  <Card className="bg-white/10 border-white/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base text-white">
                        {element.degree}
                      </CardTitle>
                      <CardDescription className="text-white/80 text-sm">
                        {element.institute}
                      </CardDescription>
                    </CardHeader>
                    {element.award && (
                      <CardContent className="pt-0">
                        <span className="text-white font-semibold text-xs">
                          {element.award}
                        </span>
                      </CardContent>
                    )}
                  </Card>
                </BlurFade>
              ))}
            </div>
          </div>

          {/* Right Column - Career Timeline */}
          <div className="lg:col-span-7 lg:pl-4">
            <BlurFade delay={0.1} duration={0.6} direction="up">
              <SectionHeading title="Career Journey" subTitle="" />
            </BlurFade>

            <div className="mt-6 relative">
              {/* Vertical line */}
              <div className="absolute left-4 top-2 bottom-2 w-px bg-white/20" />

              <div className="space-y-1">
                {careerTimeline &&
                  careerTimeline.map((item, index) => {
                    const isLast = index === careerTimeline.length - 1;
                    return (
                      <BlurFade
                        key={index}
                        delay={0.15 + index * 0.08}
                        duration={0.5}
                        direction="up"
                      >
                        <div className="flex items-center gap-4 py-3 group">
                          {/* Node dot */}
                          <div className="relative z-10 flex-shrink-0">
                            <div
                              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300
                                ${isLast
                                  ? 'border-theme bg-theme/20 shadow-[0_0_12px_rgba(38,175,129,0.4)]'
                                  : 'border-white/30 bg-white/5 group-hover:border-theme group-hover:bg-theme/10'
                                }
                              `}
                            >
                              <div
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300
                                  ${isLast
                                    ? 'bg-theme'
                                    : 'bg-white/40 group-hover:bg-theme'
                                  }
                                `}
                              />
                            </div>
                          </div>

                          {/* Company info */}
                          <div className="flex-1 min-w-0">
                            <h4
                              className={`text-sm font-semibold transition-colors duration-300
                                ${isLast ? 'text-theme' : 'text-white group-hover:text-theme'}
                              `}
                            >
                              {item.company}
                            </h4>
                            <p className="text-white/50 text-xs mt-0.5">
                              {item.industry}
                            </p>
                          </div>

                          {/* Arrow indicator for latest */}
                          {isLast && (
                            <span className="text-theme text-xs font-medium px-2 py-1 rounded-full bg-theme/10 border border-theme/30 flex-shrink-0">
                              Latest
                            </span>
                          )}
                        </div>
                      </BlurFade>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Experience.propTypes = {
  data: PropTypes.object,
};

export default Experience;

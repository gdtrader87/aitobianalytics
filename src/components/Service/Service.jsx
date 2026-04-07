import PropTypes from 'prop-types';
import SectionHeading from '../SectionHeading/SectionHeading';
import { BlurFade } from '@/components/ui/blur-fade';
import { MagicCard } from '@/components/ui/magic-card';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

const Service = ({ data }) => {
  const defaultItem = data.length > 0 ? `service-0` : undefined;

  return (
    <section id="services" className="py-20 bg-dark">
      <div className="container mx-auto px-4">
        <BlurFade delay={0.1} duration={0.6} direction="up">
          <SectionHeading title="My Specialties" subTitle="WHAT I DO" />
        </BlurFade>

        <BlurFade delay={0.2} duration={0.6} direction="up">
          <Accordion
            type="single"
            collapsible
            defaultValue={defaultItem}
            className="mt-10 space-y-4"
          >
            {data.map((element, index) => (
              <AccordionItem
                key={index}
                value={`service-${index}`}
                className="border border-white/10 rounded-lg overflow-hidden bg-white/[0.02] px-2"
              >
                <AccordionTrigger className="px-4 py-5 hover:no-underline group">
                  <div className="flex flex-col items-start text-left gap-1">
                    <span className="text-lg font-semibold text-white group-hover:text-[var(--color-theme)] transition-colors">
                      {element.title}
                    </span>
                    <span className="text-sm text-gray-400">
                      {element.heading}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-6">
                  <MagicCard
                    className="p-6 bg-[#1b1840] border-white/5"
                    gradientColor="rgba(38,175,129,0.15)"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      <div className="md:col-span-4">
                        <div className="rounded-lg overflow-hidden">
                          <img
                            src={element.imgLink}
                            alt={element.title}
                            className="w-full h-auto object-cover rounded-lg"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-8">
                        <h3 className="text-xl font-bold text-white mb-3">
                          {element.title}
                        </h3>
                        <div className="text-gray-300 text-sm leading-relaxed">
                          {element.text}
                        </div>
                      </div>
                    </div>
                  </MagicCard>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </BlurFade>
      </div>
    </section>
  );
};

Service.propTypes = {
  data: PropTypes.array,
};

export default Service;

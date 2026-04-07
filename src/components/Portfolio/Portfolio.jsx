import PropTypes from 'prop-types';
import SectionHeading from '../SectionHeading/SectionHeading';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { socialData } from '../../data.json';
import { BlurFade } from '@/components/ui/blur-fade';
import { MagicCard } from '@/components/ui/magic-card';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';

const Portfolio = ({ data }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section>
      <div id="work" className="py-20 bg-gradient-theme">
        <div className="container mx-auto px-4">
          <SectionHeading title="RECENT PROJECT" subTitle="My Work" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {data.map((element, index) => (
              <BlurFade key={index} delay={0.15 + index * 0.1} inView>
                <Dialog>
                  <DialogTrigger asChild>
                    <div
                      className="cursor-pointer"
                      onClick={() => setSelectedProject(element)}
                    >
                      <MagicCard
                        className="bg-[#1b1840] border-0 overflow-hidden rounded-xl"
                        gradientColor="rgba(38,175,129,0.15)"
                      >
                        <div className="overflow-hidden">
                          <img
                            src={element.ImgLink}
                            alt={element.title}
                            className="w-full h-56 object-cover object-top transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                        <div className="p-5">
                          <h6 className="text-sm text-[var(--color-theme)] mb-1">
                            {element.subTitle}
                          </h6>
                          <h4 className="text-lg font-semibold text-white flex items-center justify-between">
                            {element.title}
                            <Icon
                              icon="bi:arrow-up-right"
                              className="text-[var(--color-theme)]"
                            />
                          </h4>
                        </div>
                      </MagicCard>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="bg-[#1b1840] border-[#2d2956] text-white max-w-3xl max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-white">
                        {element.title}
                      </DialogTitle>
                      {element.subTitle && (
                        <DialogDescription className="text-[var(--color-theme)]">
                          {element.subTitle}
                        </DialogDescription>
                      )}
                    </DialogHeader>
                    <div className="mt-4">
                      <img
                        src={element.ImgLink}
                        alt={element.title}
                        className="w-full rounded-lg mb-6"
                      />
                      <div className="space-y-4 text-gray-300">
                        {element.paragraphList &&
                          element.paragraphList.map((para, pIndex) => (
                            <p
                              key={pIndex}
                              dangerouslySetInnerHTML={{ __html: para.text }}
                            />
                          ))}
                      </div>
                      <div className="mt-6 pt-4 border-t border-[#2d2956] flex items-center gap-3">
                        <span className="text-sm text-gray-400">Share</span>
                        <div className="flex gap-3">
                          {socialData.map((social, sIndex) => (
                            <a
                              key={sIndex}
                              href={social.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-[var(--color-theme)] transition-colors"
                            >
                              <Icon icon={`bi:${social.icon}`} className="text-lg" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

Portfolio.propTypes = {
  data: PropTypes.array,
};

export default Portfolio;

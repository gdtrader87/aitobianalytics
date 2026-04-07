import PropTypes from 'prop-types';
import SectionHeading from '../SectionHeading/SectionHeading';
import { useState } from 'react';
import { socialData } from '../../data.json';
import { Icon } from '@iconify/react';
import { BlurFade } from '@/components/ui/blur-fade';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const Blog = ({ data }) => {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <section id="blog">
      <div className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <SectionHeading title="INNOVATION CORNER" subTitle="Latest Thought Leadership" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.map((element, index) => (
              <BlurFade
                key={index}
                delay={0.15 + index * 0.1}
                inView
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <div
                      className="cursor-pointer"
                      onClick={() => setSelectedPost(element)}
                    >
                      <Card className="bg-[#1b1840] border-0 overflow-hidden rounded-xl hover:shadow-lg hover:shadow-[var(--color-theme)]/10 transition-all duration-300 group">
                        <div className="overflow-hidden">
                          <img
                            src={element.ImgLink}
                            alt={element.title}
                            className="w-full h-48 object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h6 className="text-xs text-[var(--color-theme)] mb-2">
                            {element.date}
                          </h6>
                          <h2 className="text-sm font-semibold text-white line-clamp-2 hover:text-[var(--color-theme)] transition-colors">
                            {element.title}
                          </h2>
                        </CardContent>
                      </Card>
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
                        className="w-full rounded-lg mb-4"
                      />
                      {element.date && (
                        <p className="text-sm text-[var(--color-theme)] mb-4">
                          {element.date}
                        </p>
                      )}
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

Blog.propTypes = {
  data: PropTypes.array,
};

export default Blog;

import PropTypes from 'prop-types';
import { BlurFade } from '@/components/ui/blur-fade';

const SectionHeading = ({ title, subTitle, className }) => {
  return (
    <div className={`mb-10 ${className || ''}`}>
      <BlurFade delay={0.1} inView>
        <h6 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-theme)] mb-2">
          {subTitle}
        </h6>
      </BlurFade>
      <BlurFade delay={0.2} inView>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          {title}
        </h2>
      </BlurFade>
    </div>
  );
};

SectionHeading.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  className: PropTypes.string,
};

export default SectionHeading;

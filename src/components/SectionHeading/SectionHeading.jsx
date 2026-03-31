import PropTypes from 'prop-types';

const SectionHeading = ({ title, subTitle, className }) => {
  return (
    <div className={`section-heading ${className || ''}`}>
      <h6 data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">{subTitle}</h6>
      <h2 data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">{title}</h2>
    </div>
  )
}

SectionHeading.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  className: PropTypes.string
}

export default SectionHeading;
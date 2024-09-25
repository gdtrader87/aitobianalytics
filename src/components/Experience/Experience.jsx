import PropTypes from "prop-types";
import SectionHeading from "../SectionHeading/SectionHeading";
import { Icon } from "@iconify/react";

const Experience = ({ data }) => {
  const { text, experience } = data;
  return (
    <section className="section experience-section bg-g">
      <div className="container">
        <div className="row gy-5">
          <div className="col-lg-5">
            <div className="section-heading">
              <SectionHeading title="My Education" subTitle="" />
              <p
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="300"
              >
                {text}
              </p>
              {/* <div className="btn-bar" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
                <a href={resumeCv} className="px-btn dark" download>
                  Download my resume <Icon icon="bi-download" />
                </a>
              </div> */}
            </div>
          </div>
          <div className="col-lg-7 ps-xl-4 education">
            <ul className="resume-box">
              {experience.map((element, index) => (
                <li key={index} data-aos="fade-up" data-aos-duration="800">
                  <h5>
                    {element.degree} From {element.institute}
                  </h5>
                  <div className="details">
                    <p>{element.session} <Icon icon="icon-park-outline:dot"/></p>
                    <h6>{element.award}</h6>
                  </div>
                </li>
              ))}
            </ul>
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

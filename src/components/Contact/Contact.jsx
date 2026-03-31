import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import SectionHeading from "../SectionHeading/SectionHeading";
import { useState } from "react";

const Contact = ({ data }) => {
  const { contactInfo, contactForm } = data;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSubmitStatus(null);
    setErrorMessage("");

    const formDataToSend = new FormData(event.target);
    
    formDataToSend.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);

    const object = Object.fromEntries(formDataToSend);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });

      const result = await response.json();

      if (result.success) {
        setFormData({ name: "", email: "", service: "", message: "" });
        setSubmitStatus("success");
        setShowAlert(true);
      } else {
        if (result.message.includes("spam")) {
          setErrorMessage("Your message was flagged as spam. Please try again with different content or contact us directly.");
        } else {
          setErrorMessage(result.message || "An unexpected error occurred. Please try again.");
        }
        setSubmitStatus("error");
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("An error occurred while sending your message. Please try again later.");
      setSubmitStatus("error");
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
    setSubmitStatus(null);
    setErrorMessage("");
  };

  const inputStyle = {
    background: 'rgba(45, 41, 86, 0.5)',
    border: '1px solid rgba(123, 104, 238, 0.4)',
    padding: '10px',
    color: 'white',
    width: '100%',
    borderRadius: '4px',
  };

  const labelStyle = {
    color: 'white',
    marginBottom: '5px',
    display: 'block',
  };

  const selectStyle = {
    ...inputStyle,
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 10px center',
    backgroundSize: '1em',
    cursor: 'pointer',
  };

  const selectOptionStyle = {
    background: 'rgba(45, 41, 86, 1)',
    color: 'white',
  };

  return (
    <section
      id="contact"
      data-scroll-index={5}
      className="section contact-section bg-dark text-white"
    >
      <div className="container">
        <div className="row gy-5">
          <div className="col-lg-5">
            <SectionHeading title="Let's Work Together" subTitle="Contact" />
            <div className="contact-info">
              <ul>
                {contactInfo.map((element, index) => (
                  <li key={index} data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
                    <div className="icon">
                      <Icon icon={`bi:${element.icon}`} />
                    </div>
                    <div className="text">
                      <label>{element.title}</label>
                      <p>
                        {element.text}
                        <span>
                          {element.emailLink &&
                            <a
                              className="text-reset"
                              href={`mailto:${element.emailLink}`}
                            >
                              {element.emailLink}
                            </a>
                          }
                        </span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="contact-form p-3 p-sm-5 rounded"
              style={{
                background: 'linear-gradient(280deg, rgba(21,18,49,1) 0%, rgba(27,24,64,1) 40%, rgba(33,29,78,1) 100%)'
              }}
            >
              <h2 className="mb-4 text-white">{contactForm.title}</h2>
              <p className="mb-4 text-white">{contactForm.text}</p>
              {showAlert && (
                <div className={`alert alert-${submitStatus === "success" ? "success" : "danger"} alert-dismissible fade show`} role="alert">
                  {submitStatus === "success" ? "Message sent successfully!" : errorMessage}
                  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={closeAlert}
                    style={{
                      outline: 'none',
                      border: 'none'
                    }}
                  ></button>
                </div>
              )}
              <form onSubmit={onSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="name" style={labelStyle}>Name</label>
                    <input
                      id="name"
                      type="text"
                      style={inputStyle}
                      placeholder="Your name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="email" style={labelStyle}>Email</label>
                    <input
                      id="email"
                      type="email"
                      style={inputStyle}
                      placeholder="Your email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="service" style={labelStyle}>Service</label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        required
                        style={selectStyle}
                      >
                        <option value="" disabled style={{color: '#757575', ...selectStyle}}>Select a service</option>
                        <option value="Business Intelligence Specialist" style={selectOptionStyle}>Business Intelligence Specialist</option>
                        <option value="Data Engineering" style={selectOptionStyle}>Data Engineering</option>
                        <option value="AI Solutions Architect & Machine Learning Innovator" style={selectOptionStyle}>AI Solutions Architect & Machine Learning Innovator</option>
                        <option value="Analytics Professional" style={selectOptionStyle}>Analytics Professional</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12">
                    <label htmlFor="message" style={labelStyle}>Message</label>
                    <textarea
                      id="message"
                      style={inputStyle}
                      rows="5"
                      placeholder="Your message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn w-100 btn-bar"
                      disabled={loading}
                      style={{
                        background: 'linear-gradient(90deg, var(--px-theme) 0%, var(--px-theme-2) 100%)',
                        color: 'white',
                        border: 'none',
                        transition: 'all 0.3s ease',
                        padding: '10px',
                        borderRadius: '4px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.7 : 1,
                      }}
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Contact.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Contact;
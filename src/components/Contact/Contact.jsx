import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import SectionHeading from '../SectionHeading/SectionHeading';
import { useState } from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { BorderBeam } from '@/components/ui/border-beam';
import { BlurFade } from '@/components/ui/blur-fade';

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
  const [errorMessage, setErrorMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSubmitStatus(null);
    setErrorMessage('');

    const formDataToSend = new FormData(event.target);
    formDataToSend.append('access_key', import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);

    const object = Object.fromEntries(formDataToSend);
    const json = JSON.stringify(object);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: json,
      });

      const result = await response.json();

      if (result.success) {
        setFormData({ name: '', email: '', service: '', message: '' });
        setSubmitStatus('success');
        setShowAlert(true);
      } else {
        if (result.message.includes('spam')) {
          setErrorMessage(
            'Your message was flagged as spam. Please try again with different content or contact us directly.'
          );
        } else {
          setErrorMessage(
            result.message || 'An unexpected error occurred. Please try again.'
          );
        }
        setSubmitStatus('error');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage(
        'An error occurred while sending your message. Please try again later.'
      );
      setSubmitStatus('error');
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
    setSubmitStatus(null);
    setErrorMessage('');
  };

  return (
    <section id="contact" className="py-20 bg-dark text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left column - Contact Info */}
          <div className="lg:col-span-5">
            <SectionHeading title="Let's Work Together" subTitle="Contact" />
            <BlurFade delay={0.2} inView>
              <ul className="space-y-6 mt-6">
                {contactInfo.map((element, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-theme)]/10 flex items-center justify-center text-[var(--color-theme)]">
                      <Icon icon={`bi:${element.icon}`} className="text-lg" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 block">
                        {element.title}
                      </label>
                      <p className="text-white text-sm mt-0.5">
                        {element.link ? (
                          <a
                            className="text-[var(--color-theme)] hover:underline transition-colors"
                            href={element.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {element.text}
                          </a>
                        ) : element.emailLink ? (
                          <a
                            className="text-white hover:text-[var(--color-theme)] transition-colors"
                            href={`mailto:${element.emailLink}`}
                          >
                            {element.emailLink}
                          </a>
                        ) : (
                          element.text
                        )}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </BlurFade>
          </div>

          {/* Right column - Contact Form */}
          <div className="lg:col-span-7">
            <BlurFade delay={0.3} inView>
              <div
                className="relative overflow-hidden rounded-xl p-6 sm:p-10"
                style={{
                  background:
                    'linear-gradient(280deg, rgba(21,18,49,1) 0%, rgba(27,24,64,1) 40%, rgba(33,29,78,1) 100%)',
                }}
              >
                <BorderBeam
                  size={250}
                  duration={12}
                  colorFrom="var(--color-theme)"
                  colorTo="#7b68ee"
                />
                <h2 className="text-xl font-bold text-white mb-2">
                  {contactForm.title}
                </h2>
                <p className="text-gray-400 mb-6 text-sm">{contactForm.text}</p>

                {showAlert && (
                  <div className="mb-4">
                    <Alert
                      variant={submitStatus === 'success' ? 'default' : 'destructive'}
                      className={
                        submitStatus === 'success'
                          ? 'border-green-500/50 bg-green-500/10 text-green-400'
                          : 'border-red-500/50 bg-red-500/10 text-red-400'
                      }
                    >
                      <AlertTitle>
                        {submitStatus === 'success' ? 'Success' : 'Error'}
                      </AlertTitle>
                      <AlertDescription className="flex items-center justify-between">
                        <span>
                          {submitStatus === 'success'
                            ? 'Message sent successfully!'
                            : errorMessage}
                        </span>
                        <button
                          onClick={closeAlert}
                          className="ml-2 text-current hover:opacity-70"
                        >
                          <Icon icon="ic:round-close" />
                        </button>
                      </AlertDescription>
                    </Alert>
                  </div>
                )}

                <form onSubmit={onSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm text-white mb-1.5">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="w-full rounded-md bg-[rgba(45,41,86,0.5)] border border-[rgba(123,104,238,0.4)] px-3 py-2.5 text-white placeholder-gray-500 outline-none focus:border-[var(--color-theme)] transition-colors"
                        placeholder="Your name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm text-white mb-1.5">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="w-full rounded-md bg-[rgba(45,41,86,0.5)] border border-[rgba(123,104,238,0.4)] px-3 py-2.5 text-white placeholder-gray-500 outline-none focus:border-[var(--color-theme)] transition-colors"
                        placeholder="Your email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="service" className="block text-sm text-white mb-1.5">
                        Service
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-md bg-[rgba(45,41,86,0.5)] border border-[rgba(123,104,238,0.4)] px-3 py-2.5 text-white outline-none focus:border-[var(--color-theme)] transition-colors appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 10px center',
                          backgroundSize: '1em',
                        }}
                      >
                        <option value="" disabled className="bg-[rgba(45,41,86,1)] text-gray-500">
                          Select a service
                        </option>
                        <option value="AI Solutions Architecture" className="bg-[rgba(45,41,86,1)] text-white">
                          AI Solutions Architecture
                        </option>
                        <option value="Agentic AI & Intelligent Automation" className="bg-[rgba(45,41,86,1)] text-white">
                          Agentic AI & Intelligent Automation
                        </option>
                        <option value="Data & AI Strategy Leadership" className="bg-[rgba(45,41,86,1)] text-white">
                          Data & AI Strategy Leadership
                        </option>
                        <option value="Business Intelligence & Analytics" className="bg-[rgba(45,41,86,1)] text-white">
                          Business Intelligence & Analytics
                        </option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="message" className="block text-sm text-white mb-1.5">
                        Message
                      </label>
                      <textarea
                        id="message"
                        className="w-full rounded-md bg-[rgba(45,41,86,0.5)] border border-[rgba(123,104,238,0.4)] px-3 py-2.5 text-white placeholder-gray-500 outline-none focus:border-[var(--color-theme)] transition-colors resize-none"
                        rows="5"
                        placeholder="Your message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 rounded-md font-medium text-white transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                        style={{
                          background:
                            'linear-gradient(90deg, var(--color-theme) 0%, #7b68ee 100%)',
                        }}
                      >
                        {loading ? 'Sending...' : 'Send Message'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </BlurFade>
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

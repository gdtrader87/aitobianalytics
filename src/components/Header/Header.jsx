import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { socialData } from '../../data.json';

const Header = ({ data }) => {
  const { logoDark, logoLight } = data;
  const [mobileToggle, setMobileToggle] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  const handleMobileToggle = () => {
    setMobileToggle(!mobileToggle);
  };

  const handleNavigation = (to) => {
    setMobileToggle(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: to } });
    } else {
      const element = document.getElementById(to);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setActiveLink(to);
  };

  const handleScroll = () => {
    if (location.pathname === '/') {
      const sections = ['home', 'about', 'services', 'work', 'blog', 'contact'];
      let currentSection = 'home';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 100) {
          currentSection = section;
        }
      }

      setActiveLink(currentSection);
    }
  };

  useEffect(() => {
    if (location.pathname === '/newsletter') {
      setActiveLink('newsletter');
    } else if (location.pathname === '/') {
      handleScroll();
    }

    if (location.state && location.state.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveLink(location.state.scrollTo);
      }
      navigate(location.pathname, { replace: true, state: {} });
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location, navigate]);

  const menuItems = ['home', 'about', 'services', 'work', 'blog', 'contact'];

  return (
    <header>
      {/* Mob header */}
      <div className="mob-header" onClick={handleMobileToggle}>
        <div className="mob-h-left">
          <Link className="navbar-brand" to="/">
            <img className="logo-dark" title="" alt="" src={logoDark} />
            <img className="logo-light" title="" alt="" src={logoLight} />
          </Link>
        </div>
        <div className="mob-h-right">
          <button className="toggler-menu">
            {
              mobileToggle ? <Icon icon="mingcute:close-fill" /> :
                <Icon icon="mingcute:menu-fill" />
            }
            {/* <span/> */}
          </button>
        </div>
      </div>
      {/* End */}
      {/* Header Top */}
      <div
        className={`header-left-fixed one-page-nav ${mobileToggle ? 'menu-open' : ''
          }`}
      >
        {/* Brand */}
        <div className="logo">
          <Link className="navbar-brand" to="/">
            <img
              className="logo-dark"
              title="Umair"
              alt="site-logo"
              src={logoDark}
            />
            <img
              className="logo-light"
              title="Umair"
              alt="site-logo"
              src={logoLight}
            />
          </Link>
        </div>
        {/* / */}
        <ul className="main-menu custom-scrollbar">
          {menuItems.map((item) => (
            <li key={item}>
              <a
                href={`/#${item}`}
                className={activeLink === item ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(item);
                }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            </li>
          ))}
          <li>
            <Link
              to="/newsletter"
              className={activeLink === 'newsletter' ? 'active' : ''}
              onClick={() => {
                setMobileToggle(false);
                setActiveLink('newsletter');
              }}
            >
              Newsletter
            </Link>
          </li>
        </ul>
        <ul className="nav social-link">
          {socialData.map((element, index) => (
            <li key={index}>
              <a href={element.link} target="_blank" rel="noopener noreferrer">
                <Icon icon={`fa6-brands:${element.icon}`} />
              </a>
            </li>
          ))}
        </ul>
      </div>
      {/* End Header Top */}
    </header>
  );
};

Header.propTypes = {
  data: PropTypes.object,
};

export default Header;


// import PropTypes from 'prop-types';
// import { useState } from 'react';
// import { Icon } from '@iconify/react';
// import { Link } from 'react-router-dom';
// import { Link as ScrollLink } from 'react-scroll';
// import { socialData } from '../../data.json';

// const Header = ({ data }) => {
//   const { logoDark, logoLight } = data;

//   const [mobileToggle, setMobileToggle] = useState(false);

//   const handleMobileToggle = () => {
//     setMobileToggle(!mobileToggle);
//   };

//   return (
//     <header>
//       {/* Mob header */}
//       <div className="mob-header" onClick={handleMobileToggle}>
//         <div className="mob-h-left">
//           <Link className="navbar-brand" to="/">
//             <img className="logo-dark" title="" alt="" src={logoDark} />
//             <img className="logo-light" title="" alt="" src={logoLight} />
//           </Link>
//         </div>
//         <div className="mob-h-right">
//           <button className="toggler-menu">
//             {
//               mobileToggle?<Icon icon="mingcute:close-fill"/>:
//               <Icon icon="mingcute:menu-fill"/>
//             }
//             {/* <span/> */}
//           </button>
//         </div>
//       </div>
//       {/* End */}
//       {/* Header Top */}
//       <div
//         className={`header-left-fixed one-page-nav ${
//           mobileToggle ? 'menu-open' : ''
//         }`}
//       >
//         {/* Brand */}
//         <div className="logo">
//           <Link className="navbar-brand" to="/">
//             <img
//               className="logo-dark"
//               title="Umair"
//               alt="site-logo"
//               src={logoDark}
//             />
//             <img
//               className="logo-light"
//               title="Umair"
//               alt="site-logo"
//               src={logoLight}
//             />
//           </Link>
//         </div>
//         {/* / */}
//         <ul className="main-menu custom-scrollbar">
//           <li>
//             <ScrollLink
//               to="home"
//               spy={true}
//               duration={500}
//               onClick={() => setMobileToggle(false)}
//             >
//               Home
//             </ScrollLink>
//           </li>
//           <li>
//             <ScrollLink
//               to="about"
//               spy={true}
//               duration={500}
//               onClick={() => setMobileToggle(false)}
//             >
//               About
//             </ScrollLink>
//           </li>
//           <li>
//             <ScrollLink
//               to="services"
//               spy={true}
//               duration={500}
//               onClick={() => setMobileToggle(false)}
//             >
//               Services
//             </ScrollLink>
//           </li>
//           <li>
//             <ScrollLink
//               to="work"
//               spy={true}
//               duration={500}
//               onClick={() => setMobileToggle(false)}
//             >
//               Portfolio
//             </ScrollLink>
//           </li>
//           <li>
//             <ScrollLink
//               to="blog"
//               spy={true}
//               duration={500}
//               onClick={() => setMobileToggle(false)}
//             >
//               Blog
//             </ScrollLink>
//           </li>
//           <li>
//             <ScrollLink
//               to="contact"
//               spy={true}
//               duration={500}
//               onClick={() => setMobileToggle(false)}
//             >
//               Contact
//             </ScrollLink>
//           </li>
//         </ul>
//         <ul className="nav social-link">
//           {socialData.map((element, index) => (
//             <li key={index}>
//               <a href={element.link} target="_blank" rel="noopener noreferrer">
//                 <Icon icon={`fa6-brands:${element.icon}`} />
//               </a>
//             </li>
//           ))}
//         </ul>
//       </div>
//       {/* End Header Top */}
//     </header>
//   );
// };

// Header.propTypes = {
//   data: PropTypes.object,
// };

// export default Header;

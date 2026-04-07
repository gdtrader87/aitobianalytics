import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { socialData } from '../../data.json';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Portfolio' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
];

const BrandLogo = () => (
  <div className="flex items-center gap-2">
    <div className="flex items-center gap-0.5">
      <span className="text-lg font-bold text-theme tracking-tight">AI</span>
      <span className="text-xs text-white/50 mx-0.5">&raquo;</span>
      <span className="text-lg font-bold text-theme tracking-tight">BI</span>
    </div>
    <div className="h-5 w-px bg-white/20" />
    <span className="text-sm font-medium text-white/80 tracking-wide">Analytics</span>
  </div>
);

const Header = ({ data }) => {
  const [activeLink, setActiveLink] = useState('home');
  const [sheetOpen, setSheetOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (to) => {
    setSheetOpen(false);
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
      const sections = NAV_ITEMS.map((item) => item.id);
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

  /* Shared nav link list */
  const NavLinks = ({ onClick }) => (
    <ul className="flex flex-col gap-1">
      {NAV_ITEMS.map((item) => (
        <li key={item.id}>
          <a
            href={`/#${item.id}`}
            className={`
              block px-4 py-2.5 rounded-lg text-sm font-medium tracking-wide uppercase transition-all duration-200
              ${
                activeLink === item.id
                  ? 'text-theme bg-theme/10 border-l-2 border-theme'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }
            `}
            onClick={(e) => {
              e.preventDefault();
              handleNavigation(item.id);
              if (onClick) onClick();
            }}
          >
            {item.label}
          </a>
        </li>
      ))}
      <li>
        <a
          href="https://alphadata-agentic-ai.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="block px-4 py-2.5 rounded-lg text-sm font-medium tracking-wide uppercase transition-all duration-200 text-white/70 hover:text-white hover:bg-white/5"
          onClick={() => {
            if (onClick) onClick();
          }}
        >
          Agentic AI
        </a>
      </li>
    </ul>
  );

  /* Shared social links */
  const SocialLinks = () => (
    <ul className="flex items-center gap-3">
      {socialData.map((element, index) => (
        <li key={index}>
          <a
            href={element.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 text-white/60 hover:bg-theme/20 hover:text-theme transition-all duration-200"
          >
            <Icon icon={`fa6-brands:${element.icon}`} className="text-base" />
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <header>
      {/* ===== Mobile Header Bar ===== */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-dark/95 backdrop-blur-md border-b border-white/5">
        <Link to="/" className="block">
          <BrandLogo />
        </Link>

        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Icon icon="mingcute:menu-fill" className="text-xl" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[280px] bg-dark border-r border-white/5 p-0 flex flex-col"
          >
            <SheetHeader className="p-6 pb-4">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <Link to="/" onClick={() => setSheetOpen(false)}>
                <BrandLogo />
              </Link>
            </SheetHeader>
            <Separator className="bg-white/5" />
            <nav className="flex-1 overflow-y-auto px-3 py-4 custom-scrollbar">
              <NavLinks onClick={() => setSheetOpen(false)} />
            </nav>
            <Separator className="bg-white/5" />
            <div className="p-4">
              <SocialLinks />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* ===== Desktop Fixed Sidebar ===== */}
      <aside className="hidden lg:flex fixed top-0 left-0 w-[280px] h-screen z-50 flex-col bg-dark border-r border-white/5">
        {/* Logo */}
        <div className="px-6 py-8">
          <Link to="/" className="block">
            <BrandLogo />
          </Link>
        </div>

        <Separator className="bg-white/5" />

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-6 custom-scrollbar">
          <NavLinks />
        </nav>

        <Separator className="bg-white/5" />

        {/* Social Links */}
        <div className="px-6 py-5">
          <SocialLinks />
        </div>
      </aside>
    </header>
  );
};

Header.propTypes = {
  data: PropTypes.object,
};

export default Header;

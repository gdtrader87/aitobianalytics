import PropTypes from 'prop-types';
import { Separator } from '@/components/ui/separator';

const Footer = ({ data }) => {
  const { ImgLink, name } = data;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white pb-8">
      <div className="container mx-auto px-4">
        <Separator className="bg-[#2d2956] mb-8" />
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-full overflow-hidden">
            <img src={ImgLink} alt={name} className="w-full h-full object-cover" />
          </div>
          <h6 className="text-base font-medium">{name}</h6>
          <p className="text-sm text-gray-400">
            &copy; {currentYear} copyright all right reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  data: PropTypes.object,
};

export default Footer;

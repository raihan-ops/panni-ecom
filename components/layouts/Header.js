import Link from 'next/link';
import Image from 'next/image';
import { PATH_HOME } from '@/helpers/Slugs';
import assets from '@/assets/asset';
// import LogoFull from "public/logo-full.webp";
import NavMenu from '@/components/layouts/NavMenu';
import MobileMenu from '@/components/layouts/MobileMenu';
import { Typography } from '../shared/typography';
import Img from '../shared/Img';
const Header = () => {
  return (
    <header className="sticky top-0 w-full z-[999]">
      <div className="fit flex ">
        <div className="h-full w-full">
          <NavMenu />
          {/* <MobileMenu/> */}
        </div>
      </div>
    </header>
  );
};

export default Header;

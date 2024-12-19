import LeftNavItems from './LeftNavItems';
import RightNavItems from './RightNavItems';

const NavMenu = () => {
  return (
    <nav className="hide w-full h-full items-center justify-between">
      <RightNavItems />
      <LeftNavItems />
    </nav>
  );
};

export default NavMenu;
// py-[16px] px-[24px] md:px-[40px] lg:px-[120px] lg:py-[16px]
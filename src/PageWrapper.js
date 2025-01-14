'use client';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import ContentAnimation from '@/components/layouts/content-animation';
import Footer from '@/components/layouts/footer';
import Portals from '@/components/portals';
import { AuthContext } from '../contexts/AuthContextProvider';
import BackButton from './BackButton';
import { GlobalTranslator } from './Traslator/GlobalTranslator';
import Header from '../layouts/header';

const PageWrapper = ({ children }) => {
  const authContext = useContext(AuthContext);

  if (!authContext.isLogin) {
    return <ContentAnimation>{children}</ContentAnimation>;
  }

  return (
    <div className="main-content flex min-h-screen flex-col">
      {/* BEGIN TOP NAVBAR */}
      <Header />
      {/* END TOP NAVBAR */}

      {/* BEGIN CONTENT AREA */}
      <ContentAnimation>{children}</ContentAnimation>
      {/* END CONTENT AREA */}

      {/* BEGIN FOOTER */}
      <Footer />
      {/* END FOOTER */}
      <Portals />
    </div>
  );
};

export const CustomPageHeader = ({ title, subTitle, extra, extraClassName, backButton = true }) => {
  return (
    <div className="flex justify-between p-4">
      <div className="font-semi-bold flex items-center gap-5 text-lg">
        {backButton && <BackButton />}
        {GlobalTranslator(title)}
        {subTitle && <p className="text-gray text-sm">{GlobalTranslator(subTitle)}</p>}
      </div>
      <div className={`mr-4 flex gap-2 ${extraClassName}`}>{extra && extra.map((e) => e)}</div>
    </div>
  );
};

PageWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PageWrapper;

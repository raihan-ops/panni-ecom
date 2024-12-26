import './main.css';
import '../../styles/style.css';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';

const BaseLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="w-full min-h-[calc(100vh-200px)]">{children}</main>
      <Footer />
    </div>
  );
};

export default BaseLayout;

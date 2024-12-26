// Fetch settings for a single mode

import HomePage from '@/components/pages/Home';

export async function generateMetadata() {
  return {
    title: 'Panni',
    description: 'Default Description',
    openGraph: {
      title: 'Seo title',
      description: 'Open Graph description',
    },
  };
}

const Home = async () => {
  return (
    <div className="container">
      <HomePage />
    </div>
  );
};

export default Home;

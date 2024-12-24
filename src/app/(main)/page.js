// Fetch settings for a single mode

export async function generateMetadata() {
  return {
    title: 'Aldo',
    description: 'Default Description',
    openGraph: {
      title: 'Seo title',
      description: 'Open Graph description',
    },
  };
}

const Home = async () => {
  return (
    <div>
      <p className="container font-bold text-primary">Hlw</p>
      
    </div>
  );
};

export default Home;

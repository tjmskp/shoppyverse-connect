
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FeaturedVendors from "@/components/home/FeaturedVendors";
import CategoriesSection from "@/components/home/CategoriesSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();
  
  return (
    <Layout>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <FeaturedVendors />
      <div className="bg-black py-20 px-4 md:px-8">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t('experienceBangladeshiFashion')}</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            {t('discoverUniqueDesigns')}
          </p>
          <Button size="lg" className="bg-white text-black hover:bg-gray-200">
            {t('shopNow')}
          </Button>
        </div>
      </div>
      <NewsletterSection />
    </Layout>
  );
};

export default Index;

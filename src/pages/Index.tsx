
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FeaturedVendors from "@/components/home/FeaturedVendors";
import CategoriesSection from "@/components/home/CategoriesSection";
import NewsletterSection from "@/components/home/NewsletterSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <FeaturedVendors />
      <div className="bg-black py-20 px-4 md:px-8">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Experience Bangladeshi Fashion</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Discover unique designs from the best local brands, all in one place.
            Join our community of fashion enthusiasts today.
          </p>
          <Button size="lg" className="bg-white text-black hover:bg-gray-200">
            Shop Now
          </Button>
        </div>
      </div>
      <NewsletterSection />
    </Layout>
  );
};

export default Index;

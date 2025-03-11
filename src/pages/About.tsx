
import Layout from "@/components/layout/Layout";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">{t('aboutUs')}</h1>
        <Separator className="mb-8" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Founded in 2023, Shoppygain emerged from a vision to create a unified platform 
              for authentic Bangladeshi fashion brands. We recognized the incredible talent of local 
              designers and artisans, and sought to bridge the gap between these creators and fashion 
              enthusiasts both locally and globally.
            </p>
            <p className="text-gray-700">
              Our marketplace brings together the best of Bangladeshi fashion, from traditional 
              craftsmanship to contemporary designs, all while ensuring fair compensation for 
              vendors and artisans.
            </p>
          </div>
          <div className="bg-gray-100 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              At Shoppygain, we're committed to showcasing the rich diversity and creativity of 
              Bangladeshi fashion to the world. We believe in:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Supporting local designers and artisans</li>
              <li>Promoting sustainable and ethical fashion practices</li>
              <li>Preserving traditional craftsmanship</li>
              <li>Creating economic opportunities for local communities</li>
              <li>Delivering exceptional quality and customer experience</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-black text-white p-8 rounded-lg mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <h3 className="text-xl font-medium mb-2">Authenticity</h3>
              <p>We celebrate genuine Bangladeshi design and craftsmanship.</p>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-medium mb-2">Quality</h3>
              <p>We curate only the finest fashion products for our customers.</p>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-medium mb-2">Community</h3>
              <p>We build meaningful connections between creators and customers.</p>
            </div>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Join Our Journey</h2>
          <p className="text-gray-700 mb-4">
            Whether you're a fashion enthusiast looking for unique designs or a vendor 
            wanting to showcase your creations, Shoppygain offers a platform for you to connect, 
            discover, and grow.
          </p>
          <p className="text-gray-700">
            Thank you for being part of our community as we continue to elevate Bangladeshi fashion 
            on the global stage.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;

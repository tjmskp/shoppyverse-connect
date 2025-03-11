
import Layout from "@/components/layout/Layout";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";

const Terms = () => {
  const { t } = useLanguage();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">{t('termsConditions')}</h1>
        <Separator className="mb-8" />
        
        <div className="max-w-4xl mx-auto prose prose-sm md:prose-base lg:prose-lg">
          <p className="text-gray-500">Last updated: June 1, 2024</p>
          
          <p>
            Welcome to Shoppygain. These terms and conditions outline the rules and regulations for the use of our website and services.
          </p>
          
          <p>
            By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use Shoppygain if you do not accept all of the terms and conditions stated on this page.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">1. Definitions</h2>
          <p>
            "Customer" refers to any individual or entity that places an order through the platform.<br />
            "Vendor" refers to sellers who list and sell products through the platform.<br />
            "Platform" refers to the Shoppygain website and related services.<br />
            "Product" refers to any item listed for sale on the platform.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">2. User Accounts</h2>
          <p>
            2.1. To access certain features of the platform, you must register an account.<br />
            2.2. You are responsible for maintaining the confidentiality of your account information.<br />
            2.3. You are responsible for all activities that occur under your account.<br />
            2.4. You must immediately notify us of any unauthorized use of your account.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">3. Products and Orders</h2>
          <p>
            3.1. All product descriptions aim to be as accurate as possible, but we do not guarantee that all descriptions are complete or error-free.<br />
            3.2. We reserve the right to refuse or cancel any order for any reason, including product availability, errors in product or pricing information, or suspected fraudulent activity.<br />
            3.3. Prices for products are subject to change without notice.<br />
            3.4. We reserve the right to limit the quantities of products purchased.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">4. Vendor Policies</h2>
          <p>
            4.1. Vendors are responsible for the accuracy of product descriptions, pricing, and availability.<br />
            4.2. Vendors must comply with all applicable laws and regulations.<br />
            4.3. Vendors are responsible for fulfilling orders in a timely manner and as described.<br />
            4.4. We reserve the right to remove any vendor or product from the platform at our discretion.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">5. Intellectual Property</h2>
          <p>
            5.1. All content on this platform, including but not limited to text, graphics, logos, images, and software, is the property of Shoppygain or its content suppliers and is protected by international copyright laws.<br />
            5.2. Our platform may feature content from various vendors. The intellectual property rights for these products remain with the respective vendors or rights holders.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">6. Limitation of Liability</h2>
          <p>
            6.1. Shoppygain shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our services.<br />
            6.2. We do not guarantee that the platform will be secure or free from bugs or viruses.<br />
            6.3. We cannot guarantee the quality of any products, services, information, or materials purchased or obtained through the platform.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">7. Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of Bangladesh, and any disputes will be subject to the exclusive jurisdiction of the courts of Bangladesh.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">8. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the platform. Your continued use of the platform after any changes indicates your acceptance of the modified terms.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">9. Contact Us</h2>
          <p>
            If you have any questions about these Terms and Conditions, please contact us at:<br />
            Email: legal@shoppygain.com<br />
            Phone: +880 123 456 7890
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;

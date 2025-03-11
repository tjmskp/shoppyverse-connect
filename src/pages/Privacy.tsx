
import Layout from "@/components/layout/Layout";
import { Separator } from "@/components/ui/separator";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

const Privacy = () => {
  const { t } = useLanguage();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">{t('privacyPolicy')}</h1>
        <Separator className="mb-8" />
        
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-500 mb-8">Last updated: June 1, 2024</p>
          
          <div className="mb-10">
            <p className="mb-4">
              At Shoppygain, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
            <p>
              Please read this Privacy Policy carefully. By accessing or using our platform, you acknowledge that you have read, understood, and agree to be bound by all the terms outlined in this policy.
            </p>
          </div>
          
          <Accordion type="single" collapsible className="mb-8">
            <AccordionItem value="privacy-1">
              <AccordionTrigger>Information We Collect</AccordionTrigger>
              <AccordionContent>
                <p className="font-medium mb-2">Personal Information</p>
                <p className="mb-4">
                  We may collect personal information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>Create an account or profile</li>
                  <li>Place an order or make a purchase</li>
                  <li>Sign up for our newsletter</li>
                  <li>Contact our customer service</li>
                  <li>Participate in promotions, surveys, or contests</li>
                  <li>Apply to become a vendor</li>
                </ul>
                <p className="mb-2">The personal information we collect may include:</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>Name, email address, phone number, and delivery address</li>
                  <li>Payment information</li>
                  <li>Purchase history and preferences</li>
                  <li>Communications with our customer service team</li>
                </ul>
                
                <p className="font-medium mb-2">Automatically Collected Information</p>
                <p className="mb-4">
                  When you visit our website, we may automatically collect certain information about your device and usage patterns, including:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>IP address and device identifiers</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Pages viewed and navigation patterns</li>
                  <li>Time and date of your visit</li>
                  <li>Referring website or application</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="privacy-2">
              <AccordionTrigger>How We Use Your Information</AccordionTrigger>
              <AccordionContent>
                <p className="mb-4">
                  We use the information we collect for various purposes, including:
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>Processing and fulfilling your orders</li>
                  <li>Managing your account and providing customer support</li>
                  <li>Communicating with you about orders, products, services, and promotional offers</li>
                  <li>Personalizing your shopping experience</li>
                  <li>Improving our website, products, and services</li>
                  <li>Detecting and preventing fraud or unauthorized access</li>
                  <li>Complying with legal obligations</li>
                </ul>
                <p>
                  We will only retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required for legal, tax, accounting, or other legitimate purposes.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="privacy-3">
              <AccordionTrigger>How We Share Your Information</AccordionTrigger>
              <AccordionContent>
                <p className="mb-4">
                  We may share your information with the following categories of third parties:
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li><strong>Vendors:</strong> When you purchase products from a vendor on our platform, we share necessary information (such as your name, delivery address, and order details) with the vendor to fulfill your order.</li>
                  <li><strong>Service Providers:</strong> We may share your information with third-party service providers who perform services on our behalf, such as payment processing, data analysis, email delivery, hosting, customer service, and marketing assistance.</li>
                  <li><strong>Business Partners:</strong> We may share your information with business partners to offer you certain products, services, or promotions.</li>
                  <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid legal requests, such as subpoenas, court orders, or government regulations.</li>
                </ul>
                <p>
                  We do not sell your personal information to third parties for their marketing purposes without your explicit consent.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="privacy-4">
              <AccordionTrigger>Cookies and Tracking Technologies</AccordionTrigger>
              <AccordionContent>
                <p className="mb-4">
                  We use cookies and similar tracking technologies to collect and track information about your browsing activities on our website. Cookies are small text files that are stored on your device when you visit a website.
                </p>
                <p className="mb-4">
                  We use the following types of cookies:
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li><strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly and cannot be turned off in our systems.</li>
                  <li><strong>Analytical/Performance Cookies:</strong> These cookies allow us to recognize and count the number of visitors and see how visitors move around our website when they are using it.</li>
                  <li><strong>Functionality Cookies:</strong> These cookies enable the website to provide enhanced functionality and personalization.</li>
                  <li><strong>Targeting Cookies:</strong> These cookies record your visit to our website, the pages you have visited, and the links you have followed.</li>
                </ul>
                <p>
                  You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. However, if you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="privacy-5">
              <AccordionTrigger>Your Rights and Choices</AccordionTrigger>
              <AccordionContent>
                <p className="mb-4">
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>The right to access the personal information we hold about you</li>
                  <li>The right to request correction of inaccurate personal information</li>
                  <li>The right to request deletion of your personal information</li>
                  <li>The right to restrict or object to processing of your personal information</li>
                  <li>The right to data portability</li>
                  <li>The right to withdraw consent at any time</li>
                </ul>
                <p className="mb-4">
                  To exercise these rights, please contact us using the contact information provided at the end of this Privacy Policy.
                </p>
                <p>
                  Please note that these rights may be limited in some circumstances by local law requirements.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="privacy-6">
              <AccordionTrigger>Data Security</AccordionTrigger>
              <AccordionContent>
                <p className="mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage.
                </p>
                <p className="mb-4">
                  While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security. No method of transmission over the Internet or method of electronic storage is 100% secure.
                </p>
                <p>
                  We urge you to take steps to keep your personal information safe by not sharing your password and by logging out of your account after each use.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="privacy-7">
              <AccordionTrigger>Changes to this Privacy Policy</AccordionTrigger>
              <AccordionContent>
                <p className="mb-4">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.
                </p>
                <p className="mb-4">
                  The updated version will be effective as of the date stated at the top of this Privacy Policy. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.
                </p>
                <p>
                  Your continued use of our platform after the effective date of the updated Privacy Policy constitutes your acceptance of the changes.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="bg-gray-100 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <p>
              Email: privacy@shoppygain.com<br />
              Phone: +880 123 456 7890<br />
              Address: 123 Fashion Street, Dhaka, Bangladesh
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;

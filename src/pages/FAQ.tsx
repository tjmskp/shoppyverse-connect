
import Layout from "@/components/layout/Layout";
import { Separator } from "@/components/ui/separator";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const FAQ = () => {
  const { t } = useLanguage();
  
  const faqCategories = [
    {
      id: "shopping",
      name: "Shopping",
      items: [
        {
          question: "How do I place an order?",
          answer: "You can place an order by browsing our products, adding them to your cart, and proceeding to checkout. Follow the checkout steps to complete your purchase."
        },
        {
          question: "Can I modify or cancel my order?",
          answer: "You can modify or cancel your order within 1 hour of placing it by contacting our customer service team. After this window, orders are processed for shipping and cannot be changed."
        },
        {
          question: "Do you offer international shipping?",
          answer: "Currently, we only ship within Bangladesh. We're working on expanding our shipping capabilities and hope to offer international shipping in the future."
        },
        {
          question: "How can I track my order?",
          answer: "Once your order ships, you'll receive a tracking number via email. You can use this number on our Track Order page to monitor your delivery status."
        }
      ]
    },
    {
      id: "payments",
      name: "Payments",
      items: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept credit/debit cards, mobile banking (bKash, Nagad, Rocket), and cash on delivery for orders within Bangladesh."
        },
        {
          question: "Is it safe to use my credit card on your website?",
          answer: "Yes, our payment gateway is encrypted and secure. We do not store your credit card information on our servers."
        },
        {
          question: "When will my card be charged?",
          answer: "Your card will be charged immediately upon completing your order."
        },
        {
          question: "Do you offer cash on delivery?",
          answer: "Yes, we offer cash on delivery for orders within Bangladesh."
        }
      ]
    },
    {
      id: "returns",
      name: "Returns & Refunds",
      items: [
        {
          question: "What is your return policy?",
          answer: "We offer a 14-day return policy for most items. Products must be unused, in their original packaging, and with all tags attached."
        },
        {
          question: "How do I initiate a return?",
          answer: "To initiate a return, log into your account, go to your orders, select the item you wish to return, and follow the return instructions. You can also contact our customer service for assistance."
        },
        {
          question: "How long does it take to process a refund?",
          answer: "Once we receive your returned item, it takes 3-5 business days to process your refund. The amount will be credited back to your original payment method."
        },
        {
          question: "Are there any items that cannot be returned?",
          answer: "Yes, certain items like intimate apparel, customized products, and sale items marked as final sale cannot be returned. Please check the product description for return eligibility."
        }
      ]
    },
    {
      id: "vendors",
      name: "For Vendors",
      items: [
        {
          question: "How can I become a vendor on Shoppygain?",
          answer: "To become a vendor, fill out the application form on our Become a Vendor page. Our team will review your application and respond within 7 business days."
        },
        {
          question: "What are the fees for vendors?",
          answer: "We charge a 10% commission on each sale. There are no setup fees or monthly charges for maintaining your store on our platform."
        },
        {
          question: "How and when do vendors get paid?",
          answer: "Vendors are paid bi-weekly for all settled orders. Payments are made via bank transfer to your registered account."
        },
        {
          question: "How do I manage my inventory?",
          answer: "As a vendor, you'll have access to a dedicated dashboard where you can add products, manage inventory, process orders, and view sales analytics."
        }
      ]
    }
  ];
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">{t('faq')}</h1>
        <Separator className="mb-8" />
        
        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Input
              placeholder="Search frequently asked questions..."
              className="pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
        
        {/* FAQ Categories */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          {faqCategories.map(category => (
            <Button
              key={category.id}
              variant="outline"
              onClick={() => document.getElementById(category.id).scrollIntoView({behavior: 'smooth'})}
              className="justify-start h-auto py-3"
            >
              {category.name}
            </Button>
          ))}
        </div>
        
        {/* FAQ Items */}
        <div className="space-y-12">
          {faqCategories.map(category => (
            <div key={category.id} id={category.id}>
              <h2 className="text-2xl font-semibold mb-6">{category.name}</h2>
              <Accordion type="single" collapsible className="mb-8">
                {category.items.map((item, index) => (
                  <AccordionItem key={index} value={`${category.id}-item-${index}`}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
        
        {/* Contact Section */}
        <div className="bg-gray-100 p-8 rounded-lg mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Couldn't Find Your Answer?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Our customer support team is here to help. Feel free to reach out with any questions you might have.
          </p>
          <Button asChild>
            <Link to="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;

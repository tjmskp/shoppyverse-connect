
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define our language types
export type Language = 'en' | 'bn';

// Create translations object type
type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

// Create our translations
export const translations: Translations = {
  en: {
    // Header
    home: 'Home',
    shop: 'Shop',
    vendors: 'Vendors',
    about: 'About',
    wishlist: 'Wishlist',
    login: 'Login',
    register: 'Register',
    search: 'Search for products...',
    // Footer
    quickLinks: 'Quick Links',
    shopAll: 'Shop All',
    aboutUs: 'About Us',
    blog: 'Blog',
    contactUs: 'Contact Us',
    customerService: 'Customer Service',
    faq: 'FAQ',
    shippingReturns: 'Shipping & Returns',
    termsConditions: 'Terms & Conditions',
    privacyPolicy: 'Privacy Policy',
    trackOrder: 'Track Order',
    // Home Page
    experienceBangladeshiFashion: 'Experience Bangladeshi Fashion',
    discoverUniqueDesigns: 'Discover unique designs from the best local brands, all in one place.',
    shopNow: 'Shop Now',
    // General
    continue: 'Continue',
    submit: 'Submit',
    cancel: 'Cancel',
    loading: 'Loading...',
    viewMore: 'View More',
    orderNow: 'Order Now',
    continueShopping: 'Continue Shopping',
  },
  bn: {
    // Header
    home: 'হোম',
    shop: 'শপ',
    vendors: 'বিক্রেতারা',
    about: 'সম্পর্কে',
    wishlist: 'পছন্দের তালিকা',
    login: 'লগইন',
    register: 'নিবন্ধন করুন',
    search: 'পণ্য খুঁজুন...',
    // Footer
    quickLinks: 'দ্রুত লিঙ্ক',
    shopAll: 'সব দেখুন',
    aboutUs: 'আমাদের সম্পর্কে',
    blog: 'ব্লগ',
    contactUs: 'যোগাযোগ করুন',
    customerService: 'গ্রাহক সেবা',
    faq: 'সাধারণ জিজ্ঞাসা',
    shippingReturns: 'শিপিং এবং রিটার্ন',
    termsConditions: 'শর্তাবলী',
    privacyPolicy: 'গোপনীয়তা নীতি',
    trackOrder: 'অর্ডার ট্র্যাক করুন',
    // Home Page
    experienceBangladeshiFashion: 'বাংলাদেশী ফ্যাশন অনুভব করুন',
    discoverUniqueDesigns: 'সেরা স্থানীয় ব্র্যান্ডগুলির অনন্য ডিজাইন আবিষ্কার করুন, সবকিছু এক জায়গায়।',
    shopNow: 'এখনই কিনুন',
    // General
    continue: 'চালিয়ে যান',
    submit: 'জমা দিন',
    cancel: 'বাতিল করুন',
    loading: 'লোড হচ্ছে...',
    viewMore: 'আরো দেখুন',
    orderNow: 'এখনই অর্ডার করুন',
    continueShopping: 'কেনাকাটা চালিয়ে যান',
  },
};

// Define our context type
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// Create the context with a default value
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

// Create the provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Get saved language from localStorage or default to English
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'en';
  });

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
    // Update the HTML lang attribute
    document.documentElement.lang = language;
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    if (translations[language] && translations[language][key]) {
      return translations[language][key];
    }
    
    // Fallback to English if the key doesn't exist in the current language
    if (translations['en'] && translations['en'][key]) {
      return translations['en'][key];
    }
    
    // Return the key itself if not found in any language
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);


import Layout from "@/components/layout/Layout";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const Blog = () => {
  const { t } = useLanguage();
  
  // Mock blog posts
  const blogPosts = [
    {
      id: 1,
      title: "2024 Fashion Trends in Bangladesh",
      excerpt: "Explore the latest fashion trends taking Bangladesh by storm this year...",
      date: "June 5, 2024",
      category: "Fashion Trends",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      title: "Sustainable Fashion: The Future of Bangladeshi Textiles",
      excerpt: "How local designers are embracing eco-friendly practices while preserving traditional craftsmanship...",
      date: "May 22, 2024",
      category: "Sustainability",
      image: "https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      title: "From Local to Global: Bangladeshi Fashion on the World Stage",
      excerpt: "How local designers are making waves internationally while staying true to their roots...",
      date: "May 8, 2024",
      category: "Industry News",
      image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      title: "The Art of Styling: Create Stunning Looks with Minimal Pieces",
      excerpt: "Expert tips on maximizing your wardrobe with versatile Bangladeshi fashion items...",
      date: "April 29, 2024",
      category: "Style Tips",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
  ];
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">{t('blog')}</h1>
        <Separator className="mb-8" />
        
        {/* Featured Post */}
        <div className="mb-12">
          <div className="relative rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
              alt="Featured Post" 
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              <span className="bg-white text-black px-3 py-1 rounded-full text-sm font-medium">Featured</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mt-3">The Renaissance of Traditional Bangladeshi Textiles</h2>
              <p className="text-gray-200 mt-2">Exploring how modern designers are revitalizing ancient textile traditions...</p>
              <Button className="mt-4">Read Article</Button>
            </div>
          </div>
        </div>
        
        {/* All Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map(post => (
            <Card key={post.id} className="overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{post.category}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/blog/${post.id}`}>Read More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Newsletter */}
        <div className="bg-gray-100 p-8 rounded-lg mt-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Subscribe to Our Blog</h3>
            <p className="text-gray-600 mb-6">Get the latest fashion insights, styling tips, and industry news delivered to your inbox.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;

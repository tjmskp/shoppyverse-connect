
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { mockProducts } from "@/data/mockData";
import { Product } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";

const Category = () => {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    setLoading(true);
    // Filter products by category
    const filteredProducts = mockProducts.filter(
      product => product.category.toLowerCase() === slug?.toLowerCase()
    );
    setProducts(filteredProducts);
    setLoading(false);
  }, [slug]);

  return (
    <Layout>
      {/* Category Header */}
      <div className="bg-black text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 capitalize">{slug}</h1>
          <p className="max-w-2xl mx-auto text-gray-300">
            Browse our collection of {slug} products
          </p>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
          </div>
        ) : (
          <div>
            {products.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">We couldn't find any products in this category</p>
                <Button asChild>
                  <a href="/shop">{t('shopAll')}</a>
                </Button>
              </div>
            ) : (
              <div>
                <p className="text-sm text-gray-500 mb-4">
                  Showing {products.length} products in {slug}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Category;

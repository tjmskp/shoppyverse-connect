
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UploadCloud, AlertCircle, FileText, DownloadCloud } from "lucide-react";
import { ProductCSVData, CSV_PRODUCT_SAMPLE } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ProductCSVImportProps {
  vendorId?: string;
  onSuccess?: () => void;
}

const ProductCSVImport = ({ vendorId, onSuccess }: ProductCSVImportProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState<{
    success: number;
    failed: number;
    errors: string[];
  } | null>(null);
  const { toast } = useToast();

  const parseCSV = (text: string): ProductCSVData[] => {
    const lines = text.split('\n');
    const headers = lines[0].split(',');
    
    const products: ProductCSVData[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      
      const values = lines[i].split(',');
      const product: any = {};
      
      headers.forEach((header, index) => {
        if (header === 'images') {
          // Handle images as pipe-separated URLs
          product[header] = values[index];
        } else if (header === 'price' || header === 'discount' || header === 'stock') {
          // Convert numeric values
          product[header] = parseFloat(values[index]);
        } else {
          product[header] = values[index];
        }
      });
      
      products.push(product as ProductCSVData);
    }
    
    return products;
  };

  const uploadProducts = async (products: ProductCSVData[]) => {
    const errors: string[] = [];
    let successCount = 0;
    let failedCount = 0;
    
    for (const product of products) {
      try {
        // For vendors, automatically assign their ID
        const vendorName = vendorId ? undefined : product.vendor;
        
        // Convert pipe-separated image URLs to array
        const imagesArray = product.images.split('|').map(url => url.trim());
        
        const { error } = await supabase
          .from('products')
          .insert({
            name: product.name,
            description: product.description,
            price: product.price,
            discount: product.discount,
            category: product.category,
            stock: product.stock,
            images: imagesArray,
            vendor: vendorId || vendorName || 'Unknown Vendor',
          });
          
        if (error) {
          errors.push(`Error uploading ${product.name}: ${error.message}`);
          failedCount++;
        } else {
          successCount++;
        }
      } catch (err: any) {
        errors.push(`Error processing ${product.name}: ${err.message}`);
        failedCount++;
      }
    }
    
    return { success: successCount, failed: failedCount, errors };
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a CSV file to upload",
        variant: "destructive"
      });
      return;
    }
    
    setUploading(true);
    setResults(null);
    
    try {
      const text = await file.text();
      const products = parseCSV(text);
      
      if (products.length === 0) {
        toast({
          title: "Error",
          description: "No valid products found in CSV",
          variant: "destructive"
        });
        setUploading(false);
        return;
      }
      
      const results = await uploadProducts(products);
      setResults(results);
      
      if (results.success > 0) {
        toast({
          title: "Upload Complete",
          description: `Successfully uploaded ${results.success} products (${results.failed} failed)`,
          variant: results.failed > 0 ? "default" : "default" // Changed from "success" to "default"
        });
        
        if (onSuccess) {
          onSuccess();
        }
      } else {
        toast({
          title: "Upload Failed",
          description: "No products were uploaded successfully",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to process CSV: ${error.message}`,
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const downloadSample = () => {
    const blob = new Blob([CSV_PRODUCT_SAMPLE], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'sample_products.csv');
    a.click();
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Bulk Product Import</CardTitle>
        <CardDescription>
          Upload multiple products at once using a CSV file
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                <UploadCloud className="h-10 w-10 text-gray-400 mb-2" />
                {file ? (
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-500" />
                    <span className="text-sm font-medium">{file.name}</span>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    Drag & drop your CSV file here, or click to browse
                  </p>
                )}
                <Input 
                  type="file" 
                  accept=".csv" 
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                />
              </div>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                className="mt-2 self-end flex items-center" 
                onClick={downloadSample}
              >
                <DownloadCloud className="h-4 w-4 mr-2" />
                Download Sample CSV
              </Button>
            </div>
          </div>
          
          {results?.errors.length ? (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Import Errors</AlertTitle>
              <AlertDescription>
                <div className="max-h-40 overflow-y-auto text-sm">
                  {results.errors.map((error, index) => (
                    <div key={index} className="py-1">{error}</div>
                  ))}
                </div>
              </AlertDescription>
            </Alert>
          ) : null}
          
          <div className="text-sm text-gray-500 mt-4">
            <p className="font-semibold">Required CSV columns:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>name - Product name</li>
              <li>description - Product description</li>
              <li>price - Price in cents (e.g., 1999 for $19.99)</li>
              <li>discount - Discount percentage (0-100)</li>
              <li>category - Product category name</li>
              <li>stock - Available quantity</li>
              <li>images - Image URLs separated by | character</li>
              {!vendorId && <li>vendor - Vendor name (for admin upload only)</li>}
            </ul>
          </div>
          
          <Button type="submit" disabled={!file || uploading} className="w-full">
            {uploading ? "Uploading..." : "Upload Products"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="bg-gray-50 border-t rounded-b-lg">
        <div className="text-xs text-gray-500 w-full">
          Note: Large CSV files may take a moment to process. Please be patient.
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCSVImport;

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";

enum AuthMode {
  LOGIN = "login",
  REGISTER = "register",
}

enum UserRole {
  CUSTOMER = "customer",
  VENDOR = "vendor",
}

const Login = () => {
  const navigate = useNavigate();
  const { user, signIn, signUp } = useAuth();
  const [mode, setMode] = useState<AuthMode>(AuthMode.LOGIN);
  const [isLoading, setIsLoading] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(UserRole.CUSTOMER);
  
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  
  const [storeName, setStoreName] = useState("");
  const [storeDescription, setStoreDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { success, error } = await signIn(loginEmail, loginPassword);
      
      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome back to Shoppygain!",
        });
        navigate('/');
      } else {
        toast({
          title: "Login failed",
          description: error || "Invalid email or password. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerPassword !== registerConfirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    if (userRole === UserRole.VENDOR && !acceptTerms) {
      toast({
        title: "Terms and conditions required",
        description: "You must accept the terms and conditions to register as a vendor.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const userMetadata = {
        full_name: registerName,
        role: userRole.toLowerCase(),
      };
      
      if (userRole === UserRole.VENDOR) {
        Object.assign(userMetadata, {
          store_name: storeName,
          store_description: storeDescription,
          phone: phoneNumber,
          address: address,
        });
      }
      
      const { success, error } = await signUp(
        registerEmail, 
        registerPassword,
        userMetadata
      );
      
      if (success) {
        toast({
          title: "Registration successful",
          description: "Please check your email to verify your account.",
        });
        setMode(AuthMode.LOGIN);
      } else {
        toast({
          title: "Registration failed",
          description: error || "An error occurred during registration",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {mode === AuthMode.LOGIN ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-gray-600">
              {mode === AuthMode.LOGIN
                ? "Sign in to your Shoppygain account"
                : "Join Shoppygain to discover Bangladeshi fashion"}
            </p>
          </div>
          
          <div className="flex border-b border-gray-200 mb-8">
            <button
              className={`flex-1 py-3 font-medium text-center transition-colors ${
                mode === AuthMode.LOGIN
                  ? "text-black border-b-2 border-black"
                  : "text-gray-500 hover:text-gray-900"
              }`}
              onClick={() => setMode(AuthMode.LOGIN)}
            >
              Login
            </button>
            <button
              className={`flex-1 py-3 font-medium text-center transition-colors ${
                mode === AuthMode.REGISTER
                  ? "text-black border-b-2 border-black"
                  : "text-gray-500 hover:text-gray-900"
              }`}
              onClick={() => setMode(AuthMode.REGISTER)}
            >
              Register
            </button>
          </div>
          
          {mode === AuthMode.LOGIN && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email address"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Link to="/forgot-password" className="text-sm text-black hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="pt-2">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </div>
              
              <div className="flex items-center my-4">
                <div className="flex-grow h-px bg-gray-200"></div>
                <span className="px-3 text-sm text-gray-500">Or continue with</span>
                <div className="flex-grow h-px bg-gray-200"></div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    toast({
                      title: "Google Sign In",
                      description: "This feature is not implemented yet.",
                    });
                  }}
                >
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    toast({
                      title: "Facebook Sign In",
                      description: "This feature is not implemented yet.",
                    });
                  }}
                >
                  Facebook
                </Button>
              </div>
              
              <p className="mt-4 text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="text-black font-medium hover:underline"
                  onClick={() => setMode(AuthMode.REGISTER)}
                >
                  Sign up now
                </button>
              </p>
            </form>
          )}
          
          {mode === AuthMode.REGISTER && (
            <div>
              <Tabs defaultValue={UserRole.CUSTOMER} className="mb-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger 
                    value={UserRole.CUSTOMER}
                    onClick={() => setUserRole(UserRole.CUSTOMER)}
                  >
                    Customer
                  </TabsTrigger>
                  <TabsTrigger 
                    value={UserRole.VENDOR}
                    onClick={() => setUserRole(UserRole.VENDOR)}
                  >
                    Vendor
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value={UserRole.CUSTOMER} className="mt-4">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your full name"
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="Your email address"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="Create a password"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        required
                        minLength={8}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Password must be at least 8 characters long
                      </p>
                    </div>
                    
                    <div>
                      <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                      </label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm your password"
                        value={registerConfirmPassword}
                        onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                        required
                        minLength={8}
                      />
                    </div>
                    
                    <div className="flex items-center">
                      <Checkbox 
                        id="terms" 
                        required 
                        className="border-gray-300"
                      />
                      <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                        I agree to the{" "}
                        <Link to="/terms" className="text-black hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="text-black hover:underline">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                    
                    <div className="pt-2">
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Creating Account..." : "Create Account"}
                      </Button>
                    </div>
                  </form>
                </TabsContent>
                
                <TabsContent value={UserRole.VENDOR} className="mt-4">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <label htmlFor="vendor-name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <Input
                        id="vendor-name"
                        type="text"
                        placeholder="Your full name"
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="store-name" className="block text-sm font-medium text-gray-700 mb-1">
                        Store Name
                      </label>
                      <Input
                        id="store-name"
                        type="text"
                        placeholder="Your store name"
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="store-description" className="block text-sm font-medium text-gray-700 mb-1">
                        Store Description
                      </label>
                      <Input
                        id="store-description"
                        type="text"
                        placeholder="Brief description of your store"
                        value={storeDescription}
                        onChange={(e) => setStoreDescription(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="vendor-email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <Input
                        id="vendor-email"
                        type="email"
                        placeholder="Your business email address"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <Input
                        id="phone-number"
                        type="tel"
                        placeholder="Your business phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Business Address
                      </label>
                      <Input
                        id="address"
                        type="text"
                        placeholder="Your business address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="vendor-password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <Input
                        id="vendor-password"
                        type="password"
                        placeholder="Create a password"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        required
                        minLength={8}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Password must be at least 8 characters long
                      </p>
                    </div>
                    
                    <div>
                      <label htmlFor="vendor-confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                      </label>
                      <Input
                        id="vendor-confirm-password"
                        type="password"
                        placeholder="Confirm your password"
                        value={registerConfirmPassword}
                        onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                        required
                        minLength={8}
                      />
                    </div>
                    
                    <div className="flex items-start mt-4">
                      <Checkbox 
                        id="vendor-terms" 
                        checked={acceptTerms}
                        onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                        className="border-gray-300 mt-1"
                      />
                      <label htmlFor="vendor-terms" className="ml-2 block text-sm text-gray-700">
                        I agree to the{" "}
                        <Link to="/terms" className="text-black hover:underline">
                          Terms of Service
                        </Link>
                        ,{" "}
                        <Link to="/privacy" className="text-black hover:underline">
                          Privacy Policy
                        </Link>
                        , and the{" "}
                        <Link to="/vendor-agreement" className="text-black hover:underline">
                          Vendor Agreement
                        </Link>
                        . I confirm that my business is registered in Bangladesh.
                      </label>
                    </div>
                    
                    <div className="pt-2">
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Creating Vendor Account..." : "Create Vendor Account"}
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
              
              <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-black font-medium hover:underline"
                  onClick={() => setMode(AuthMode.LOGIN)}
                >
                  Sign in
                </button>
              </p>
            </div>
          )}
          
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>By using Shoppygain, you agree to our</p>
            <div className="flex justify-center space-x-2 mt-1">
              <Link to="/terms" className="text-black hover:underline">
                Terms of Service
              </Link>
              <span>•</span>
              <Link to="/privacy" className="text-black hover:underline">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;

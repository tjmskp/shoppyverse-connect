
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

enum AuthMode {
  LOGIN = "login",
  REGISTER = "register",
}

const Login = () => {
  const [mode, setMode] = useState<AuthMode>(AuthMode.LOGIN);
  const [isLoading, setIsLoading] = useState(false);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Register form state
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Hardcoded admin login check
      if (loginEmail === "tjms.kp@gmail.com" && loginPassword === "Pjokjict4@#") {
        toast({
          title: "Admin login successful",
          description: "Redirecting to admin dashboard...",
        });
        // In a real app, would redirect to admin dashboard and set auth state
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
        });
      }
    }, 1000);
  };
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (registerPassword !== registerConfirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Registration successful",
        description: "Your account has been created. Please log in.",
      });
      setMode(AuthMode.LOGIN);
    }, 1000);
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
          
          {/* Auth Tabs */}
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
          
          {/* Login Form */}
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
          
          {/* Register Form */}
          {mode === AuthMode.REGISTER && (
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
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 border-gray-300 rounded"
                  required
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
            </form>
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

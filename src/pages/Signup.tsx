
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import GradientText from "@/components/ui/GradientText";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

type SignupFormValues = z.infer<typeof signupSchema>;

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'success' | 'error'>('checking');
  const { signUp, testConnection } = useAuth();
  const navigate = useNavigate();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: ""
    }
  });

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const result = await testConnection();
        setConnectionStatus(result.success ? 'success' : 'error');
        if (!result.success) {
          setErrorMessage("Cannot connect to authentication service. Please check your internet connection.");
        }
      } catch (error) {
        setConnectionStatus('error');
        setErrorMessage("Failed to check connection to authentication service.");
      }
    };

    checkConnection();
  }, [testConnection]);

  const onSubmit = async (values: SignupFormValues) => {
    if (connectionStatus === 'error') {
      setErrorMessage("Cannot connect to authentication service. Please check your internet connection.");
      return;
    }

    setErrorMessage(null);
    setIsLoading(true);
    
    try {
      await signUp(values.email, values.password, values.username);
      navigate("/");
    } catch (error: any) {
      console.error("Signup error:", error);
      setErrorMessage(error.message || "Failed to create your account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-universe-darker p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-universe-card border-universe-neonPurple">
          <CardHeader className="space-y-1 text-center">
            <GradientText gradient="purple-pink" element="h1" className="text-3xl font-bold">
              Create Account
            </GradientText>
            <CardDescription className="text-gray-400">
              Sign up to join Uni-Verse and connect with your community
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {connectionStatus === 'error' && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>
                  Cannot connect to authentication service. Please check your internet connection.
                </AlertDescription>
              </Alert>
            )}
            
            {errorMessage && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="username">Username</Label>
                      <FormControl>
                        <Input
                          id="username"
                          placeholder="Choose a username"
                          disabled={isLoading}
                          className="bg-universe-dark border-universe-card"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="email">Email</Label>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          disabled={isLoading}
                          className="bg-universe-dark border-universe-card"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="password">Password</Label>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Create a password"
                          disabled={isLoading}
                          className="bg-universe-dark border-universe-card"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button
                  type="submit"
                  className="w-full bg-universe-neonPurple hover:bg-universe-neonPurple/80"
                  disabled={isLoading || connectionStatus === 'checking'}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : connectionStatus === 'checking' ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Checking connection...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-universe-neonPurple hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Signup;

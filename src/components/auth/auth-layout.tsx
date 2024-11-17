import { Logo } from "@/components/ui/logo";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface AuthLayoutProps {
  children: React.ReactNode;
  heading: string;
  subheading: string;
  showSignUpLink?: boolean;
  showSignInLink?: boolean;
  className?: string;
}

export function AuthLayout({ 
  children, 
  heading, 
  subheading,
  showSignUpLink,
  showSignInLink,
  className,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex relative overflow-hidden bg-muted">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10" />
        <div className="relative w-full h-full flex flex-col justify-between p-12">
          <Link to="/">
            <Logo className="h-8 w-auto" />
          </Link>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">
              Make data-driven betting decisions
            </h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-primary" />
                AI-powered analytics
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-primary" />
                Real-time odds tracking
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-primary" />
                Expert insights
              </li>
            </ul>
          </div>

          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Favor. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex items-center justify-center p-8">
        <div className={cn("w-full max-w-sm space-y-6", className)}>
          <div className="flex flex-col items-center space-y-2 text-center">
            <Link to="/" className="lg:hidden mb-4">
              <Logo className="h-8 w-auto" />
            </Link>
            
            <h1 className="text-2xl font-bold tracking-tight">{heading}</h1>
            <p className="text-muted-foreground">{subheading}</p>
          </div>

          {children}

          <div className="text-sm text-center text-muted-foreground">
            {showSignUpLink && (
              <>
                Don't have an account?{" "}
                <Link 
                  to="/sign-up" 
                  className="font-medium text-primary hover:underline"
                >
                  Sign up
                </Link>
              </>
            )}
            {showSignInLink && (
              <>
                Already have an account?{" "}
                <Link 
                  to="/sign-in" 
                  className="font-medium text-primary hover:underline"
                >
                  Sign in
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
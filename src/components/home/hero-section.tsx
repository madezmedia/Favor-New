import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { SignInButton, SignUpButton } from "@clerk/clerk-react";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5" />
      
      <div className="relative container mx-auto px-4 py-24">
        <div className="text-center space-y-8 max-w-3xl mx-auto">
          <div className="flex justify-center">
            <Logo className="h-32 w-auto animate-fade-in" />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Professional Sports Betting Analytics
            </h1>
            <p className="text-xl text-muted-foreground">
              Make informed decisions with AI-powered analysis, real-time odds tracking, and expert insights
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <SignUpButton mode="modal">
              <Button size="lg" className="text-lg w-full sm:w-auto">
                Get Started
              </Button>
            </SignUpButton>
            
            <SignInButton mode="modal">
              <Button size="lg" variant="outline" className="text-lg w-full sm:w-auto">
                Sign In
              </Button>
            </SignInButton>
          </div>
        </div>
      </div>
    </div>
  );
}
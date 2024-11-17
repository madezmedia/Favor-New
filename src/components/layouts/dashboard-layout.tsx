import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';
import { Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetHeader,
  SheetTitle 
} from '@/components/ui/sheet';
import { Sidebar } from './sidebar';
import { Logo } from '@/components/ui/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

export default function DashboardLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Navigation */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <div className="flex items-center justify-between h-16 px-4 border-b lg:hidden">
          <Logo className="h-8" iconOnly />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <UserButton 
              afterSignOutUrl="/sign-in"
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8"
                }
              }}
            />
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
          </div>
        </div>
        <SheetContent 
          side="left" 
          className="p-0 w-72 border-r"
          onInteractOutside={() => setIsMobileOpen(false)}
        >
          <SheetHeader className="h-16 px-6 border-b flex items-center">
            <SheetTitle>
              <Logo className="h-8" />
            </SheetTitle>
          </SheetHeader>
          <Sidebar onNavigate={() => setIsMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Desktop Navigation */}
      <div 
        className={cn(
          "hidden lg:block fixed inset-y-0 left-0 z-50 border-r bg-card transition-all duration-300",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <div className="h-16 flex items-center justify-center px-4 border-b">
          <Logo 
            className={cn(
              "transition-all duration-300",
              isCollapsed ? "h-6" : "h-8"
            )}
            showTagline={!isCollapsed}
          />
        </div>
        <Sidebar collapsed={isCollapsed} />
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-20 rounded-full border shadow-md bg-background"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Main Content */}
      <div 
        className={cn(
          "flex flex-col min-h-screen transition-all duration-300",
          "lg:pl-64",
          isCollapsed && "lg:pl-16"
        )}
      >
        <header className="hidden lg:flex sticky top-0 z-40 border-b bg-card/80 backdrop-blur">
          <div className="container flex h-16 items-center justify-end py-4">
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <UserButton 
                afterSignOutUrl="/sign-in"
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8"
                  }
                }}
              />
            </div>
          </div>
        </header>
        <main className="flex-1 container py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
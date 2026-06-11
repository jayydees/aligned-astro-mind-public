import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Users, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Brain, 
  Star, 
  MessageSquareText,
  Info
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { to: "/", label: "Home", icon: Home },
  { to: "/dashboard", label: "Matches", icon: Users },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/psychology", label: "Psychology", icon: Brain },
  { to: "/vedic", label: "Vedic", icon: Star },
  { to: "/text-first", label: "Text-First", icon: MessageSquareText },
  { to: "/about", label: "About", icon: Info },
];

export const Navigation = () => {
  const { signOut, user } = useAuth();
  const { toast } = useToast();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    toast({
      title: "Logged out",
      description: "You have been signed out successfully.",
    });
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
              <span className="text-secondary font-bold text-xl">A</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Aligned
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Button
                key={link.to}
                variant={isActive(link.to) ? "secondary" : "ghost"}
                size="sm"
                asChild
              >
                <Link to={link.to} className="flex items-center gap-2">
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              </Button>
            ))}
            
            {user ? (
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            ) : (
              <Button variant="default" size="sm" asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-background">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                    <span className="text-secondary font-bold">A</span>
                  </div>
                  Aligned
                </SheetTitle>
              </SheetHeader>
              
              <div className="flex flex-col gap-2 mt-6">
                {navLinks.map((link) => (
                  <Button
                    key={link.to}
                    variant={isActive(link.to) ? "secondary" : "ghost"}
                    className="justify-start"
                    asChild
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link to={link.to} className="flex items-center gap-3">
                      <link.icon className="w-5 h-5" />
                      {link.label}
                    </Link>
                  </Button>
                ))}
                
                <div className="border-t border-border my-2" />
                
                {user ? (
                  <Button 
                    variant="ghost" 
                    className="justify-start text-destructive hover:text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Logout
                  </Button>
                ) : (
                  <Button variant="default" asChild onClick={() => setMobileMenuOpen(false)}>
                    <Link to="/auth">Sign In</Link>
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

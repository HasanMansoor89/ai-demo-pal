
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Mic } from "lucide-react";
import Dashboard from "@/components/Dashboard";
import AuthPage from "@/components/AuthPage";

type AppState = 'landing' | 'auth' | 'dashboard' | 'demo';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('landing');
  const [userEmail, setUserEmail] = useState<string>('');
  const [isDemoMode, setIsDemoMode] = useState(false);

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setIsDemoMode(false);
    setAppState('dashboard');
  };

  const handleDemoMode = () => {
    setUserEmail('');
    setIsDemoMode(true);
    setAppState('dashboard');
  };

  const handleLogout = () => {
    setUserEmail('');
    setIsDemoMode(false);
    setAppState('landing');
  };

  if (appState === 'auth') {
    return <AuthPage onLogin={handleLogin} onDemoMode={handleDemoMode} />;
  }

  if (appState === 'dashboard') {
    return <Dashboard onLogout={handleLogout} userEmail={userEmail} isDemoMode={isDemoMode} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-muted/40">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center">
                <Mic className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">DemoAI</span>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button 
                onClick={() => setAppState('auth')}
                className="bg-primary hover:bg-primary/90"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Mic className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Product demos, done by AI —{" "}
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                24/7
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Create engaging product demonstrations with AI-powered voice navigation, 
              real-time walkthroughs, and instant sharing capabilities.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-lg px-8 py-3"
              onClick={() => setAppState('auth')}
            >
              Get Started Free
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-3"
              onClick={handleDemoMode}
            >
              Try Demo Mode
            </Button>
          </div>
        </div>
      </section>

      {/* Rest of landing page content would go here... */}
      <div className="text-center py-20 text-muted-foreground">
        <p>Landing page content streamlined for demo purposes.</p>
        <p className="text-sm mt-2">Click "Get Started" or "Try Demo Mode" to continue.</p>
      </div>
    </div>
  );
};

export default Index;

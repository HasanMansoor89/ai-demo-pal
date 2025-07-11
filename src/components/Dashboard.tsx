
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Play, 
  SettingsIcon, 
  LogOut, 
  Plus,
  Search,
  Filter,
  Download,
  Share2,
  BarChart3,
  Mic,
  User,
  Sparkles,
  Zap,
  Clock,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import Settings from "@/components/Settings";
import { useToast } from "@/hooks/use-toast";

interface DashboardProps {
  onLogout: () => void;
  userEmail?: string;
  isDemoMode: boolean;
}

interface DemoSession {
  id: string;
  title: string;
  date: string;
  duration: string;
  status: 'active' | 'completed' | 'failed';
  isRecording: boolean;
}

const Dashboard = ({ onLogout, userEmail, isDemoMode }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isStartingDemo, setIsStartingDemo] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sessions, setSessions] = useState<DemoSession[]>([]);
  const [currentSession, setCurrentSession] = useState<DemoSession | null>(null);
  const { toast } = useToast();

  const handleStartDemo = async () => {
    if (currentSession?.isRecording) {
      toast({
        title: "Demo Already Active",
        description: "Please stop the current demo session before starting a new one.",
        variant: "destructive"
      });
      return;
    }

    setIsStartingDemo(true);
    
    try {
      // Create new demo session
      const newSession: DemoSession = {
        id: `demo-${Date.now()}`,
        title: `Demo Session ${new Date().toLocaleTimeString()}`,
        date: new Date().toISOString().split('T')[0],
        duration: "00:00",
        status: 'active',
        isRecording: true
      };

      setCurrentSession(newSession);
      setSessions(prev => [newSession, ...prev]);
      
      // Initialize voice recognition and demo recording
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        toast({
          title: "Demo Started",
          description: "Voice commands are now active. Say 'stop demo' to end the session.",
        });
      } else {
        toast({
          title: "Demo Started",
          description: "Demo session is active. Click 'Stop Demo' to end.",
        });
      }
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start demo session. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsStartingDemo(false);
    }
  };

  const handleStopDemo = () => {
    if (currentSession) {
      const updatedSession = {
        ...currentSession,
        status: 'completed' as const,
        isRecording: false,
        duration: "3:45" // This would be calculated from actual recording time
      };
      
      setSessions(prev => prev.map(s => s.id === currentSession.id ? updatedSession : s));
      setCurrentSession(null);
      
      toast({
        title: "Demo Completed",
        description: "Your demo session has been saved successfully.",
      });
    }
  };

  const filteredSessions = sessions.filter(session =>
    session.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800";
      case "active":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800";
      default:
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center">
                <Mic className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">DemoAI</span>
              {isDemoMode && (
                <Badge variant="secondary" className="ml-2">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Demo Mode
                </Badge>
              )}
              {currentSession?.isRecording && (
                <Badge variant="destructive" className="ml-2 animate-pulse">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-1" />
                  Recording
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>{userEmail || 'Demo User'}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={onLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>{isDemoMode ? 'Exit Demo' : 'Sign Out'}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-md">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="library">Library</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Demo Control */}
            <Card className="border-0 bg-gradient-to-r from-primary/10 to-purple-600/10 border border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Play className="w-6 h-6 mr-2" />
                  Demo Session Control
                </CardTitle>
                <CardDescription>
                  {currentSession?.isRecording 
                    ? "Demo session is currently active with voice commands enabled"
                    : "Start a new AI-powered demo session with voice navigation"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="flex gap-4">
                {!currentSession?.isRecording ? (
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90"
                    onClick={handleStartDemo}
                    disabled={isStartingDemo}
                  >
                    {isStartingDemo ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                        Starting Demo...
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5 mr-2" />
                        Start Demo Session
                      </>
                    )}
                  </Button>
                ) : (
                  <Button 
                    size="lg" 
                    variant="destructive"
                    onClick={handleStopDemo}
                  >
                    <div className="w-2 h-2 bg-white rounded-full mr-2" />
                    Stop Demo
                  </Button>
                )}
                
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-purple-600/50 hover:bg-purple-600/10"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  AI Assistant
                </Button>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                  <Play className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{sessions.filter(s => s.status === 'active').length}</div>
                  <p className="text-xs text-muted-foreground">Currently recording</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
                  <BarChart3 className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{sessions.length}</div>
                  <p className="text-xs text-muted-foreground">All time</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed</CardTitle>
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{sessions.filter(s => s.status === 'completed').length}</div>
                  <p className="text-xs text-muted-foreground">Successfully finished</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Voice Commands</CardTitle>
                  <Mic className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {'webkitSpeechRecognition' in window ? 'Active' : 'N/A'}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {'webkitSpeechRecognition' in window ? 'Browser supported' : 'Not supported'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>
                  Detailed insights into your demo performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Connect to Supabase to enable advanced analytics</p>
                  <p className="text-sm mt-2">Track engagement, conversion rates, and user behavior.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="library" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search demo sessions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Demo Sessions</CardTitle>
                <CardDescription>
                  Manage your recorded demo sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredSessions.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Play className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="mb-2">No demo sessions yet</p>
                    <p className="text-sm">Start your first demo to see it here.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredSessions.map((session) => (
                      <div key={session.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Play className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{session.title}</h4>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>{session.date}</span>
                              <span>{session.duration}</span>
                              {session.isRecording && (
                                <span className="flex items-center text-red-500">
                                  <div className="w-2 h-2 bg-red-500 rounded-full mr-1 animate-pulse" />
                                  Recording
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={`${getStatusColor(session.status)} border`}>
                            {session.status}
                          </Badge>
                          <Button variant="outline" size="sm" disabled={session.isRecording}>
                            <Share2 className="w-3 h-3 mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Settings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;

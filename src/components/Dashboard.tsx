
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Play, 
  Settings as SettingsIcon, 
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
  TrendingUp
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import Settings from "@/components/Settings";

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
  status: 'completed' | 'in-progress' | 'failed';
  views: number;
  engagement: number;
}

const Dashboard = ({ onLogout, userEmail, isDemoMode }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isStartingDemo, setIsStartingDemo] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sessions, setSessions] = useState<DemoSession[]>([]);
  const [stats, setStats] = useState({
    totalSessions: 0,
    avgDuration: "0:00",
    completionRate: 0,
    totalViews: 0
  });

  // Simulate loading data (in real app, this would be API calls)
  useEffect(() => {
    if (isDemoMode) {
      // Demo data
      setSessions([
        {
          id: "1",
          title: "Product Tour - E-commerce Platform",
          date: new Date().toISOString().split('T')[0],
          duration: "4:32",
          status: "completed",
          views: 156,
          engagement: 87
        },
        {
          id: "2", 
          title: "Feature Demo - AI Assistant",
          date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
          duration: "3:21",
          status: "completed",
          views: 203,
          engagement: 92
        }
      ]);
      setStats({
        totalSessions: 12,
        avgDuration: "4:15",
        completionRate: 89,
        totalViews: 1547
      });
    }
  }, [isDemoMode]);

  const handleStartDemo = () => {
    setIsStartingDemo(true);
    setTimeout(() => {
      setIsStartingDemo(false);
      // In real app, would navigate to demo interface
      alert("🎬 Demo session started! Voice commands are now active.");
    }, 2000);
  };

  const filteredSessions = sessions.filter(session =>
    session.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800";
      case "in-progress":
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
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>Welcome back, {userEmail || 'Demo User'}!</span>
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
            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Start Demo Card */}
              <Card className="border-0 bg-gradient-to-r from-primary/10 to-purple-600/10 border border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Play className="w-6 h-6 mr-2" />
                    Create New Demo
                  </CardTitle>
                  <CardDescription>
                    Start a new AI-powered demo session with voice navigation
                  </CardDescription>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>

              {/* AI Assistant Card */}
              <Card className="border-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-600/20">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Zap className="w-6 h-6 mr-2" />
                    AI Assistant
                  </CardTitle>
                  <CardDescription>
                    Get help optimizing your demos with AI suggestions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-purple-600/50 hover:bg-purple-600/10"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Get AI Suggestions
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
                  <Play className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalSessions}</div>
                  <p className="text-xs text-muted-foreground">
                    {isDemoMode ? "Demo data" : "+12% from last month"}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Duration</CardTitle>
                  <Clock className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.avgDuration}</div>
                  <p className="text-xs text-muted-foreground">
                    {isDemoMode ? "Sample metric" : "-8% from last month"}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.completionRate}%</div>
                  <p className="text-xs text-muted-foreground">
                    {isDemoMode ? "Demo metric" : "+5% from last month"}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                  <BarChart3 className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    {isDemoMode ? "Demo views" : "+23% from last month"}
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
                  <p>Analytics dashboard coming soon!</p>
                  <p className="text-sm">Track engagement, conversion rates, and user behavior.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="library" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search demos..."
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

            {/* Demo Sessions */}
            <Card>
              <CardHeader>
                <CardTitle>Demo Library</CardTitle>
                <CardDescription>
                  Manage and organize your demo sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredSessions.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    {isDemoMode ? (
                      <>
                        <Play className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p className="mb-2">No demos in your library yet!</p>
                        <p className="text-sm">Create your first demo to see it here.</p>
                      </>
                    ) : (
                      <>
                        <Play className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p className="mb-2">Your demo library is empty</p>
                        <p className="text-sm">Start creating demos to build your library.</p>
                      </>
                    )}
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
                              <span>{session.views} views</span>
                              <span>{session.engagement}% engagement</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={`${getStatusColor(session.status)} border`}>
                            {session.status.replace('-', ' ')}
                          </Badge>
                          <Button variant="outline" size="sm">
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

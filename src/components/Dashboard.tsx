
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, 
  Settings as SettingsIcon, 
  LogOut, 
  Plus,
  Calendar,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Mic,
  Volume2,
  Globe,
  User
} from "lucide-react";
import Settings from "@/components/Settings";

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isStartingDemo, setIsStartingDemo] = useState(false);

  const recentSessions = [
    {
      id: 1,
      title: "Product Tour - Landing Page",
      date: "2024-01-15",
      duration: "5:32",
      status: "completed",
      transcript: "Available"
    },
    {
      id: 2,
      title: "Feature Demo - Dashboard",
      date: "2024-01-14",
      duration: "3:45",
      status: "completed",
      transcript: "Available"
    },
    {
      id: 3,
      title: "Onboarding Walkthrough",
      date: "2024-01-13",
      duration: "2:18",
      status: "in-progress",
      transcript: "Processing"
    },
    {
      id: 4,
      title: "API Integration Demo",
      date: "2024-01-12",
      duration: "7:21",
      status: "completed",
      transcript: "Available"
    }
  ];

  const handleStartDemo = () => {
    setIsStartingDemo(true);
    // Simulate demo start process
    setTimeout(() => {
      setIsStartingDemo(false);
      // Here you would typically navigate to the demo interface
      alert("Demo session started! Voice commands are now active.");
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "in-progress":
        return <Clock className="w-4 h-4 text-blue-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-orange-100 text-orange-800 border-orange-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Mic className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">DemoAI</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>Welcome back, User!</span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={onLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Start Demo Section */}
            <Card className="border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Play className="w-6 h-6 mr-2" />
                  Ready to Create a Demo?
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Start a new AI-powered demo session with voice navigation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100"
                  onClick={handleStartDemo}
                  disabled={isStartingDemo}
                >
                  {isStartingDemo ? (
                    <>
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2" />
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

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
                  <Play className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Duration</CardTitle>
                  <Clock className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4:32</div>
                  <p className="text-xs text-muted-foreground">-8% from last month</p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                  <CheckCircle className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87%</div>
                  <p className="text-xs text-muted-foreground">+5% from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Sessions */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Recent Demo Sessions
                </CardTitle>
                <CardDescription>
                  Your latest demo sessions and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(session.status)}
                        <div>
                          <h4 className="font-semibold text-gray-900">{session.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {session.date}
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {session.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={`${getStatusColor(session.status)} border`}>
                          {session.status.replace('-', ' ')}
                        </Badge>
                        <Button variant="outline" size="sm" className="flex items-center space-x-1">
                          <FileText className="w-3 h-3" />
                          <span>Transcript</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
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

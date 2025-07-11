
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Mic, 
  Volume2, 
  Globe, 
  Zap,
  Save,
  User,
  Bell,
  Shield,
  Palette
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    voice: {
      enabled: true,
      language: "en-US",
      sensitivity: [7],
      voiceType: "female",
      speed: [1]
    },
    integrations: {
      webhook: "",
      slack: false,
      zapier: false,
      analytics: true
    },
    preferences: {
      theme: "light",
      notifications: true,
      autoSave: true,
      emailUpdates: false
    }
  });

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your voice preferences and integrations</p>
      </div>

      <Tabs defaultValue="voice" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="voice" className="flex items-center space-x-2">
            <Mic className="w-4 h-4" />
            <span>Voice</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center space-x-2">
            <Zap className="w-4 h-4" />
            <span>Integrations</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>Preferences</span>
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>Account</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="voice" className="space-y-6">
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mic className="w-5 h-5 mr-2" />
                Voice Settings
              </CardTitle>
              <CardDescription>
                Configure voice recognition and command preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="voice-enabled">Enable Voice Commands</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow voice navigation during demo sessions
                  </p>
                </div>
                <Switch
                  id="voice-enabled"
                  checked={settings.voice.enabled}
                  onCheckedChange={(value) => updateSetting('voice', 'enabled', value)}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select 
                  value={settings.voice.language} 
                  onValueChange={(value) => updateSetting('voice', 'language', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en-US">English (US)</SelectItem>
                    <SelectItem value="en-GB">English (UK)</SelectItem>
                    <SelectItem value="es-ES">Spanish</SelectItem>
                    <SelectItem value="fr-FR">French</SelectItem>
                    <SelectItem value="de-DE">German</SelectItem>
                    <SelectItem value="zh-CN">Chinese (Simplified)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="voice-type">Voice Type</Label>
                <Select 
                  value={settings.voice.voiceType} 
                  onValueChange={(value) => updateSetting('voice', 'voiceType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select voice type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Voice Sensitivity: {settings.voice.sensitivity[0]}/10</Label>
                  <Slider
                    value={settings.voice.sensitivity}
                    onValueChange={(value) => updateSetting('voice', 'sensitivity', value)}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground">
                    Higher values make voice recognition more sensitive
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Speech Speed: {settings.voice.speed[0]}x</Label>
                  <Slider
                    value={settings.voice.speed}
                    onValueChange={(value) => updateSetting('voice', 'speed', value)}
                    max={2}
                    min={0.5}
                    step={0.1}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground">
                    Adjust the speed of AI voice responses
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Integrations
              </CardTitle>
              <CardDescription>
                Connect DemoAI with your favorite tools
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="webhook">Webhook URL</Label>
                <Input
                  id="webhook"
                  placeholder="https://your-app.com/webhook"
                  value={settings.integrations.webhook}
                  onChange={(e) => updateSetting('integrations', 'webhook', e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Receive demo completion notifications via webhook
                </p>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="slack">Slack Integration</Label>
                    <p className="text-sm text-muted-foreground">
                      Send demo summaries to Slack channels
                    </p>
                  </div>
                  <Switch
                    id="slack"
                    checked={settings.integrations.slack}
                    onCheckedChange={(value) => updateSetting('integrations', 'slack', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="zapier">Zapier Integration</Label>
                    <p className="text-sm text-muted-foreground">
                      Trigger automated workflows with Zapier
                    </p>
                  </div>
                  <Switch
                    id="zapier"
                    checked={settings.integrations.zapier}
                    onCheckedChange={(value) => updateSetting('integrations', 'zapier', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="analytics">Advanced Analytics</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable detailed session analytics and insights
                    </p>
                  </div>
                  <Switch
                    id="analytics"
                    checked={settings.integrations.analytics}
                    onCheckedChange={(value) => updateSetting('integrations', 'analytics', value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                General Preferences
              </CardTitle>
              <CardDescription>
                Customize your DemoAI experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select 
                  value={settings.preferences.theme} 
                  onValueChange={(value) => updateSetting('preferences', 'theme', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about demo status updates
                    </p>
                  </div>
                  <Switch
                    id="notifications"
                    checked={settings.preferences.notifications}
                    onCheckedChange={(value) => updateSetting('preferences', 'notifications', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-save">Auto-save Sessions</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically save demo sessions in progress
                    </p>
                  </div>
                  <Switch
                    id="auto-save"
                    checked={settings.preferences.autoSave}
                    onCheckedChange={(value) => updateSetting('preferences', 'autoSave', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-updates">Email Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive product updates and tips via email
                    </p>
                  </div>
                  <Switch
                    id="email-updates"
                    checked={settings.preferences.emailUpdates}
                    onCheckedChange={(value) => updateSetting('preferences', 'emailUpdates', value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Account Security
              </CardTitle>
              <CardDescription>
                Manage your account security and data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  placeholder="Enter current password"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Enter new password"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm new password"
                />
              </div>

              <Button variant="outline" className="w-full">
                Update Password
              </Button>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Data Management</h4>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    Download My Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default Settings;

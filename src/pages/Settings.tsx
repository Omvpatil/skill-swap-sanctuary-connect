
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, EyeOff, Lock, User, Palette, Trash2, LogOut } from "lucide-react";

const Settings = () => {
  return (
    <MainLayout>
      <div className="space-y-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold">Settings</h1>
        
        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-skill-purple" />
              Account Settings
            </CardTitle>
            <CardDescription>
              Manage your personal information and account details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b">
              <div>
                <div className="font-medium">Campus Email</div>
                <div className="text-sm text-muted-foreground">student@campus.edu</div>
              </div>
              <Button variant="outline" size="sm">Change</Button>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b">
              <div>
                <div className="font-medium">Campus ID</div>
                <div className="text-sm text-muted-foreground">#42069</div>
              </div>
              <Badge>Verified</Badge>
            </div>
            
            <div className="flex justify-between items-center py-3">
              <div>
                <div className="font-medium">Password</div>
                <div className="text-sm text-muted-foreground">Last changed 30 days ago</div>
              </div>
              <Button variant="outline" size="sm">Reset</Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-skill-purple" />
              Privacy & Anonymity
            </CardTitle>
            <CardDescription>
              Control how your information is shared with others
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b">
              <div>
                <div className="font-medium">Default Profile Visibility</div>
                <div className="text-sm text-muted-foreground">Who can see your profile details</div>
              </div>
              <div className="flex items-center gap-2">
                <EyeOff className="h-4 w-4 text-muted-foreground" />
                <span>Anonymous</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b">
              <div>
                <div className="font-medium">Skill Visibility</div>
                <div className="text-sm text-muted-foreground">How your skills appear to others</div>
              </div>
              <Button variant="outline" size="sm">Customize</Button>
            </div>
            
            <div className="flex justify-between items-center py-3">
              <div>
                <div className="font-medium">Profile Reveal Requests</div>
                <div className="text-sm text-muted-foreground">How to handle identity reveal requests</div>
              </div>
              <Button variant="outline" size="sm">Manage</Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-skill-purple" />
              Notifications
            </CardTitle>
            <CardDescription>
              Manage when and how we contact you
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <div className="font-medium mb-2">New Messages</div>
                <div className="grid grid-cols-2 gap-2">
                  <Button size="sm" className="w-full" variant="outline">Email</Button>
                  <Button size="sm" className="w-full">In-App</Button>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="font-medium mb-2">Skill Requests</div>
                <div className="grid grid-cols-2 gap-2">
                  <Button size="sm" className="w-full" variant="outline">Email</Button>
                  <Button size="sm" className="w-full">In-App</Button>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="font-medium mb-2">Calendar Events</div>
                <div className="grid grid-cols-2 gap-2">
                  <Button size="sm" className="w-full">Email</Button>
                  <Button size="sm" className="w-full">In-App</Button>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="font-medium mb-2">Community Activity</div>
                <div className="grid grid-cols-2 gap-2">
                  <Button size="sm" className="w-full" variant="outline">Email</Button>
                  <Button size="sm" className="w-full">In-App</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-skill-purple" />
              Appearance
            </CardTitle>
            <CardDescription>
              Customize how Skill Swap Sanctuary looks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto flex flex-col p-4 justify-center items-center rounded-lg">
                <div className="h-20 w-full bg-background border rounded-md mb-2"></div>
                <span>Light</span>
              </Button>
              
              <Button variant="outline" className="h-auto flex flex-col p-4 justify-center items-center rounded-lg">
                <div className="h-20 w-full bg-slate-800 border border-slate-700 rounded-md mb-2"></div>
                <span>Dark</span>
              </Button>
              
              <Button className="h-auto flex flex-col p-4 justify-center items-center rounded-lg">
                <div className="h-20 w-full bg-gradient-to-b from-background to-slate-800 border rounded-md mb-2"></div>
                <span>System</span>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Danger Zone */}
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <Trash2 className="h-5 w-5" />
              Danger Zone
            </CardTitle>
            <CardDescription>
              Irreversible and destructive actions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">Delete Account</div>
                <div className="text-sm text-muted-foreground">
                  Permanently delete your account and all data
                </div>
              </div>
              <Button variant="destructive">Delete Account</Button>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t">
              <div>
                <div className="font-medium">Sign Out Everywhere</div>
                <div className="text-sm text-muted-foreground">
                  Sign out from all devices
                </div>
              </div>
              <Button variant="outline">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Settings;

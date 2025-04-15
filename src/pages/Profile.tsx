
import { MainLayout } from "@/components/layout/MainLayout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SkillCard } from "@/components/skills/SkillCard";
import { Book, GraduationCap, Eye, EyeOff, Trophy, User, Settings } from "lucide-react";

const userSkills = [
  {
    id: "1",
    title: "Python Programming",
    category: "Computer Science",
    description: "Advanced Python programming including data structures, algorithms, and web frameworks like Django and Flask.",
    userInitials: "AS",
    isTeaching: true,
  },
  {
    id: "2",
    title: "Guitar Playing",
    category: "Music",
    description: "Intermediate acoustic guitar skills, specializing in folk and indie styles. Can teach basic to intermediate techniques.",
    userInitials: "AS",
    isTeaching: true,
  },
  {
    id: "3",
    title: "Spanish Language",
    category: "Languages",
    description: "Beginner Spanish. Looking to improve conversation skills and grammar.",
    userInitials: "AS",
    isTeaching: false,
  },
  {
    id: "4",
    title: "Public Speaking",
    category: "Communication",
    description: "Want to improve my presentation skills and overcome stage fright. Looking for someone experienced in public speaking.",
    userInitials: "AS",
    isTeaching: false,
  },
];

const Profile = () => {
  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Card */}
          <Card className="md:w-1/3">
            <CardHeader className="pb-2 text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24 avatar-anonymous">
                  <AvatarFallback className="text-2xl">AS</AvatarFallback>
                </Avatar>
              </div>
              <CardTitle>Anonymous Student</CardTitle>
              <div className="text-sm text-muted-foreground">Campus ID: #42069</div>
              
              <div className="flex justify-center mt-4 gap-2">
                <Badge className="px-3 py-1">Computer Science</Badge>
                <Badge className="px-3 py-1">Junior Year</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full flex gap-2 justify-center">
                <User className="h-4 w-4" />
                Edit Profile
              </Button>
              
              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Profile Visibility</h3>
                <div className="flex justify-between">
                  <div className="flex gap-2 items-center">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Visible to Contacts</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Anonymous to Others</span>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Achievements</h3>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="flex flex-col items-center">
                    <Trophy className="h-5 w-5 text-amber-600" />
                    <span className="text-sm font-medium">3</span>
                    <span className="text-xs text-muted-foreground">Bronze</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Trophy className="h-5 w-5 text-gray-400" />
                    <span className="text-sm font-medium">1</span>
                    <span className="text-xs text-muted-foreground">Silver</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Trophy className="h-5 w-5 text-yellow-400" />
                    <span className="text-sm font-medium">0</span>
                    <span className="text-xs text-muted-foreground">Gold</span>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <Button variant="link" className="w-full flex gap-2 justify-center p-0">
                  <Settings className="h-4 w-4" />
                  Account Settings
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Skills and Stats */}
          <div className="md:w-2/3 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 flex flex-col items-center">
                  <GraduationCap className="h-8 w-8 text-skill-purple mb-2" />
                  <div className="text-2xl font-bold">2</div>
                  <div className="text-sm text-muted-foreground">Skills Teaching</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex flex-col items-center">
                  <Book className="h-8 w-8 text-skill-blue mb-2" />
                  <div className="text-2xl font-bold">2</div>
                  <div className="text-sm text-muted-foreground">Skills Learning</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex flex-col items-center">
                  <Trophy className="h-8 w-8 text-amber-600 mb-2" />
                  <div className="text-2xl font-bold">450</div>
                  <div className="text-sm text-muted-foreground">Points Earned</div>
                </CardContent>
              </Card>
            </div>
            
            {/* Skills I'm Teaching */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Skills I'm Teaching</h2>
                <Button size="sm">
                  Add Teaching Skill
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {userSkills
                  .filter(skill => skill.isTeaching)
                  .map(skill => (
                    <SkillCard key={skill.id} skill={skill} />
                  ))
                }
              </div>
            </div>
            
            {/* Skills I'm Learning */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Skills I'm Learning</h2>
                <Button size="sm">
                  Add Learning Skill
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {userSkills
                  .filter(skill => !skill.isTeaching)
                  .map(skill => (
                    <SkillCard key={skill.id} skill={skill} />
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;

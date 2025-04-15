
import { MainLayout } from "@/components/layout/MainLayout";
import { AchievementCard } from "@/components/gamification/AchievementCard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Award, Star, Medal } from "lucide-react";

const achievements = [
  {
    id: "1",
    title: "First Connection",
    description: "Connect with your first skill partner",
    points: 50,
    level: "bronze" as const,
    completed: true,
    progressValue: 1,
    progressMax: 1,
  },
  {
    id: "2",
    title: "Teaching Basics",
    description: "Complete your first teaching session",
    points: 100,
    level: "bronze" as const,
    completed: true,
    progressValue: 1,
    progressMax: 1,
  },
  {
    id: "3",
    title: "Learning Journey",
    description: "Complete your first learning session",
    points: 100,
    level: "bronze" as const,
    completed: true,
    progressValue: 1,
    progressMax: 1,
  },
  {
    id: "4",
    title: "Mentor Status",
    description: "Teach 5 different students",
    points: 200,
    level: "silver" as const,
    completed: false,
    progressValue: 3,
    progressMax: 5,
  },
  {
    id: "5",
    title: "Growth Mindset",
    description: "Learn 5 different skills",
    points: 200,
    level: "silver" as const,
    completed: false,
    progressValue: 2,
    progressMax: 5,
  },
  {
    id: "6",
    title: "Community Pillar",
    description: "Create 10 community board posts",
    points: 300,
    level: "gold" as const,
    completed: false,
    progressValue: 1,
    progressMax: 10,
  },
  {
    id: "7",
    title: "Skill Master",
    description: "Receive 10 five-star ratings as a teacher",
    points: 500,
    level: "platinum" as const,
    completed: false,
    progressValue: 3,
    progressMax: 10,
  }
];

const Achievements = () => {
  // Calculate total points
  const earnedPoints = achievements
    .filter(a => a.completed)
    .reduce((sum, a) => sum + a.points, 0);
  
  // Calculate partially earned points
  const partialPoints = achievements
    .filter(a => !a.completed && a.progressValue > 0)
    .reduce((sum, a) => sum + Math.floor((a.progressValue / a.progressMax) * a.points), 0);
  
  const totalPoints = earnedPoints + partialPoints;
  
  // Calculate completion percentage
  const totalAchievements = achievements.length;
  const completedAchievements = achievements.filter(a => a.completed).length;
  const completionPercentage = Math.round((completedAchievements / totalAchievements) * 100);
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Your Achievements</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="h-5 w-5 text-skill-purple" />
                Total Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalPoints}</div>
              <p className="text-sm text-muted-foreground">
                {earnedPoints} earned + {partialPoints} in progress
              </p>
              
              <div className="mt-4 h-2 w-full bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-skill-purple"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {completedAchievements} of {totalAchievements} achievements ({completionPercentage}%)
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Medal className="h-5 w-5 text-skill-purple" />
                Level Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-amber-600" />
                    <span>Bronze</span>
                  </div>
                  <Badge variant="outline">
                    {achievements.filter(a => a.level === "bronze" && a.completed).length}/
                    {achievements.filter(a => a.level === "bronze").length} Complete
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-gray-400" />
                    <span>Silver</span>
                  </div>
                  <Badge variant="outline">
                    {achievements.filter(a => a.level === "silver" && a.completed).length}/
                    {achievements.filter(a => a.level === "silver").length} Complete
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-yellow-400" />
                    <span>Gold</span>
                  </div>
                  <Badge variant="outline">
                    {achievements.filter(a => a.level === "gold" && a.completed).length}/
                    {achievements.filter(a => a.level === "gold").length} Complete
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-skill-purple" />
                    <span>Platinum</span>
                  </div>
                  <Badge variant="outline">
                    {achievements.filter(a => a.level === "platinum" && a.completed).length}/
                    {achievements.filter(a => a.level === "platinum").length} Complete
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Star className="h-5 w-5 text-skill-purple" />
                Next Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {achievements
                  .filter(a => !a.completed)
                  .sort((a, b) => (b.progressValue / b.progressMax) - (a.progressValue / a.progressMax))
                  .slice(0, 3)
                  .map(achievement => (
                    <div key={achievement.id} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{achievement.title}</span>
                      <div className="text-sm text-muted-foreground">
                        {achievement.progressValue}/{achievement.progressMax}
                      </div>
                    </div>
                  ))
                }
              </div>
            </CardContent>
          </Card>
        </div>
        
        <h2 className="text-2xl font-bold mt-8">All Achievements</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map(achievement => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Achievements;

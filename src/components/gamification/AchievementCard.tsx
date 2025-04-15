
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Award, Star } from "lucide-react";

interface AchievementCardProps {
  achievement: {
    id: string;
    title: string;
    description: string;
    points: number;
    level: "bronze" | "silver" | "gold" | "platinum";
    completed: boolean;
    progressValue: number;
    progressMax: number;
  }
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  const levelColors = {
    bronze: "bg-amber-600",
    silver: "bg-gray-400",
    gold: "bg-yellow-400",
    platinum: "bg-gradient-to-r from-indigo-500 to-purple-500"
  };
  
  const levelIcons = {
    bronze: <Award className="h-5 w-5" />,
    silver: <Star className="h-5 w-5" />,
    gold: <Trophy className="h-5 w-5" />,
    platinum: <Trophy className="h-5 w-5" />
  };
  
  return (
    <Card className={`overflow-hidden ${achievement.completed ? "border-skill-purple border-2" : ""}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg flex items-center gap-2">
            {achievement.title}
            {achievement.completed && <Trophy className="h-4 w-4 text-skill-purple" />}
          </CardTitle>
          <Badge className={`${levelColors[achievement.level]} text-white`}>
            <div className="flex items-center gap-1">
              {levelIcons[achievement.level]}
              <span>{achievement.level.charAt(0).toUpperCase() + achievement.level.slice(1)}</span>
            </div>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{achievement.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">
            Progress: {achievement.progressValue}/{achievement.progressMax}
          </div>
          <Badge variant="outline">{achievement.points} Points</Badge>
        </div>
        
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
          <div 
            className={`h-full ${achievement.completed ? "bg-skill-purple" : "bg-skill-blue"}`}
            style={{ width: `${(achievement.progressValue / achievement.progressMax) * 100}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

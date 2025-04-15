
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
    bronze: "bg-mono-medium-gray",
    silver: "bg-mono-light-gray border border-mono-medium-gray",
    gold: "bg-mono-black",
    platinum: "bg-mono-black border border-mono-medium-gray"
  };
  
  const levelIcons = {
    bronze: <Award className="h-5 w-5" />,
    silver: <Star className="h-5 w-5" />,
    gold: <Trophy className="h-5 w-5" />,
    platinum: <Trophy className="h-5 w-5" />
  };
  
  return (
    <Card className={`overflow-hidden ${achievement.completed ? "border-mono-black border-2 dark:border-mono-white" : ""}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg flex items-center gap-2">
            {achievement.title}
            {achievement.completed && <Trophy className="h-4 w-4 text-mono-black dark:text-mono-white" />}
          </CardTitle>
          <Badge className={`${levelColors[achievement.level]} ${achievement.level === "silver" ? "text-mono-black" : "text-mono-white"}`}>
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
        
        <div className="h-2 w-full bg-mono-light-gray rounded-full overflow-hidden dark:bg-mono-medium-gray">
          <div 
            className={`h-full ${achievement.completed ? "bg-mono-black dark:bg-mono-white" : "bg-mono-dark-gray"}`}
            style={{ width: `${(achievement.progressValue / achievement.progressMax) * 100}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

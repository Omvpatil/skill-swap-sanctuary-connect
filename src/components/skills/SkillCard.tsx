
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Calendar } from "lucide-react";

interface SkillCardProps {
  skill: {
    id: string;
    title: string;
    category: string;
    description: string;
    userInitials: string;
    isTeaching: boolean;
  }
}

export function SkillCard({ skill }: SkillCardProps) {
  return (
    <Card className="skill-card overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{skill.title}</CardTitle>
          <Badge variant={skill.isTeaching ? "skill" : "achievement"}>
            {skill.isTeaching ? "Teaching" : "Learning"}
          </Badge>
        </div>
        <Badge variant="outline" className="w-fit mt-1">{skill.category}</Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{skill.description}</p>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 avatar-anonymous">
            <AvatarFallback>{skill.userInitials}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">Anonymous User</span>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="android-ripple">
            <Calendar className="h-4 w-4 mr-1" />
            Schedule
          </Button>
          <Button size="sm" className="android-ripple">
            <MessageSquare className="h-4 w-4 mr-1" />
            Connect
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

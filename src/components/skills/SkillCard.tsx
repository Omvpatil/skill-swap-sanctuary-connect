
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Calendar } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  
  return (
    <Card className="skill-card overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className={`${isMobile ? 'text-lg' : 'text-xl'}`}>{skill.title}</CardTitle>
          <Badge variant={skill.isTeaching ? "skill" : "achievement"} size={isMobile ? "lg" : "default"}>
            {skill.isTeaching ? "Teaching" : "Learning"}
          </Badge>
        </div>
        <Badge variant="outline" className="w-fit mt-1" size={isMobile ? "default" : "sm"}>{skill.category}</Badge>
      </CardHeader>
      <CardContent>
        <p className={`${isMobile ? 'text-base' : 'text-sm'} text-muted-foreground`}>{skill.description}</p>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <div className="flex items-center gap-2">
          <Avatar className={`${isMobile ? 'h-10 w-10' : 'h-8 w-8'} avatar-anonymous`}>
            <AvatarFallback>{skill.userInitials}</AvatarFallback>
          </Avatar>
          <span className={`${isMobile ? 'text-base' : 'text-sm'} font-medium`}>Anonymous User</span>
        </div>
        <div className="flex gap-2">
          <Button size={isMobile ? "default" : "sm"} variant="outline" className="android-ripple touch-target">
            <Calendar className={`${isMobile ? 'h-5 w-5' : 'h-4 w-4'} mr-1`} />
            Schedule
          </Button>
          <Button size={isMobile ? "default" : "sm"} className="android-ripple touch-target">
            <MessageSquare className={`${isMobile ? 'h-5 w-5' : 'h-4 w-4'} mr-1`} />
            Connect
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

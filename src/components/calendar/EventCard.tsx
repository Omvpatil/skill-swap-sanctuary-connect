
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CalendarClock, MapPin, MessageSquare } from "lucide-react";

interface EventCardProps {
  event: {
    id: string;
    title: string;
    datetime: string;
    location: string;
    description: string;
    category: string;
    participantInitials: string;
    isAnonymous: boolean;
  }
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{event.title}</CardTitle>
          <Badge>{event.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center text-sm gap-2">
          <CalendarClock className="h-4 w-4 text-muted-foreground" />
          <span>{event.datetime}</span>
        </div>
        
        <div className="flex items-center text-sm gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{event.location}</span>
        </div>
        
        <p className="text-sm text-muted-foreground mt-2">{event.description}</p>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <div className="flex items-center gap-2">
          <Avatar className={event.isAnonymous ? "avatar-anonymous" : "bg-muted"}>
            <AvatarFallback>{event.participantInitials}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">
            {event.isAnonymous ? "Anonymous User" : "Campus User"}
          </span>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <CalendarClock className="h-4 w-4 mr-1" />
            Add to Calendar
          </Button>
          <Button size="sm">
            <MessageSquare className="h-4 w-4 mr-1" />
            Contact
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

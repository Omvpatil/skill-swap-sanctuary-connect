
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, MessageSquare, User } from "lucide-react";
import { useState } from "react";

interface CommunityPostProps {
  post: {
    id: string;
    title: string;
    content: string;
    authorInitials: string;
    category: string;
    likes: number;
    comments: number;
    anonymous: boolean;
  }
}

export function CommunityPost({ post }: CommunityPostProps) {
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(false);
  
  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };
  
  return (
    <Card className="overflow-hidden mono-card card-hover">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar className={post.anonymous ? "avatar-anonymous" : "bg-mono-light-gray dark:bg-mono-medium-gray"}>
              <AvatarFallback>{post.authorInitials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-medium">{post.anonymous ? "Anonymous User" : "Campus User"}</span>
                {post.anonymous && (
                  <Badge variant="outline" className="text-[10px] h-5">Anonymous</Badge>
                )}
              </div>
              <CardTitle className="text-base mt-1">{post.title}</CardTitle>
            </div>
          </div>
          <Badge variant="outline">{post.category}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{post.content}</p>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <div className="flex gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLike}
            className={`android-ripple ${liked ? "text-mono-black dark:text-mono-white" : ""}`}
          >
            <Heart className="h-4 w-4 mr-1" fill={liked ? "currentColor" : "none"} />
            {likes}
          </Button>
          <Button variant="ghost" size="sm" className="android-ripple">
            <MessageSquare className="h-4 w-4 mr-1" />
            {post.comments}
          </Button>
        </div>
        {post.anonymous && (
          <Button variant="outline" size="sm" className="android-ripple">
            <User className="h-4 w-4 mr-1" />
            Request Profile
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

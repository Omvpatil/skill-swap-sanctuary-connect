
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MainLayout } from "@/components/layout/MainLayout";
import { SkillCard } from "@/components/skills/SkillCard";
import { CommunityPost } from "@/components/community/CommunityPost";
import { GraduationCap, MessageSquare, Calendar, Users, Trophy, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const featuredSkills = [
  {
    id: "1",
    title: "Python Programming",
    category: "Computer Science",
    description: "Learn the basics of Python programming including data types, loops, and functions. Perfect for beginners in coding.",
    userInitials: "JP",
    isTeaching: true,
  },
  {
    id: "2",
    title: "Public Speaking",
    category: "Communication",
    description: "Want to improve my presentation skills and overcome stage fright. Looking for someone experienced in public speaking.",
    userInitials: "ML",
    isTeaching: false,
  },
];

const recentCommunityPosts = [
  {
    id: "1",
    title: "Looking for a study group for Calculus II",
    content: "Hi everyone! I'm struggling with Calculus II and looking for a study group to join. Anyone else finding derivatives and integrals challenging? Let's connect!",
    authorInitials: "KL",
    category: "Mathematics",
    likes: 12,
    comments: 5,
    anonymous: true,
  }
];

const Index = () => {
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold gradient-heading">Skill Swap Sanctuary</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect, learn, and grow with your campus community through anonymous skill-sharing.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Button asChild size="lg">
              <Link to="/skills">Explore Skills</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/profile">Share Your Skills</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-6">
            <Card className="text-center p-4">
              <GraduationCap className="h-8 w-8 mx-auto text-skill-purple" />
              <h3 className="font-medium mt-2">Learn New Skills</h3>
            </Card>
            <Card className="text-center p-4">
              <MessageSquare className="h-8 w-8 mx-auto text-skill-purple" />
              <h3 className="font-medium mt-2">Anonymous Chat</h3>
            </Card>
            <Card className="text-center p-4">
              <Trophy className="h-8 w-8 mx-auto text-skill-purple" />
              <h3 className="font-medium mt-2">Earn Achievements</h3>
            </Card>
            <Card className="text-center p-4">
              <Calendar className="h-8 w-8 mx-auto text-skill-purple" />
              <h3 className="font-medium mt-2">Schedule Sessions</h3>
            </Card>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-skill-purple" />
                Featured Skills
              </CardTitle>
              <CardDescription>
                Discover trending skills on campus
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <Badge>Programming</Badge>
                <Badge>Graphic Design</Badge>
                <Badge>Languages</Badge>
                <Badge>Music</Badge>
                <Badge>Math</Badge>
                <Badge>Photography</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/skills">Browse All Skills</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="h-5 w-5 text-skill-purple" />
                Your Achievements
              </CardTitle>
              <CardDescription>
                Skill-sharing milestones earned
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-lg font-bold">3</div>
                  <div className="text-sm text-muted-foreground">Skills Taught</div>
                </div>
                <div>
                  <div className="text-lg font-bold">2</div>
                  <div className="text-sm text-muted-foreground">Skills Learned</div>
                </div>
                <div>
                  <div className="text-lg font-bold">450</div>
                  <div className="text-sm text-muted-foreground">Points Earned</div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/achievements">View All Achievements</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-skill-purple" />
                Upcoming Sessions
              </CardTitle>
              <CardDescription>
                Your scheduled skill-sharing sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <p className="text-muted-foreground">No upcoming sessions</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/calendar">Schedule a Session</Link>
              </Button>
            </CardFooter>
          </Card>
        </section>
        
        {/* Featured Skills Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Featured Skills</h2>
            <Button asChild variant="outline">
              <Link to="/skills">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredSkills.map(skill => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </section>
        
        {/* Community Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Community Board</h2>
            <Button asChild variant="outline">
              <Link to="/community">View All</Link>
            </Button>
          </div>
          <div className="space-y-4">
            {recentCommunityPosts.map(post => (
              <CommunityPost key={post.id} post={post} />
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Index;

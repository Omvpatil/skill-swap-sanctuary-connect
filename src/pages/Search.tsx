
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { SkillCard } from "@/components/skills/SkillCard";
import { CommunityPost } from "@/components/community/CommunityPost";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search as SearchIcon, BarChart, GraduationCap, Users, Calendar } from "lucide-react";

// Sample data
const searchResults = {
  skills: [
    {
      id: "1",
      title: "Python Programming",
      category: "Computer Science",
      description: "Learn the basics of Python programming including data types, loops, and functions.",
      userInitials: "JP",
      isTeaching: true,
    },
    {
      id: "2",
      title: "Public Speaking",
      category: "Communication",
      description: "Want to improve my presentation skills and overcome stage fright.",
      userInitials: "ML",
      isTeaching: false,
    },
  ],
  posts: [
    {
      id: "1",
      title: "Looking for a study group for Python",
      content: "I'm starting to learn Python and would love to connect with others who are on the same journey.",
      authorInitials: "KL",
      category: "Computer Science",
      likes: 8,
      comments: 3,
      anonymous: true,
    },
  ],
  users: [
    {
      id: "1",
      name: "Anonymous User",
      initials: "AU",
      skills: ["Python", "Web Development"],
      isAnonymous: true,
    },
    {
      id: "2",
      name: "Campus User",
      initials: "CU",
      skills: ["Public Speaking", "Leadership"],
      isAnonymous: false,
    },
  ],
  events: [
    {
      id: "1",
      title: "Python Workshop",
      description: "Beginner-friendly Python workshop covering the basics",
      date: "May 20, 2:00 PM",
      category: "Computer Science",
    },
  ],
};

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "skills" | "posts" | "users" | "events">("all");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger an API call
    console.log("Searching for:", searchQuery);
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Search</h1>
        
        <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <input
              type="text"
              placeholder="Search skills, posts, or users..."
              className="w-full pl-12 pr-4 py-3 bg-muted rounded-full text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full"
              size="sm"
            >
              Search
            </Button>
          </div>
        </form>
        
        <div className="flex overflow-x-auto pb-2">
          <Button
            variant={activeTab === "all" ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setActiveTab("all")}
          >
            <BarChart className="h-4 w-4 mr-2" />
            All Results
          </Button>
          <Button
            variant={activeTab === "skills" ? "default" : "outline"}
            className="rounded-full ml-2"
            onClick={() => setActiveTab("skills")}
          >
            <GraduationCap className="h-4 w-4 mr-2" />
            Skills
          </Button>
          <Button
            variant={activeTab === "posts" ? "default" : "outline"}
            className="rounded-full ml-2"
            onClick={() => setActiveTab("posts")}
          >
            <Users className="h-4 w-4 mr-2" />
            Community
          </Button>
          <Button
            variant={activeTab === "users" ? "default" : "outline"}
            className="rounded-full ml-2"
            onClick={() => setActiveTab("users")}
          >
            <Users className="h-4 w-4 mr-2" />
            Users
          </Button>
          <Button
            variant={activeTab === "events" ? "default" : "outline"}
            className="rounded-full ml-2"
            onClick={() => setActiveTab("events")}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Events
          </Button>
        </div>
        
        {/* Skills Section */}
        {(activeTab === "all" || activeTab === "skills") && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Skills
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {searchResults.skills.map(skill => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          </div>
        )}
        
        {/* Community Posts Section */}
        {(activeTab === "all" || activeTab === "posts") && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Users className="h-5 w-5" />
              Community Posts
            </h2>
            
            <div className="space-y-4">
              {searchResults.posts.map(post => (
                <CommunityPost key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}
        
        {/* Users Section */}
        {(activeTab === "all" || activeTab === "users") && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Users className="h-5 w-5" />
              Users
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {searchResults.users.map(user => (
                <div key={user.id} className="border rounded-lg p-4 flex items-center gap-4">
                  <Avatar className={user.isAnonymous ? "avatar-anonymous" : "bg-muted"}>
                    <AvatarFallback>{user.initials}</AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {user.name}
                      {user.isAnonymous && (
                        <Badge variant="outline" className="text-[10px]">Anonymous</Badge>
                      )}
                    </div>
                    
                    <div className="flex gap-2 mt-1">
                      {user.skills.map((skill, i) => (
                        <Badge key={i} variant="outline">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="ml-auto" size="sm">
                    View Profile
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Events Section */}
        {(activeTab === "all" || activeTab === "events") && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Events
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {searchResults.events.map(event => (
                <div key={event.id} className="border rounded-lg p-4">
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                  <div className="flex justify-between items-center mt-3">
                    <Badge>{event.category}</Badge>
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <Button className="w-full mt-3" size="sm">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Search;

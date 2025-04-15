
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CommunityPost } from "@/components/community/CommunityPost";
import { Plus, Search } from "lucide-react";

const posts = [
  {
    id: "1",
    title: "Looking for a study group for Calculus II",
    content: "Hi everyone! I'm struggling with Calculus II and looking for a study group to join. Anyone else finding derivatives and integrals challenging? Let's connect!",
    authorInitials: "KL",
    category: "Mathematics",
    likes: 12,
    comments: 5,
    anonymous: true,
  },
  {
    id: "2",
    title: "Guitar jam session this weekend",
    content: "I'm organizing a casual guitar jam session this Saturday at the student center, 2-4pm. All skill levels welcome! Bring your acoustic or electric guitar and let's have some fun!",
    authorInitials: "RJ",
    category: "Music",
    likes: 24,
    comments: 8,
    anonymous: false,
  },
  {
    id: "3",
    title: "Need feedback on my UI design portfolio",
    content: "I've recently created a UI design portfolio for internship applications but I'm not confident about it. Would anyone with design experience be willing to give me some feedback? Anonymous feedback is fine too!",
    authorInitials: "TD",
    category: "Design",
    likes: 7,
    comments: 3,
    anonymous: true,
  },
  {
    id: "4",
    title: "Python project collaborators wanted",
    content: "I'm starting a Python project to build a campus event recommendation system. Looking for 2-3 people interested in working together. Beginners welcome as long as you're eager to learn!",
    authorInitials: "JP",
    category: "Computer Science",
    likes: 18,
    comments: 10,
    anonymous: false,
  },
  {
    id: "5",
    title: "Language exchange - Spanish/English",
    content: "Native Spanish speaker looking for language exchange partners. I can help with Spanish and would like to improve my English conversation skills. We can meet weekly at the library or any campus cafe.",
    authorInitials: "MC",
    category: "Languages",
    likes: 9,
    comments: 4,
    anonymous: false,
  }
];

const categories = [
  "All Topics",
  "Computer Science",
  "Mathematics",
  "Design",
  "Languages",
  "Music",
  "Communication",
  "Study Groups",
  "Projects",
];

const Community = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Topics");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"recent" | "popular">("recent");
  
  const filteredPosts = posts.filter(post => {
    const categoryMatch = selectedCategory === "All Topics" || post.category === selectedCategory;
    const searchMatch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && searchMatch;
  }).sort((a, b) => {
    if (filter === "popular") {
      return b.likes - a.likes;
    }
    // For "recent", we'd normally sort by date, but in this mock we'll use the id as a proxy for recency
    return parseInt(b.id) - parseInt(a.id);
  });
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Community Board</h1>
          <Button>
            <Plus className="mr-1 h-4 w-4" />
            New Post
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between gap-4">
          {/* Search */}
          <div className="relative md:w-1/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search posts..."
              className="w-full pl-10 pr-4 py-2 bg-muted rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Filters */}
          <div className="flex gap-2">
            <Button 
              variant={filter === "recent" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("recent")}
            >
              Recent
            </Button>
            <Button 
              variant={filter === "popular" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("popular")}
            >
              Popular
            </Button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(category => (
            <Badge 
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
        
        <div className="space-y-6">
          {filteredPosts.map(post => (
            <CommunityPost key={post.id} post={post} />
          ))}
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-12 border rounded-lg">
              <p className="text-muted-foreground">No posts found matching your criteria</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setSelectedCategory("All Topics");
                  setSearchQuery("");
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Community;

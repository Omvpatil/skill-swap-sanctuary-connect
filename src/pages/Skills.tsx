
import { MainLayout } from "@/components/layout/MainLayout";
import { SkillCard } from "@/components/skills/SkillCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const allSkills = [
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
  {
    id: "3",
    title: "Guitar Lessons",
    category: "Music",
    description: "Offering beginner to intermediate guitar lessons. Can teach acoustic or electric, focusing on rock, pop, or folk styles.",
    userInitials: "RJ",
    isTeaching: true,
  },
  {
    id: "4",
    title: "Calculus Tutoring",
    category: "Mathematics",
    description: "Need help with Calculus I and II. Struggling with limits, derivatives, and integrals. Looking for patient tutors.",
    userInitials: "TS",
    isTeaching: false,
  },
  {
    id: "5",
    title: "Adobe Photoshop",
    category: "Design",
    description: "Can teach photo editing, manipulation, and graphic design using Adobe Photoshop. 4+ years of experience.",
    userInitials: "AK",
    isTeaching: true,
  },
  {
    id: "6",
    title: "French Language",
    category: "Languages",
    description: "Looking for a French conversation partner. I'm at intermediate level and want to practice speaking.",
    userInitials: "EL",
    isTeaching: false,
  },
];

const categories = [
  "All Categories",
  "Computer Science",
  "Communication",
  "Music",
  "Mathematics",
  "Design",
  "Languages",
];

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [viewMode, setViewMode] = useState<"all" | "teaching" | "learning">("all");
  
  const filteredSkills = allSkills.filter(skill => {
    // Filter by category
    const categoryMatch = selectedCategory === "All Categories" || skill.category === selectedCategory;
    
    // Filter by teaching/learning mode
    const viewModeMatch = 
      viewMode === "all" || 
      (viewMode === "teaching" && skill.isTeaching) || 
      (viewMode === "learning" && !skill.isTeaching);
    
    return categoryMatch && viewModeMatch;
  });
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Skill Marketplace</h1>
          <Button>Add New Skill</Button>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between gap-4">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
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
          
          {/* View Mode Toggle */}
          <div className="flex gap-2">
            <Button 
              variant={viewMode === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("all")}
            >
              All Skills
            </Button>
            <Button 
              variant={viewMode === "teaching" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("teaching")}
            >
              Teaching
            </Button>
            <Button 
              variant={viewMode === "learning" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("learning")}
            >
              Learning
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map(skill => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
          
          {filteredSkills.length === 0 && (
            <div className="col-span-3 text-center py-12">
              <p className="text-muted-foreground">No skills found matching your criteria</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setSelectedCategory("All Categories");
                  setViewMode("all");
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

export default Skills;

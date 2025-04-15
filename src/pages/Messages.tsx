
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ChatInterface } from "@/components/messaging/ChatInterface";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, Plus, MessageSquare, ArrowLeft } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

const conversations = [
  {
    id: "1",
    contactName: "Python Teacher",
    contactInitials: "PT",
    lastMessage: "When would you like to schedule our first session?",
    timestamp: "10:42 AM",
    unread: true,
    isAnonymous: true,
    messages: [
      {
        id: "m1",
        content: "Hi there! I saw you're interested in learning Python.",
        sender: "other" as const,
        timestamp: "10:30 AM"
      },
      {
        id: "m2",
        content: "Yes, I'm a complete beginner but excited to learn!",
        sender: "user" as const,
        timestamp: "10:35 AM"
      },
      {
        id: "m3",
        content: "That's great! I can help you get started. We can cover the basics like variables, loops, and functions first.",
        sender: "other" as const,
        timestamp: "10:40 AM"
      },
      {
        id: "m4",
        content: "When would you like to schedule our first session?",
        sender: "other" as const,
        timestamp: "10:42 AM"
      }
    ]
  },
  {
    id: "2",
    contactName: "Public Speaking Mentor",
    contactInitials: "PS",
    lastMessage: "I have some great exercises to help with your stage fright",
    timestamp: "Yesterday",
    unread: false,
    isAnonymous: true,
    messages: [
      {
        id: "m1",
        content: "Hello! I noticed you're looking for help with public speaking.",
        sender: "other" as const,
        timestamp: "Yesterday, 4:30 PM"
      },
      {
        id: "m2",
        content: "Yes, I get really nervous when presenting in front of groups.",
        sender: "user" as const,
        timestamp: "Yesterday, 4:45 PM"
      },
      {
        id: "m3",
        content: "I have some great exercises to help with your stage fright",
        sender: "other" as const,
        timestamp: "Yesterday, 5:00 PM"
      }
    ]
  },
  {
    id: "3",
    contactName: "Guitar Student",
    contactInitials: "GS",
    lastMessage: "Thanks for the lesson yesterday! I've been practicing the chords you showed me.",
    timestamp: "2 days ago",
    unread: false,
    isAnonymous: false,
    messages: [
      {
        id: "m1",
        content: "I'm interested in your guitar lessons. Do you have time this week?",
        sender: "other" as const,
        timestamp: "3 days ago, 1:15 PM"
      },
      {
        id: "m2",
        content: "Sure! How about Wednesday at 4pm in the student center?",
        sender: "user" as const,
        timestamp: "3 days ago, 2:30 PM"
      },
      {
        id: "m3",
        content: "That works perfectly for me!",
        sender: "other" as const,
        timestamp: "3 days ago, 2:45 PM"
      },
      {
        id: "m4",
        content: "Thanks for the lesson yesterday! I've been practicing the chords you showed me.",
        sender: "other" as const,
        timestamp: "2 days ago, 10:20 AM"
      }
    ]
  }
];

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showConversationList, setShowConversationList] = useState(true);
  const isAndroid = useMediaQuery("(max-width: 768px)");
  
  const filteredConversations = conversations.filter(conversation => 
    conversation.contactName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleConversationSelect = (conversation: typeof conversations[0]) => {
    setSelectedConversation(conversation);
    if (isAndroid) {
      setShowConversationList(false);
    }
  };
  
  const handleBackToList = () => {
    setShowConversationList(true);
  };
  
  if (isAndroid) {
    // Android-specific layout (one view at a time)
    return (
      <MainLayout>
        {showConversationList ? (
          // Conversation List View for Android
          <div className="flex flex-col h-[calc(100vh-8rem)]">
            <div className="p-4 border-b bg-white shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h1 className="text-lg font-semibold">Messages</h1>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="android-ripple rounded-full"
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-full text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="overflow-y-auto flex-1 bg-gray-50">
              {filteredConversations.map(conversation => (
                <div 
                  key={conversation.id}
                  className="border-b p-4 active:bg-gray-100 cursor-pointer android-ripple"
                  onClick={() => handleConversationSelect(conversation)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className={conversation.isAnonymous ? "avatar-anonymous" : "bg-muted"}>
                      <AvatarFallback>{conversation.contactInitials}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <span className="font-medium truncate">
                          {conversation.contactName}
                          {conversation.isAnonymous && (
                            <Badge variant="outline" className="ml-2 text-[10px]">Anonymous</Badge>
                          )}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {conversation.timestamp}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.lastMessage}
                        </p>
                        {conversation.unread && (
                          <Badge className="h-2 w-2 rounded-full p-0 bg-black" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredConversations.length === 0 && (
                <div className="text-center p-8 text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>No conversations found</p>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t bg-white shadow-lg">
              <Button className="w-full rounded-full android-ripple">
                <Plus className="h-4 w-4 mr-2" /> 
                Start New Conversation
              </Button>
            </div>
          </div>
        ) : (
          // Chat Interface View for Android
          <div className="h-[calc(100vh-8rem)] flex flex-col">
            <div className="bg-card shadow-sm flex items-center p-2 mb-1">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleBackToList}
                className="mr-2 android-ripple"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex-1">
                {selectedConversation && (
                  <ChatInterface 
                    contactName={selectedConversation.contactName}
                    contactInitials={selectedConversation.contactInitials}
                    isAnonymous={selectedConversation.isAnonymous}
                    messages={selectedConversation.messages}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </MainLayout>
    );
  }
  
  // Desktop layout (side-by-side)
  return (
    <MainLayout>
      <div className="flex h-[calc(100vh-8rem)]">
        {/* Conversation List */}
        <div className="w-1/3 border-r h-full flex flex-col bg-white">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center mb-3">
              <h1 className="text-lg font-semibold">Messages</h1>
              <Button 
                variant="outline" 
                size="sm"
                className="android-ripple"
              >
                <Plus className="h-4 w-4 mr-1" /> 
                New
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 bg-muted rounded-md text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="overflow-y-auto flex-1">
            {filteredConversations.map(conversation => (
              <div 
                key={conversation.id}
                className={`border-b p-3 cursor-pointer hover:bg-muted/50 ${
                  selectedConversation.id === conversation.id ? "bg-muted" : ""
                }`}
                onClick={() => setSelectedConversation(conversation)}
              >
                <div className="flex items-center gap-3">
                  <Avatar className={conversation.isAnonymous ? "avatar-anonymous" : "bg-muted"}>
                    <AvatarFallback>{conversation.contactInitials}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <span className="font-medium truncate">
                        {conversation.contactName}
                        {conversation.isAnonymous && (
                          <Badge variant="outline" className="ml-2 text-[10px]">Anonymous</Badge>
                        )}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {conversation.timestamp}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.lastMessage}
                      </p>
                      {conversation.unread && (
                        <Badge className="h-2 w-2 rounded-full p-0 bg-black" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredConversations.length === 0 && (
              <div className="text-center p-4 text-muted-foreground">
                No conversations found
              </div>
            )}
          </div>
          
          <div className="p-4 border-t">
            <Button className="w-full">Start New Conversation</Button>
          </div>
        </div>
        
        {/* Chat Interface */}
        <div className="w-2/3">
          {selectedConversation ? (
            <ChatInterface 
              contactName={selectedConversation.contactName}
              contactInitials={selectedConversation.contactInitials}
              isAnonymous={selectedConversation.isAnonymous}
              messages={selectedConversation.messages}
            />
          ) : (
            <div className="h-full flex items-center justify-center">
              <Card className="p-6 text-center max-w-md">
                <h3 className="text-lg font-medium">No conversation selected</h3>
                <p className="text-muted-foreground mt-2">
                  Select a conversation from the list or start a new one.
                </p>
              </Card>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Messages;

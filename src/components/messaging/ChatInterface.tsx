
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare, Send, User } from "lucide-react";
import { useState } from "react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "other";
  timestamp: string;
}

interface ChatInterfaceProps {
  contactName: string;
  contactInitials: string;
  isAnonymous: boolean;
  messages: Message[];
}

export function ChatInterface({ contactName, contactInitials, isAnonymous, messages: initialMessages }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    
    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, message]);
    setNewMessage("");
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <div className="bg-card border-b p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Avatar className={isAnonymous ? "avatar-anonymous" : "bg-muted"}>
            <AvatarFallback>{contactInitials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{contactName}</div>
            <div className="text-xs text-muted-foreground">
              {isAnonymous ? "Anonymous User" : "Profile Revealed"}
            </div>
          </div>
        </div>
        
        {isAnonymous && (
          <Button variant="outline" size="sm">
            <User className="h-4 w-4 mr-1" />
            Request Profile
          </Button>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.sender === "user" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted"
              }`}
            >
              <p>{message.content}</p>
              <span className="text-xs opacity-70 block text-right mt-1">
                {message.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t p-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-muted rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
          />
          <Button onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

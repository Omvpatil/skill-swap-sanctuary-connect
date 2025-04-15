
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileUp, MessageSquare, Send, User, Smile, Paperclip, Mic, Image } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { toast } from "@/components/ui/sonner";

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
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isAndroid = useMediaQuery("(max-width: 768px)");
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Add Android-specific touch feedback
  useEffect(() => {
    if (isAndroid) {
      const buttons = document.querySelectorAll("button");
      buttons.forEach(button => {
        button.classList.add("android-ripple", "android-tap-highlight");
      });
    }
  }, [isAndroid]);
  
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
    
    // Show typing indicator
    setIsTyping(true);
    
    // Focus input after sending
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    
    // Simulate reply after 1-2 seconds for demo purposes
    setTimeout(() => {
      setIsTyping(false);
      
      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Thanks for your message! I'll get back to you soon about "${newMessage.substring(0, 20)}${newMessage.length > 20 ? '...' : ''}"`,
        sender: "other",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prevMessages => [...prevMessages, replyMessage]);
    }, Math.random() * 1000 + 1500);
  };
  
  const handleAttachment = () => {
    toast.info("Attachment feature coming soon!");
  };
  
  const handleProfileRequest = () => {
    toast.success("Profile request sent!", {
      description: "They'll need to approve before their profile is revealed.",
      action: {
        label: "Dismiss",
        onClick: () => {}
      }
    });
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <div className="bg-card border-b p-4 flex justify-between items-center shadow-sm">
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
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleProfileRequest}
            className="android-ripple"
          >
            <User className="h-4 w-4 mr-1" />
            Request Profile
          </Button>
        )}
      </div>
      
      <div 
        ref={messageContainerRef} 
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
      >
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.sender === "other" && (
              <Avatar className="h-8 w-8 mr-2 mt-1">
                <AvatarFallback className={isAnonymous ? "avatar-anonymous" : "bg-muted"}>
                  {contactInitials}
                </AvatarFallback>
              </Avatar>
            )}
            <div 
              className={isAndroid 
                ? (message.sender === "user" ? "android-message-sent" : "android-message-received") 
                : `max-w-[80%] rounded-lg px-4 py-2 ${
                    message.sender === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted"
                  }`
              }
            >
              <p>{message.content}</p>
              <span className="text-xs opacity-70 block text-right mt-1">
                {message.timestamp}
              </span>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <Avatar className="h-8 w-8 mr-2 mt-1">
              <AvatarFallback className={isAnonymous ? "avatar-anonymous" : "bg-muted"}>
                {contactInitials}
              </AvatarFallback>
            </Avatar>
            <div className="bg-muted rounded-lg px-4 py-3 flex items-center space-x-1">
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75"></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className={`border-t p-3 bg-white ${isAndroid ? "shadow-lg" : ""}`}>
        <div className="flex gap-2 items-center">
          {isAndroid && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => toast.info("Emoji picker coming soon!")}
              className="android-ripple"
            >
              <Smile className="h-5 w-5 text-muted-foreground" />
            </Button>
          )}
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleAttachment}
            className="android-ripple"
          >
            <Paperclip className="h-5 w-5 text-muted-foreground" />
          </Button>
          
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className={`flex-1 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring ${
              isAndroid ? "bg-gray-100 android-message-input" : "bg-muted"
            }`}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
          />
          
          {newMessage.trim() === "" && isAndroid ? (
            <Button 
              variant="ghost"
              size="icon" 
              className="android-ripple"
              onClick={() => toast.info("Voice recording coming soon!")}
            >
              <Mic className="h-5 w-5 text-muted-foreground" />
            </Button>
          ) : (
            <Button 
              onClick={handleSendMessage} 
              className="android-ripple"
              size={isAndroid ? "icon" : undefined}
            >
              <Send className="h-5 w-5" />
              {!isAndroid && "Send"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

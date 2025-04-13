import React, { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { useUniverse } from "@/contexts/UniverseContext";
import { useToast } from "@/components/ui/use-toast";
import GradientText from "@/components/ui/GradientText";
import GlowingCard from "@/components/ui/GlowingCard";
import GradientButton from "@/components/ui/GradientButton";
import SectionTitle from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Dialog,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MessageSquare, UserPlus, Check, X, Mail, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

const Friends = () => {
  const { 
    friends, 
    addFriend, 
    updateFriendStatus, 
    setSelectedChat,
    currentUser 
  } = useUniverse();
  
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [friendEmail, setFriendEmail] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [chats, setChats] = useState<any[]>([]);
  
  const pendingFriends = friends.filter(friend => friend.status === "pending");
  const acceptedFriends = friends.filter(friend => friend.status === "accepted");
  
  const filteredFriends = acceptedFriends.filter(friend => 
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const activeChat = activeChatId 
    ? chats.find(chat => chat.participants && chat.participants.includes(activeChatId))
    : null;
  
  const handleSendFriendRequest = async () => {
    if (!friendEmail.trim()) return;
    
    // Check if Supabase is configured before trying to use it
    if (isSupabaseConfigured()) {
      try {
        // Here you would add the actual Supabase call to send a friend request
        // For now, we'll just use the mock function
        console.log("Sending friend request via Supabase to:", friendEmail);
      } catch (error) {
        console.error("Error sending friend request:", error);
      }
    }
    
    addFriend({
      name: `New Friend (${friendEmail})`,
      status: "pending",
      profilePicture: undefined
    });
    
    toast({
      title: "Friend request sent",
      description: `A request has been sent to ${friendEmail}`,
    });
    
    setFriendEmail("");
  };
  
  const handleAcceptFriendRequest = (id: string) => {
    updateFriendStatus(id, "accepted");
    
    toast({
      title: "Friend request accepted",
      description: "You are now friends!",
    });
  };
  
  const handleDeclineFriendRequest = (id: string) => {
    updateFriendStatus(id, "declined");
    
    toast({
      title: "Friend request declined",
      description: "The friend request has been declined",
    });
  };
  
  const handleMessage = (friendId: string) => {
    setActiveChatId(friendId);
    
    // Open chat dialog
    const chatDialogElement = document.getElementById("chat-dialog-trigger");
    if (chatDialogElement) {
      (chatDialogElement as HTMLButtonElement).click();
    }
  };
  
  const handleSendMessage = async () => {
    if (!chatMessage.trim() || !activeChatId) return;
    
    // Find the chat or create a new one
    let chatId = chats.find(chat => 
      chat.participants && 
      chat.participants.includes(currentUser.id) && 
      chat.participants.includes(activeChatId)
    )?.id;
    
    if (!chatId) {
      // This would normally create a new chat in the database
      chatId = "new-chat-" + Date.now();
      
      // Add new chat to local state
      setChats(prevChats => [...prevChats, {
        id: chatId,
        participants: [currentUser.id, activeChatId],
        messages: []
      }]);
    }
    
    // Add the message to local state
    setChats(prevChats => 
      prevChats.map(chat => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: [...(chat.messages || []), {
              chatId,
              senderId: currentUser.id,
              content: chatMessage,
              timestamp: new Date()
            }]
          };
        }
        return chat;
      })
    );
    
    // Clear the input
    setChatMessage("");
    
    // Show success message
    toast({
      title: "Message sent",
      description: "Your message has been sent successfully",
    });
  };
  
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <GradientText gradient="blue-purple" element="h1" className="text-3xl md:text-4xl font-bold mb-2">
          Friends
        </GradientText>
        <p className="text-gray-400">Connect with classmates and study partners</p>
      </header>
      
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Find friends..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-universe-dark border-universe-card focus:border-universe-neonPurple w-full"
            />
          </div>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <GradientButton gradient="purple" className="flex items-center whitespace-nowrap">
              <UserPlus className="w-4 h-4 mr-1" />
              Add Friend
            </GradientButton>
          </DialogTrigger>
          <DialogContent className="bg-universe-card border-universe-neonPurple">
            <DialogHeader>
              <DialogTitle>Send Friend Request</DialogTitle>
              <DialogDescription>
                Enter your friend's email to send them a request
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Input
                  placeholder="friend@university.edu"
                  value={friendEmail}
                  onChange={(e) => setFriendEmail(e.target.value)}
                  className="bg-universe-dark border-universe-card"
                />
              </div>
            </div>
            
            <DialogFooter>
              <GradientButton
                gradient="purple"
                onClick={handleSendFriendRequest}
                disabled={!friendEmail.trim()}
              >
                Send Request
              </GradientButton>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6 bg-universe-card">
          <TabsTrigger value="all" className="data-[state=active]:bg-universe-neonPurple data-[state=active]:text-white">
            All Friends
          </TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-universe-neonPurple data-[state=active]:text-white">
            Pending
            {pendingFriends.length > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {pendingFriends.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          <SectionTitle 
            title="Your Friends" 
            gradient="purple" 
            description="Stay connected with your network"
          />
          
          {filteredFriends.length === 0 ? (
            <div className="text-center py-12">
              <UserPlus className="mx-auto h-12 w-12 text-gray-500 mb-4" />
              {searchTerm ? (
                <p className="text-gray-400">No friends found matching "{searchTerm}"</p>
              ) : (
                <>
                  <h3 className="text-xl font-semibold mb-2">No friends yet</h3>
                  <p className="text-gray-400">
                    Add friends to connect and collaborate
                  </p>
                </>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFriends.map((friend) => (
                <motion.div
                  key={friend.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <GlowingCard gradient="purple" className="hover:shadow-neon-purple">
                    <div className="p-4">
                      <div className="flex items-center">
                        <Avatar className="w-12 h-12 mr-4">
                          <AvatarImage src={friend.profilePicture} alt={friend.name} />
                          <AvatarFallback className="bg-universe-neonPurple text-white">
                            {friend.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{friend.name}</h4>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex space-x-2">
                        <GradientButton
                          gradient="blue"
                          size="sm"
                          className="flex-1 flex items-center justify-center"
                          onClick={() => handleMessage(friend.id)}
                        >
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Message
                        </GradientButton>
                      </div>
                    </div>
                  </GlowingCard>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="pending" className="space-y-6">
          <SectionTitle 
            title="Friend Requests" 
            gradient="purple" 
            description="Manage pending friend requests"
          />
          
          {pendingFriends.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="mx-auto h-12 w-12 text-gray-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No pending requests</h3>
              <p className="text-gray-400">
                You don't have any pending friend requests
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingFriends.map((friend) => (
                <motion.div
                  key={friend.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <GlowingCard gradient="purple" className="hover:shadow-neon-purple">
                    <div className="p-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <Avatar className="w-12 h-12 mr-4">
                          <AvatarImage src={friend.profilePicture} alt={friend.name} />
                          <AvatarFallback className="bg-universe-neonPurple text-white">
                            {friend.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{friend.name}</h4>
                          <p className="text-sm text-gray-400">Wants to connect with you</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeclineFriendRequest(friend.id)}
                          className="rounded-full h-10 w-10 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                        >
                          <X className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleAcceptFriendRequest(friend.id)}
                          className="rounded-full h-10 w-10 border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                        >
                          <Check className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </GlowingCard>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Chat Dialog */}
      <Dialog>
        <DialogTrigger id="chat-dialog-trigger" className="hidden" />
        <DialogContent className="bg-universe-card border-universe-neonBlue max-w-md w-full">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Avatar className="w-8 h-8 mr-2">
                <AvatarFallback className="bg-universe-neonPurple text-white">
                  {activeChatId ? friends.find(f => f.id === activeChatId)?.name.charAt(0) : "?"}
                </AvatarFallback>
              </Avatar>
              <span>
                {activeChatId ? 
                  friends.find(f => f.id === activeChatId)?.name || "Chat" 
                  : "New Chat"
                }
              </span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="h-[300px] overflow-y-auto border border-universe-card rounded-md mb-4 p-4 bg-universe-dark">
            {activeChat?.messages?.length ? (
              <div className="space-y-3">
                {activeChat.messages.map((message, index) => (
                  <div 
                    key={index}
                    className={cn(
                      "max-w-[80%] rounded-lg p-3",
                      message.senderId === currentUser.id
                        ? "bg-universe-neonPurple bg-opacity-20 ml-auto"
                        : "bg-universe-card"
                    )}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-right text-xs text-gray-400">
                      {format(message.timestamp, "h:mm a")}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                <p>No messages yet. Start the conversation!</p>
              </div>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Input
              placeholder="Type a message..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              className="flex-1 bg-universe-dark border-universe-card"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!chatMessage.trim()}
              className="bg-universe-neonBlue hover:bg-universe-neonBlue/80"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Friends;

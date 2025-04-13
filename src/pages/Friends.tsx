
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useUniverse } from "@/contexts/UniverseContext";
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
import { Search, MessageSquare, UserPlus, Check, X, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const Friends = () => {
  const { 
    friends, 
    addFriend, 
    updateFriendStatus, 
    setSelectedChat, 
    currentUser 
  } = useUniverse();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [friendEmail, setFriendEmail] = useState("");
  
  const pendingFriends = friends.filter(friend => friend.status === "pending");
  const acceptedFriends = friends.filter(friend => friend.status === "accepted");
  
  const filteredFriends = acceptedFriends.filter(friend => 
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSendFriendRequest = () => {
    if (!friendEmail.trim()) return;
    
    addFriend({
      name: `New Friend (${friendEmail})`,
      status: "pending",
      profilePicture: undefined
    });
    
    setFriendEmail("");
  };
  
  const handleAcceptFriendRequest = (id: string) => {
    updateFriendStatus(id, "accepted");
  };
  
  const handleDeclineFriendRequest = (id: string) => {
    updateFriendStatus(id, "declined");
  };
  
  const handleMessage = (friendId: string) => {
    setSelectedChat(friendId);
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
    </div>
  );
};

export default Friends;

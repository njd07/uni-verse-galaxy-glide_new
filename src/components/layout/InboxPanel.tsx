
import React, { useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { X, Send, Clock } from "lucide-react";
import { useUniverse } from "@/contexts/UniverseContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface InboxPanelProps {
  onClose: () => void;
}

const InboxPanel: React.FC<InboxPanelProps> = ({ onClose }) => {
  const { 
    messages, 
    friends, 
    addMessage, 
    markMessageAsRead, 
    selectedChat, 
    setSelectedChat,
    currentUser
  } = useUniverse();
  
  const [newMessage, setNewMessage] = useState("");
  
  const panelVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };
  
  const acceptedFriends = friends.filter(friend => friend.status === "accepted");
  
  // Get all unique conversation partners
  const conversations = acceptedFriends.map(friend => {
    const conversationMessages = messages.filter(
      msg => (msg.senderId === friend.id && msg.receiverId === currentUser.id) || 
             (msg.senderId === currentUser.id && msg.receiverId === friend.id)
    ).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    
    const unreadCount = messages.filter(
      msg => msg.senderId === friend.id && msg.receiverId === currentUser.id && !msg.isRead
    ).length;
    
    const lastMessage = conversationMessages[0];
    
    return {
      friendId: friend.id,
      friendName: friend.name,
      profilePicture: friend.profilePicture,
      lastMessage: lastMessage || null,
      unreadCount
    };
  });
  
  const selectedConversation = selectedChat 
    ? conversations.find(conv => conv.friendId === selectedChat) 
    : null;
  
  const conversationMessages = selectedChat 
    ? messages.filter(
        msg => (msg.senderId === selectedChat && msg.receiverId === currentUser.id) || 
               (msg.senderId === currentUser.id && msg.receiverId === selectedChat)
      ).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
    : [];
  
  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      addMessage({
        senderId: currentUser.id,
        receiverId: selectedChat,
        content: newMessage,
        timestamp: new Date(),
        isRead: false
      });
      setNewMessage("");
    }
  };
  
  const handleSelectChat = (friendId: string) => {
    setSelectedChat(friendId);
    // Mark all messages from this friend as read
    messages
      .filter(msg => msg.senderId === friendId && !msg.isRead)
      .forEach(msg => markMessageAsRead(msg.id));
  };
  
  return (
    <motion.div
      variants={panelVariants}
      initial="closed"
      animate="open"
      exit="closed"
      className="fixed top-14 right-0 h-[calc(100vh-3.5rem)] w-80 z-40 bg-universe-dark border-l border-universe-card shadow-lg overflow-hidden flex flex-col"
    >
      <div className="p-4 border-b border-universe-card flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Inbox</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-gray-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      {!selectedChat ? (
        <div className="overflow-y-auto flex-1">
          {conversations.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p>No conversations</p>
            </div>
          ) : (
            <div className="space-y-2 p-4">
              {conversations.map((conversation) => (
                <motion.div
                  key={conversation.friendId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={cn(
                    "p-3 rounded-lg bg-universe-card hover:shadow-neon transition-all duration-300 cursor-pointer",
                    conversation.unreadCount > 0 ? "gradient-border" : ""
                  )}
                  onClick={() => handleSelectChat(conversation.friendId)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-universe-card overflow-hidden">
                        {conversation.profilePicture ? (
                          <img
                            src={conversation.profilePicture}
                            alt={conversation.friendName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-universe-neonPurple flex items-center justify-center text-white font-bold">
                            {conversation.friendName.charAt(0)}
                          </div>
                        )}
                      </div>
                      {conversation.unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-semibold">{conversation.friendName}</h4>
                        {conversation.lastMessage && (
                          <span className="text-xs text-gray-400 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {format(conversation.lastMessage.timestamp, "h:mm a")}
                          </span>
                        )}
                      </div>
                      {conversation.lastMessage ? (
                        <p className="text-sm text-gray-300 truncate">
                          {conversation.lastMessage.senderId === currentUser.id ? "You: " : ""}
                          {conversation.lastMessage.content}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-400">No messages yet</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="p-3 border-b border-universe-card flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedChat(null)}
              className="text-gray-400 hover:text-white h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <h3 className="font-semibold">{selectedConversation?.friendName}</h3>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {conversationMessages.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p>No messages yet</p>
                <p className="text-sm">Start a conversation!</p>
              </div>
            ) : (
              conversationMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "max-w-[75%] rounded-lg p-3",
                    msg.senderId === currentUser.id
                      ? "ml-auto bg-universe-neonBlue bg-opacity-20 text-white"
                      : "bg-universe-card text-white"
                  )}
                >
                  <p className="text-sm">{msg.content}</p>
                  <div className="text-right">
                    <span className="text-xs text-gray-400">
                      {format(msg.timestamp, "h:mm a")}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="p-3 border-t border-universe-card">
            <div className="flex space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-universe-card border-universe-card focus:border-universe-neonBlue"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="bg-universe-neonBlue hover:bg-blue-600"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default InboxPanel;

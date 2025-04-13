
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  CalendarDays, 
  Heart, 
  MessageSquare, 
  Users, 
  Upload, 
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";

const StarConnect = () => {
  const { 
    communityPosts, 
    addCommunityPost, 
    likePost, 
    unlikePost, 
    addCommentToPost,
    currentUser
  } = useUniverse();
  
  const { toast } = useToast();
  const [newPost, setNewPost] = useState({
    title: "",
    category: "Art",
    content: "",
    image: ""
  });
  
  const [newComment, setNewComment] = useState("");
  const [commentingOn, setCommentingOn] = useState<string | null>(null);
  
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: new Date(),
    club: "",
    location: "",
    description: ""
  });
  
  const [events, setEvents] = useState([
    {
      id: "event1",
      title: "Tech Talk: AI and the Future",
      date: new Date(2025, 3, 15),
      club: "Tech Society",
      location: "Lecture Hall 3",
      description: "Join us for an exciting discussion on the future of AI with industry experts.",
      attendees: ["user2", "user3"],
    },
    {
      id: "event2",
      title: "Annual Cultural Festival",
      date: new Date(2025, 3, 20),
      club: "Cultural Committee",
      location: "Campus Grounds",
      description: "Three-day celebration featuring music, dance, and art performances.",
      attendees: ["user1", "user2", "user3", "user4"],
    },
    {
      id: "event3",
      title: "Coding Competition",
      date: new Date(2025, 3, 18),
      club: "Coding Club",
      location: "Computer Lab",
      description: "Test your coding skills and win exciting prizes!",
      attendees: ["user3"],
    }
  ]);
  
  const handleAddPost = () => {
    if (!newPost.title || !newPost.content) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    addCommunityPost({
      userId: currentUser.id,
      title: newPost.title,
      category: newPost.category,
      content: newPost.content,
      image: newPost.image || "https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?q=80&w=2670&auto=format&fit=crop"
    });
    
    toast({
      title: "Post created!",
      description: "Your post has been published successfully",
    });
    
    setNewPost({
      title: "",
      category: "Art",
      content: "",
      image: ""
    });
  };
  
  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.club || !newEvent.location) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const event = {
      id: `event${events.length + 1}`,
      title: newEvent.title,
      date: newEvent.date,
      club: newEvent.club,
      location: newEvent.location,
      description: newEvent.description,
      attendees: [currentUser.id]
    };
    
    setEvents([...events, event]);
    
    toast({
      title: "Event created!",
      description: "Your event has been added successfully",
    });
    
    setNewEvent({
      title: "",
      date: new Date(),
      club: "",
      location: "",
      description: ""
    });
  };
  
  const handleLikePost = (postId: string) => {
    const post = communityPosts.find(p => p.id === postId);
    if (!post) return;
    
    if (post.likes.includes(currentUser.id)) {
      unlikePost(postId, currentUser.id);
    } else {
      likePost(postId, currentUser.id);
    }
  };
  
  const handleAddComment = (postId: string) => {
    if (!newComment.trim()) return;
    
    addCommentToPost(postId, {
      userId: currentUser.id,
      content: newComment
    });
    
    setNewComment("");
    setCommentingOn(null);
  };
  
  const handleRSVP = (eventId: string) => {
    setEvents(prev => prev.map(event => {
      if (event.id === eventId) {
        const isAttending = event.attendees.includes(currentUser.id);
        return {
          ...event,
          attendees: isAttending
            ? event.attendees.filter(id => id !== currentUser.id)
            : [...event.attendees, currentUser.id]
        };
      }
      return event;
    }));
    
    const event = events.find(e => e.id === eventId);
    if (!event) return;
    
    const isAttending = event.attendees.includes(currentUser.id);
    toast({
      title: isAttending ? "RSVP removed" : "RSVP confirmed",
      description: isAttending ? `You're no longer attending ${event.title}` : `You're now attending ${event.title}`,
    });
  };
  
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <GradientText gradient="purple-pink" element="h1" className="text-3xl md:text-4xl font-bold mb-2">
          🎨 Orbit: StarConnect
        </GradientText>
        <p className="text-gray-400">Connect with campus life and events</p>
      </header>
      
      <Tabs defaultValue="events" className="w-full">
        <TabsList className="mb-6 bg-universe-card">
          <TabsTrigger value="events" className="data-[state=active]:bg-universe-neonPink data-[state=active]:text-white">
            Events
          </TabsTrigger>
          <TabsTrigger value="community" className="data-[state=active]:bg-universe-neonPink data-[state=active]:text-white">
            Community
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="events" className="space-y-6">
          <div className="flex justify-between items-center mb-6">
            <SectionTitle 
              title="Upcoming Events" 
              gradient="purple-pink" 
              description="Stay connected with campus events and activities"
            />
            
            <Dialog>
              <DialogTrigger asChild>
                <GradientButton gradient="purple-pink" className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Create Event
                </GradientButton>
              </DialogTrigger>
              <DialogContent className="bg-universe-card border-universe-neonPink">
                <DialogHeader>
                  <DialogTitle>Create New Event</DialogTitle>
                  <DialogDescription>
                    Share your event with the campus community
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="event-title">Event Title</Label>
                    <Input
                      id="event-title"
                      placeholder="Enter event title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      className="bg-universe-dark border-universe-card"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="event-date">Date</Label>
                      <Input
                        id="event-date"
                        type="date"
                        className="bg-universe-dark border-universe-card"
                        value={format(newEvent.date, "yyyy-MM-dd")}
                        onChange={(e) => {
                          const newDate = e.target.value ? new Date(e.target.value) : new Date();
                          setNewEvent({ ...newEvent, date: newDate });
                        }}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="event-time">Time</Label>
                      <Input
                        id="event-time"
                        type="time"
                        className="bg-universe-dark border-universe-card"
                        onChange={(e) => {
                          const [hours, minutes] = e.target.value.split(':').map(Number);
                          const newDate = new Date(newEvent.date);
                          newDate.setHours(hours, minutes);
                          setNewEvent({ ...newEvent, date: newDate });
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="event-club">Organizing Club/Group</Label>
                    <Input
                      id="event-club"
                      placeholder="Enter club or group name"
                      value={newEvent.club}
                      onChange={(e) => setNewEvent({ ...newEvent, club: e.target.value })}
                      className="bg-universe-dark border-universe-card"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="event-location">Location</Label>
                    <Input
                      id="event-location"
                      placeholder="Enter event location"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                      className="bg-universe-dark border-universe-card"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="event-description">Description</Label>
                    <Textarea
                      id="event-description"
                      placeholder="Enter event details"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      className="bg-universe-dark border-universe-card"
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <GradientButton 
                    gradient="purple-pink" 
                    onClick={handleAddEvent}
                    disabled={!newEvent.title || !newEvent.club || !newEvent.location}
                  >
                    Create Event
                  </GradientButton>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {events.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <GlowingCard gradient="purple-pink" className="hover:shadow-neon-pink">
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
                        <div className="flex items-center text-gray-400 text-sm mb-2">
                          <CalendarDays className="w-4 h-4 mr-1" />
                          <span>{format(event.date, "MMMM d, yyyy")}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="bg-universe-neonPurple bg-opacity-20 text-universe-neonPurple text-xs px-2 py-0.5 rounded-full">
                            {event.club}
                          </span>
                          <span className="bg-universe-neonPink bg-opacity-20 text-universe-neonPink text-xs px-2 py-0.5 rounded-full">
                            {event.location}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300">{event.description}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-400">{event.attendees.length} going</span>
                      </div>
                      <GradientButton
                        gradient={event.attendees.includes(currentUser.id) ? "purple" : "purple-pink"}
                        size="sm"
                        onClick={() => handleRSVP(event.id)}
                        className="animate-pulse"
                      >
                        {event.attendees.includes(currentUser.id) ? "Going" : "RSVP"}
                      </GradientButton>
                    </div>
                  </div>
                </GlowingCard>
              </motion.div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="community" className="space-y-6">
          <div className="flex justify-between items-center mb-6">
            <SectionTitle 
              title="Community Posts" 
              gradient="purple-pink" 
              description="Share and connect with fellow students"
            />
            
            <Dialog>
              <DialogTrigger asChild>
                <GradientButton gradient="purple-pink" className="flex items-center">
                  <Upload className="w-4 h-4 mr-1" />
                  New Post
                </GradientButton>
              </DialogTrigger>
              <DialogContent className="bg-universe-card border-universe-neonPink">
                <DialogHeader>
                  <DialogTitle>Create New Post</DialogTitle>
                  <DialogDescription>
                    Share your thoughts, art, or projects with the community
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="post-title">Title</Label>
                    <Input
                      id="post-title"
                      placeholder="Enter post title"
                      value={newPost.title}
                      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                      className="bg-universe-dark border-universe-card"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="post-category">Category</Label>
                    <Select 
                      value={newPost.category}
                      onValueChange={(value) => setNewPost({ ...newPost, category: value })}
                    >
                      <SelectTrigger className="bg-universe-dark border-universe-card">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-universe-card border-universe-card">
                        <SelectItem value="Art">Art</SelectItem>
                        <SelectItem value="Tech">Tech</SelectItem>
                        <SelectItem value="Music">Music</SelectItem>
                        <SelectItem value="Sports">Sports</SelectItem>
                        <SelectItem value="Academic">Academic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="post-content">Content</Label>
                    <Textarea
                      id="post-content"
                      placeholder="What's on your mind?"
                      value={newPost.content}
                      onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                      className="bg-universe-dark border-universe-card"
                    />
                  </div>
                  
                  <div className="bg-universe-dark border border-dashed border-universe-card rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-400">
                      Drop your image here or click to browse
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Supports JPG, PNG, GIF (Max 5MB)
                    </p>
                  </div>
                </div>
                
                <DialogFooter>
                  <GradientButton
                    gradient="purple-pink"
                    onClick={handleAddPost}
                    disabled={!newPost.title || !newPost.content}
                  >
                    Post
                  </GradientButton>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="space-y-6">
            {communityPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <GlowingCard gradient="purple-pink" className="overflow-hidden">
                  <div className="p-0">
                    {post.image && (
                      <div className="w-full h-48 md:h-64 overflow-hidden bg-universe-dark">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-universe-neonPurple bg-opacity-20 flex items-center justify-center mr-3">
                            <Users className="w-5 h-5 text-universe-neonPurple" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {post.userId === currentUser.id ? "You" : "User"}
                            </p>
                            <p className="text-xs text-gray-400">
                              {format(post.timestamp, "MMM d, yyyy")}
                            </p>
                          </div>
                        </div>
                        <span className="bg-universe-neonPink bg-opacity-20 text-universe-neonPink text-xs px-2 py-0.5 rounded-full">
                          {post.category}
                        </span>
                      </div>
                      
                      <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                      <p className="text-gray-300 mb-4">{post.content}</p>
                      
                      <div className="flex items-center justify-between border-t border-universe-card pt-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLikePost(post.id)}
                          className={cn(
                            "text-gray-400 hover:text-universe-neonPink hover:bg-transparent",
                            post.likes.includes(currentUser.id) && "text-universe-neonPink"
                          )}
                        >
                          <Heart className={cn(
                            "w-5 h-5 mr-1",
                            post.likes.includes(currentUser.id) && "fill-universe-neonPink"
                          )} />
                          <span>{post.likes.length}</span>
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => commentingOn === post.id 
                            ? setCommentingOn(null) 
                            : setCommentingOn(post.id)
                          }
                          className="text-gray-400 hover:text-universe-neonPurple hover:bg-transparent"
                        >
                          <MessageSquare className="w-5 h-5 mr-1" />
                          <span>{post.comments.length}</span>
                        </Button>
                      </div>
                      
                      {/* Comments Section */}
                      {commentingOn === post.id && (
                        <div className="mt-4 border-t border-universe-card pt-4">
                          {post.comments.length > 0 && (
                            <div className="mb-4 space-y-3">
                              {post.comments.map((comment) => (
                                <div key={comment.id} className="bg-universe-card bg-opacity-50 rounded-lg p-3">
                                  <div className="flex justify-between items-start">
                                    <p className="text-sm font-medium mb-1">
                                      {comment.userId === currentUser.id ? "You" : "User"}
                                    </p>
                                    <span className="text-xs text-gray-400">
                                      {format(comment.timestamp, "h:mm a")}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-300">{comment.content}</p>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          <div className="flex gap-2">
                            <Input
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              placeholder="Add a comment..."
                              className="flex-1 bg-universe-dark border-universe-card focus:border-universe-neonPurple"
                            />
                            <GradientButton
                              gradient="purple"
                              onClick={() => handleAddComment(post.id)}
                              disabled={!newComment.trim()}
                            >
                              Post
                            </GradientButton>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </GlowingCard>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StarConnect;


import React, { useState } from "react";
import { motion } from "framer-motion";
import { useUniverse } from "@/contexts/UniverseContext";
import GradientText from "@/components/ui/GradientText";
import GlowingCard from "@/components/ui/GlowingCard";
import GradientButton from "@/components/ui/GradientButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { User, Settings, Calendar, CheckSquare, GraduationCap, Book, Heart } from "lucide-react";

const Profile = () => {
  const { currentUser, updateUser, assignments, events } = useUniverse();
  
  const [editedUser, setEditedUser] = useState({
    name: currentUser.name,
    studentId: currentUser.studentId,
    email: currentUser.email
  });
  
  const completedAssignments = assignments.filter(a => a.completed).length;
  const pendingAssignments = assignments.filter(a => !a.completed).length;
  const upcomingEvents = events.filter(e => e.date > new Date()).length;
  
  const handleUpdateProfile = () => {
    updateUser({
      name: editedUser.name,
      studentId: editedUser.studentId,
      email: editedUser.email
    });
  };
  
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <GradientText gradient="blue-purple" element="h1" className="text-3xl md:text-4xl font-bold mb-2">
          Profile
        </GradientText>
        <p className="text-gray-400">Manage your personal information and see your activity</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <GlowingCard gradient="blue-purple" className="text-center p-6">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <Avatar className="w-24 h-24 border-2 border-universe-neonPurple">
                  <AvatarImage src={currentUser.profilePicture} alt={currentUser.name} />
                  <AvatarFallback className="bg-universe-neonPurple text-white text-xl">
                    {currentUser.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute -bottom-2 -right-2 rounded-full bg-universe-card hover:bg-universe-neonPurple h-8 w-8"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-universe-card border-universe-neonPurple">
                    <DialogHeader>
                      <DialogTitle>Update Profile Picture</DialogTitle>
                      <DialogDescription>
                        Upload a new profile picture
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="bg-universe-dark border border-dashed border-universe-card rounded-lg p-6 text-center">
                      <User className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-400">
                        Drop your image here or click to browse
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Supports JPG, PNG (Max 2MB)
                      </p>
                    </div>
                    
                    <DialogFooter>
                      <GradientButton gradient="purple">
                        Update Picture
                      </GradientButton>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              
              <h2 className="text-xl font-semibold">{currentUser.name}</h2>
              <p className="text-gray-400 mb-4">Student ID: {currentUser.studentId}</p>
              
              <Dialog>
                <DialogTrigger asChild>
                  <GradientButton gradient="blue-purple" className="w-full">
                    Edit Profile
                  </GradientButton>
                </DialogTrigger>
                <DialogContent className="bg-universe-card border-universe-neonPurple">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                      Update your personal information
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={editedUser.name}
                        onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                        className="bg-universe-dark border-universe-card"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="student-id">Student ID</Label>
                      <Input
                        id="student-id"
                        placeholder="Your student ID"
                        value={editedUser.studentId}
                        onChange={(e) => setEditedUser({ ...editedUser, studentId: e.target.value })}
                        className="bg-universe-dark border-universe-card"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Your email"
                        value={editedUser.email}
                        onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                        className="bg-universe-dark border-universe-card"
                      />
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <GradientButton
                      gradient="blue-purple"
                      onClick={handleUpdateProfile}
                    >
                      Save Changes
                    </GradientButton>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </GlowingCard>
          
          <GlowingCard gradient="blue" className="mt-6 p-6">
            <h3 className="font-semibold mb-4">Contact Information</h3>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p>{currentUser.email}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-400">Department</p>
                <p>Computer Science</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-400">Year</p>
                <p>2nd Year</p>
              </div>
            </div>
          </GlowingCard>
        </div>
        
        <div className="lg:col-span-2">
          <GlowingCard gradient="purple" className="mb-6 p-6">
            <h3 className="font-semibold mb-4 flex items-center">
              <GraduationCap className="mr-2 text-universe-neonPurple" />
              Academic Progress
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-universe-dark rounded-lg p-4 text-center"
              >
                <CheckSquare className="w-8 h-8 text-universe-neonBlue mx-auto mb-2" />
                <h4 className="text-lg font-semibold">{completedAssignments}</h4>
                <p className="text-sm text-gray-400">Assignments Completed</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="bg-universe-dark rounded-lg p-4 text-center"
              >
                <Calendar className="w-8 h-8 text-universe-neonPurple mx-auto mb-2" />
                <h4 className="text-lg font-semibold">{currentUser.eventsAttended}</h4>
                <p className="text-sm text-gray-400">Events Attended</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.2 }}
                className="bg-universe-dark rounded-lg p-4 text-center"
              >
                <Book className="w-8 h-8 text-universe-neonPink mx-auto mb-2" />
                <h4 className="text-lg font-semibold">3.8</h4>
                <p className="text-sm text-gray-400">GPA</p>
              </motion.div>
            </div>
          </GlowingCard>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlowingCard gradient="blue">
              <div className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <CheckSquare className="mr-2 text-universe-neonBlue" />
                  Pending Assignments
                </h3>
                
                {pendingAssignments === 0 ? (
                  <p className="text-gray-400 text-center py-4">No pending assignments</p>
                ) : (
                  <div className="space-y-3">
                    {assignments
                      .filter(a => !a.completed)
                      .slice(0, 3)
                      .map((assignment) => (
                        <div 
                          key={assignment.id}
                          className="bg-universe-dark bg-opacity-50 rounded-lg p-3 flex justify-between items-center"
                        >
                          <div>
                            <p className="font-medium">{assignment.title}</p>
                            <p className="text-xs text-gray-400">Due: {assignment.dueDate.toLocaleDateString()}</p>
                          </div>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            assignment.priority === "High" 
                              ? "bg-red-500 bg-opacity-20 text-red-400" 
                              : assignment.priority === "Medium" 
                              ? "bg-yellow-500 bg-opacity-20 text-yellow-400" 
                              : "bg-blue-500 bg-opacity-20 text-blue-400"
                          }`}>
                            {assignment.priority}
                          </span>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </GlowingCard>
            
            <GlowingCard gradient="pink">
              <div className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Calendar className="mr-2 text-universe-neonPink" />
                  Upcoming Events
                </h3>
                
                {upcomingEvents === 0 ? (
                  <p className="text-gray-400 text-center py-4">No upcoming events</p>
                ) : (
                  <div className="space-y-3">
                    {events
                      .filter(e => e.date > new Date())
                      .slice(0, 3)
                      .map((event) => (
                        <div 
                          key={event.id}
                          className="bg-universe-dark bg-opacity-50 rounded-lg p-3"
                        >
                          <p className="font-medium">{event.title}</p>
                          <div className="flex justify-between text-xs text-gray-400">
                            <span>{event.date.toLocaleDateString()}</span>
                            {event.isExam && (
                              <span className="bg-red-500 bg-opacity-20 text-red-400 px-2 py-0.5 rounded-full">
                                Exam
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </GlowingCard>
          </div>
          
          <GlowingCard gradient="blue-purple" className="mt-6 p-6">
            <h3 className="font-semibold mb-4 flex items-center">
              <Heart className="mr-2 text-universe-neonPurple" />
              Activity Feed
            </h3>
            
            <div className="space-y-4">
              <div className="flex">
                <div className="mr-4 flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-universe-neonBlue bg-opacity-20 flex items-center justify-center">
                    <CheckSquare className="w-5 h-5 text-universe-neonBlue" />
                  </div>
                </div>
                <div>
                  <p>You completed an assignment</p>
                  <p className="text-sm text-gray-400">Physics Lab Report • 2 days ago</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4 flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-universe-neonPurple bg-opacity-20 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-universe-neonPurple" />
                  </div>
                </div>
                <div>
                  <p>You RSVP'd to an event</p>
                  <p className="text-sm text-gray-400">Tech Talk: AI and the Future • 3 days ago</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4 flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-universe-neonPink bg-opacity-20 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-universe-neonPink" />
                  </div>
                </div>
                <div>
                  <p>You liked a community post</p>
                  <p className="text-sm text-gray-400">My AI Art • 4 days ago</p>
                </div>
              </div>
            </div>
          </GlowingCard>
        </div>
      </div>
    </div>
  );
};

export default Profile;


import React, { useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Calendar, Dialog, Popover } from "@/components/ui/";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  TabsContent, 
  TabsList, 
  TabsTrigger, 
  Tabs 
} from "@/components/ui/tabs";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, PlusCircle, BookOpen, MessageSquare } from "lucide-react";
import { useUniverse } from "@/contexts/UniverseContext";
import GradientText from "@/components/ui/GradientText";
import GradientButton from "@/components/ui/GradientButton";
import GlowingCard from "@/components/ui/GlowingCard";
import SectionTitle from "@/components/ui/SectionTitle";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const StudySphere = () => {
  const { 
    events, 
    addEvent, 
    classes, 
    addClassEvent, 
    assignments, 
    addAssignment,
    groupChats,
    addMessageToGroupChat,
    currentUser,
    setSelectedChat
  } = useUniverse();
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: new Date(),
    isExam: false,
    description: "",
    course: ""
  });
  
  const [newClass, setNewClass] = useState({
    course: "",
    day: "Monday",
    time: "09:00",
    slot: "",
    faculty: ""
  });
  
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    dueDate: new Date(),
    priority: "Medium",
    course: ""
  });
  
  const [selectedChat, setSelectedGroupChat] = useState<string | null>(null);
  const [chatMessage, setChatMessage] = useState("");
  
  const selectedChatData = selectedChat 
    ? groupChats.find(chat => chat.id === selectedChat) 
    : null;
  
  // Filters
  const eventsForSelectedDate = selectedDate
    ? events.filter(
        (event) =>
          event.date.getDate() === selectedDate.getDate() &&
          event.date.getMonth() === selectedDate.getMonth() &&
          event.date.getFullYear() === selectedDate.getFullYear()
      )
    : [];
  
  const handleAddEvent = () => {
    addEvent({
      title: newEvent.title,
      date: newEvent.date,
      isExam: newEvent.isExam,
      description: newEvent.description,
      course: newEvent.course
    });
    
    setNewEvent({
      title: "",
      date: new Date(),
      isExam: false,
      description: "",
      course: ""
    });
  };
  
  const handleAddClass = () => {
    addClassEvent({
      course: newClass.course,
      day: newClass.day,
      time: newClass.time,
      slot: newClass.slot,
      faculty: newClass.faculty
    });
    
    setNewClass({
      course: "",
      day: "Monday",
      time: "09:00",
      slot: "",
      faculty: ""
    });
  };
  
  const handleAddAssignment = () => {
    addAssignment({
      title: newAssignment.title,
      dueDate: newAssignment.dueDate,
      priority: newAssignment.priority as any,
      completed: false,
      course: newAssignment.course
    });
    
    setNewAssignment({
      title: "",
      dueDate: new Date(),
      priority: "Medium",
      course: ""
    });
  };
  
  const handleSendMessage = () => {
    if (chatMessage.trim() && selectedChat) {
      addMessageToGroupChat(selectedChat, {
        senderId: currentUser.id,
        receiverId: selectedChat,
        content: chatMessage,
        timestamp: new Date(),
        isRead: true
      });
      setChatMessage("");
    }
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-universe-highPriority bg-opacity-20 border-universe-highPriority";
      case "Medium":
        return "bg-universe-mediumPriority bg-opacity-20 border-universe-mediumPriority";
      case "Low":
        return "bg-universe-lowPriority bg-opacity-20 border-universe-lowPriority";
      default:
        return "bg-gray-500 bg-opacity-20 border-gray-500";
    }
  };
  
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <GradientText gradient="blue" element="h1" className="text-3xl md:text-4xl font-bold mb-2">
          🛰 Orbit: StudySphere
        </GradientText>
        <p className="text-gray-400">Manage your academic life with ease</p>
      </header>
      
      <Tabs defaultValue="timetable" className="w-full">
        <TabsList className="mb-6 bg-universe-card">
          <TabsTrigger value="timetable" className="data-[state=active]:bg-universe-neonBlue data-[state=active]:text-white">
            Timetable
          </TabsTrigger>
          <TabsTrigger value="assignments" className="data-[state=active]:bg-universe-neonBlue data-[state=active]:text-white">
            Assignments
          </TabsTrigger>
          <TabsTrigger value="group-chats" className="data-[state=active]:bg-universe-neonBlue data-[state=active]:text-white">
            Group Chats
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="timetable" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <SectionTitle 
                title="Academic Calendar" 
                gradient="blue" 
                description="Track your exams, assignments, and events"
              />
              
              <GlowingCard gradient="blue" className="mb-6">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="border-0 pointer-events-auto"
                  styles={{
                    head_cell: {
                      width: "100%",
                    },
                    table: {
                      width: "100%",
                    },
                    button: {
                      width: "40px",
                    },
                    nav_button_previous: {
                      width: "32px",
                      height: "32px",
                    },
                    nav_button_next: {
                      width: "32px",
                      height: "32px",
                    },
                    caption: {
                      textTransform: "uppercase",
                    },
                  }}
                />
              </GlowingCard>
              
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "No date selected"}
                </h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <GradientButton gradient="blue" size="sm" className="flex items-center">
                      <PlusCircle className="w-4 h-4 mr-1" />
                      Add Event
                    </GradientButton>
                  </DialogTrigger>
                  <DialogContent className="bg-universe-card border-universe-neonBlue">
                    <DialogHeader>
                      <DialogTitle>Add Event</DialogTitle>
                      <DialogDescription>
                        Add a new event to your academic calendar
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="event-title">Title</Label>
                        <Input
                          id="event-title"
                          placeholder="Enter event title"
                          value={newEvent.title}
                          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                          className="bg-universe-dark border-universe-card"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="event-date">Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal bg-universe-dark border-universe-card"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {newEvent.date ? (
                                format(newEvent.date, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-universe-card" align="start">
                            <Calendar
                              mode="single"
                              selected={newEvent.date}
                              onSelect={(date) => setNewEvent({ ...newEvent, date: date || new Date() })}
                              initialFocus
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="event-type">Event Type</Label>
                        <Select 
                          onValueChange={(value) => setNewEvent({ ...newEvent, isExam: value === "exam" })}
                        >
                          <SelectTrigger className="bg-universe-dark border-universe-card">
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                          <SelectContent className="bg-universe-card border-universe-card">
                            <SelectItem value="exam">Exam</SelectItem>
                            <SelectItem value="event">Regular Event</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="event-course">Course (Optional)</Label>
                        <Input
                          id="event-course"
                          placeholder="Enter course"
                          value={newEvent.course}
                          onChange={(e) => setNewEvent({ ...newEvent, course: e.target.value })}
                          className="bg-universe-dark border-universe-card"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="event-description">Description (Optional)</Label>
                        <Input
                          id="event-description"
                          placeholder="Enter description"
                          value={newEvent.description}
                          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                          className="bg-universe-dark border-universe-card"
                        />
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <GradientButton
                        gradient="blue"
                        onClick={handleAddEvent}
                        disabled={!newEvent.title || !newEvent.date}
                      >
                        Save Event
                      </GradientButton>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="space-y-4">
                {eventsForSelectedDate.length === 0 ? (
                  <p className="text-gray-400 text-center py-6">No events for this date</p>
                ) : (
                  eventsForSelectedDate.map((event) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <GlowingCard gradient="blue" className="hover:shadow-neon">
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold text-lg">{event.title}</h4>
                              <div className="flex items-center text-gray-400 text-sm mt-1">
                                <span className="mr-2">
                                  {format(event.date, "h:mm a")}
                                </span>
                                {event.isExam && (
                                  <span className="bg-red-500 bg-opacity-30 text-red-300 text-xs px-2 py-0.5 rounded-full">
                                    Exam
                                  </span>
                                )}
                                {event.course && (
                                  <span className="bg-blue-500 bg-opacity-30 text-blue-300 text-xs px-2 py-0.5 rounded-full ml-2">
                                    {event.course}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          {event.description && (
                            <p className="mt-2 text-gray-400 text-sm">
                              {event.description}
                            </p>
                          )}
                        </div>
                      </GlowingCard>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
            
            <div className="md:w-1/2">
              <SectionTitle 
                title="Weekly Timetable" 
                gradient="blue" 
                description="Manage your class schedule"
              />
              
              <div className="mb-4 flex justify-end">
                <Dialog>
                  <DialogTrigger asChild>
                    <GradientButton gradient="blue" size="sm" className="flex items-center">
                      <PlusCircle className="w-4 h-4 mr-1" />
                      Add Class
                    </GradientButton>
                  </DialogTrigger>
                  <DialogContent className="bg-universe-card border-universe-neonBlue">
                    <DialogHeader>
                      <DialogTitle>Add Class</DialogTitle>
                      <DialogDescription>
                        Add a new class to your weekly schedule
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="class-course">Course</Label>
                        <Input
                          id="class-course"
                          placeholder="Enter course name"
                          value={newClass.course}
                          onChange={(e) => setNewClass({ ...newClass, course: e.target.value })}
                          className="bg-universe-dark border-universe-card"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="class-day">Day</Label>
                        <Select 
                          value={newClass.day}
                          onValueChange={(value) => setNewClass({ ...newClass, day: value })}
                        >
                          <SelectTrigger className="bg-universe-dark border-universe-card">
                            <SelectValue placeholder="Select day" />
                          </SelectTrigger>
                          <SelectContent className="bg-universe-card border-universe-card">
                            <SelectItem value="Monday">Monday</SelectItem>
                            <SelectItem value="Tuesday">Tuesday</SelectItem>
                            <SelectItem value="Wednesday">Wednesday</SelectItem>
                            <SelectItem value="Thursday">Thursday</SelectItem>
                            <SelectItem value="Friday">Friday</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="class-time">Time</Label>
                        <Input
                          id="class-time"
                          type="time"
                          value={newClass.time}
                          onChange={(e) => setNewClass({ ...newClass, time: e.target.value })}
                          className="bg-universe-dark border-universe-card"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="class-slot">Slot</Label>
                        <Input
                          id="class-slot"
                          placeholder="E.g., A1, B2"
                          value={newClass.slot}
                          onChange={(e) => setNewClass({ ...newClass, slot: e.target.value })}
                          className="bg-universe-dark border-universe-card"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="class-faculty">Faculty</Label>
                        <Input
                          id="class-faculty"
                          placeholder="Enter faculty name"
                          value={newClass.faculty}
                          onChange={(e) => setNewClass({ ...newClass, faculty: e.target.value })}
                          className="bg-universe-dark border-universe-card"
                        />
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <GradientButton
                        gradient="blue"
                        onClick={handleAddClass}
                        disabled={!newClass.course || !newClass.day || !newClass.time || !newClass.slot}
                      >
                        Save Class
                      </GradientButton>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="space-y-4">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                  <div key={day}>
                    <h3 className="font-semibold text-lg mb-2">{day}</h3>
                    <div className="space-y-2">
                      {classes.filter((c) => c.day === day).length === 0 ? (
                        <p className="text-gray-400 text-sm">No classes scheduled</p>
                      ) : (
                        classes
                          .filter((c) => c.day === day)
                          .sort((a, b) => a.time.localeCompare(b.time))
                          .map((classItem) => (
                            <motion.div
                              key={classItem.id}
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <GlowingCard gradient="blue-purple" className="hover:shadow-neon">
                                <div className="p-3 flex justify-between items-center">
                                  <div>
                                    <h4 className="font-medium">
                                      {classItem.course} <span className="text-sm text-universe-neonBlue">{classItem.slot}</span>
                                    </h4>
                                    <p className="text-sm text-gray-400">
                                      {classItem.faculty}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-universe-neonBlue font-medium">
                                      {classItem.time}
                                    </span>
                                  </div>
                                </div>
                              </GlowingCard>
                            </motion.div>
                          ))
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="assignments" className="space-y-6">
          <div className="flex justify-between items-center mb-6">
            <SectionTitle 
              title="Assignments" 
              gradient="blue" 
              description="Manage your assignments and deadlines"
            />
            
            <Dialog>
              <DialogTrigger asChild>
                <GradientButton gradient="blue" className="flex items-center">
                  <PlusCircle className="w-4 h-4 mr-1" />
                  New Assignment
                </GradientButton>
              </DialogTrigger>
              <DialogContent className="bg-universe-card border-universe-neonBlue">
                <DialogHeader>
                  <DialogTitle>Add Assignment</DialogTitle>
                  <DialogDescription>
                    Add a new assignment to your list
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="assignment-title">Title</Label>
                    <Input
                      id="assignment-title"
                      placeholder="Enter assignment title"
                      value={newAssignment.title}
                      onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                      className="bg-universe-dark border-universe-card"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="assignment-due">Due Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal bg-universe-dark border-universe-card"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newAssignment.dueDate ? (
                            format(newAssignment.dueDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-universe-card" align="start">
                        <Calendar
                          mode="single"
                          selected={newAssignment.dueDate}
                          onSelect={(date) => setNewAssignment({ ...newAssignment, dueDate: date || new Date() })}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="assignment-priority">Priority</Label>
                    <Select 
                      value={newAssignment.priority}
                      onValueChange={(value) => setNewAssignment({ ...newAssignment, priority: value })}
                    >
                      <SelectTrigger className="bg-universe-dark border-universe-card">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent className="bg-universe-card border-universe-card">
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="assignment-course">Course (Optional)</Label>
                    <Input
                      id="assignment-course"
                      placeholder="Enter course"
                      value={newAssignment.course}
                      onChange={(e) => setNewAssignment({ ...newAssignment, course: e.target.value })}
                      className="bg-universe-dark border-universe-card"
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <GradientButton
                    gradient="blue"
                    onClick={handleAddAssignment}
                    disabled={!newAssignment.title || !newAssignment.dueDate}
                  >
                    Add Assignment
                  </GradientButton>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assignments.length === 0 ? (
              <p className="text-gray-400 text-center py-6 col-span-full">No assignments yet</p>
            ) : (
              assignments
                .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
                .map((assignment) => (
                  <motion.div
                    key={assignment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <GlowingCard 
                      gradient={
                        assignment.priority === "High" 
                          ? "pink" 
                          : assignment.priority === "Medium" 
                          ? "purple" 
                          : "blue"
                      }
                      className={cn(
                        "border",
                        getPriorityColor(assignment.priority)
                      )}
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-lg mb-2">{assignment.title}</h4>
                          <span className={cn(
                            "text-xs px-2 py-0.5 rounded-full",
                            assignment.priority === "High" 
                              ? "bg-universe-highPriority bg-opacity-30 text-red-300" 
                              : assignment.priority === "Medium" 
                              ? "bg-universe-mediumPriority bg-opacity-30 text-yellow-300" 
                              : "bg-universe-lowPriority bg-opacity-30 text-blue-300"
                          )}>
                            {assignment.priority}
                          </span>
                        </div>
                        {assignment.course && (
                          <p className="text-sm text-gray-400 mb-2">
                            {assignment.course}
                          </p>
                        )}
                        <div className="flex justify-between items-center mt-2">
                          <div className="text-sm">
                            <span className="text-gray-400">Due: </span>
                            <span className={cn(
                              new Date() > assignment.dueDate ? "text-red-400" : "text-gray-300"
                            )}>
                              {format(assignment.dueDate, "MMM d, yyyy")}
                            </span>
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              checked={assignment.completed}
                              onChange={() => {/* Will be implemented with updateAssignment */}}
                              className="rounded bg-universe-dark border-universe-card text-universe-neonBlue"
                            />
                          </div>
                        </div>
                      </div>
                    </GlowingCard>
                  </motion.div>
                ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="group-chats" className="space-y-6">
          <SectionTitle 
            title="Group Chats" 
            gradient="blue" 
            description="Connect with classmates in your courses"
          />
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3 space-y-4">
              {groupChats.map((chat) => (
                <motion.div
                  key={chat.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelectedGroupChat(chat.id)}
                >
                  <GlowingCard
                    gradient="blue"
                    className={cn(
                      "cursor-pointer",
                      selectedChat === chat.id ? "border-universe-neonBlue" : ""
                    )}
                  >
                    <div className="p-4">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-5 h-5 text-universe-neonBlue" />
                        <h4 className="font-semibold">{chat.name}</h4>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">
                        {chat.members.length} members
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {chat.messages.length} messages
                      </p>
                    </div>
                  </GlowingCard>
                </motion.div>
              ))}
            </div>
            
            <div className="md:w-2/3">
              {selectedChat ? (
                <GlowingCard gradient="blue" className="flex flex-col h-[500px]">
                  <div className="p-3 border-b border-universe-card flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5 text-universe-neonBlue" />
                    <h3 className="font-semibold">{selectedChatData?.name}</h3>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {selectedChatData?.messages.length === 0 ? (
                      <div className="text-center py-8 text-gray-400">
                        <p>No messages yet</p>
                        <p className="text-sm">Start the conversation!</p>
                      </div>
                    ) : (
                      selectedChatData?.messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={cn(
                            "max-w-[75%] rounded-lg p-3",
                            msg.senderId === currentUser.id
                              ? "ml-auto bg-universe-neonBlue bg-opacity-20 text-white"
                              : "bg-universe-card text-white"
                          )}
                        >
                          <p className="text-sm">
                            {msg.senderId === currentUser.id ? "You" : "Classmate"}: {msg.content}
                          </p>
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
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-universe-dark border-universe-card focus:border-universe-neonBlue"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSendMessage();
                          }
                        }}
                      />
                      <GradientButton
                        gradient="blue"
                        onClick={handleSendMessage}
                        disabled={!chatMessage.trim()}
                      >
                        Send
                      </GradientButton>
                    </div>
                  </div>
                </GlowingCard>
              ) : (
                <div className="flex items-center justify-center h-[500px] bg-universe-card bg-opacity-50 rounded-lg border border-universe-card">
                  <div className="text-center">
                    <MessageSquare className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No chat selected</h3>
                    <p className="text-gray-400">
                      Select a group chat to start messaging
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudySphere;

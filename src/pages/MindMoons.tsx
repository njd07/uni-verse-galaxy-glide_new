
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useUniverse } from "@/contexts/UniverseContext";
import GradientText from "@/components/ui/GradientText";
import GlowingCard from "@/components/ui/GlowingCard";
import GradientButton from "@/components/ui/GradientButton";
import SectionTitle from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  TabsContent,
  TabsList,
  TabsTrigger,
  Tabs
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Brain, Smile, Frown, Meh, ChevronLeft, ChevronRight, Heart, Phone, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const MOTIVATIONAL_QUOTES = [
  "Believe you can and you're halfway there.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "The only way to do great work is to love what you do.",
  "You are never too old to set another goal or to dream a new dream.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "It does not matter how slowly you go as long as you do not stop."
];

const WELLBEING_TIPS = [
  "Take a 10-minute walk outside today.",
  "Practice deep breathing for 5 minutes.",
  "Write down three things you're grateful for.",
  "Drink a glass of water and take a stretch break.",
  "Reach out to a friend or family member.",
  "Get 7-8 hours of sleep tonight."
];

const MindMoons = () => {
  const { mood, setMood, motivationalQuote, setMotivationalQuote } = useUniverse();
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{
    sender: "user" | "bot";
    message: string;
  }[]>([
    { sender: "bot", message: "Hi! How's your day going?" }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselItems] = useState([
    { type: "quote", content: MOTIVATIONAL_QUOTES[0] },
    { type: "tip", content: WELLBEING_TIPS[0] },
    { type: "quote", content: MOTIVATIONAL_QUOTES[1] }
  ]);
  
  const handleMoodSelect = (selectedMood: "Happy" | "Stressed" | "Tired") => {
    setMood(selectedMood);
    
    // Generate a relevant quote based on mood
    let newQuote = "";
    if (selectedMood === "Happy") {
      newQuote = "The joy you feel today is a gift. Share it with others!";
    } else if (selectedMood === "Stressed") {
      newQuote = "Take a deep breath. You've got this. One step at a time.";
    } else {
      newQuote = "Rest is not a luxury, it's a necessity. Take care of yourself.";
    }
    
    setMotivationalQuote(newQuote);
  };
  
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([...chatMessages, { sender: "user", message: newMessage }]);
      setNewMessage("");
      
      // Simulate bot response
      setTimeout(() => {
        let botResponse = "";
        const lowerMessage = newMessage.toLowerCase();
        
        if (lowerMessage.includes("stress") || lowerMessage.includes("anxious") || lowerMessage.includes("worried")) {
          botResponse = "I understand that feeling stressed can be overwhelming. Try taking a few deep breaths or going for a short walk. Would you like some more stress management techniques?";
        } else if (lowerMessage.includes("sad") || lowerMessage.includes("down") || lowerMessage.includes("depress")) {
          botResponse = "I'm sorry to hear you're feeling down. Remember that it's okay to not be okay sometimes. Would you like to talk about what's bothering you or would you prefer some mood-lifting activities?";
        } else if (lowerMessage.includes("tired") || lowerMessage.includes("exhausted") || lowerMessage.includes("sleep")) {
          botResponse = "Being tired can affect everything. Are you getting enough sleep? Try establishing a regular sleep routine and limiting screen time before bed.";
        } else if (lowerMessage.includes("happy") || lowerMessage.includes("good") || lowerMessage.includes("great")) {
          botResponse = "That's wonderful to hear! What specifically made your day good? Recognizing these positive moments can help maintain your good mood.";
        } else if (lowerMessage.includes("help") || lowerMessage.includes("resource")) {
          botResponse = "If you need immediate support, remember the campus counseling center is available. Would you like me to provide their contact information?";
        } else {
          botResponse = "Thank you for sharing. How else can I help you today?";
        }
        
        setChatMessages(prev => [...prev, { sender: "bot", message: botResponse }]);
      }, 1000);
    }
  };
  
  const nextCarousel = () => {
    setCarouselIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  };
  
  const prevCarousel = () => {
    setCarouselIndex((prevIndex) => (prevIndex - 1 + carouselItems.length) % carouselItems.length);
  };
  
  // Auto-rotate carousel
  React.useEffect(() => {
    const interval = setInterval(() => {
      nextCarousel();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <GradientText gradient="blue-purple" element="h1" className="text-3xl md:text-4xl font-bold mb-2">
          🧠 Orbit: MindMoons
        </GradientText>
        <p className="text-gray-400">Focus on your mental wellbeing</p>
      </header>
      
      <Tabs defaultValue="checkin" className="w-full">
        <TabsList className="mb-6 bg-universe-card">
          <TabsTrigger value="checkin" className="data-[state=active]:bg-universe-neonPurple data-[state=active]:text-white">
            Check-In
          </TabsTrigger>
          <TabsTrigger value="chatbot" className="data-[state=active]:bg-universe-neonPurple data-[state=active]:text-white">
            AI Chatbot
          </TabsTrigger>
          <TabsTrigger value="motivation" className="data-[state=active]:bg-universe-neonPurple data-[state=active]:text-white">
            Motivation
          </TabsTrigger>
          <TabsTrigger value="support" className="data-[state=active]:bg-universe-neonPurple data-[state=active]:text-white">
            Support
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="checkin" className="space-y-6">
          <SectionTitle 
            title="Daily Check-In" 
            gradient="blue-purple" 
            description="How are you feeling today?"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <GlowingCard 
                gradient="blue" 
                className={cn(
                  "cursor-pointer text-center py-8",
                  mood === "Happy" && "border-2 border-universe-neonBlue"
                )}
                onClick={() => handleMoodSelect("Happy")}
              >
                <Smile className="w-16 h-16 mx-auto mb-4 text-green-400" />
                <h3 className="text-xl font-semibold mb-2">Happy 😊</h3>
                <p className="text-gray-400">I'm having a good day</p>
              </GlowingCard>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <GlowingCard 
                gradient="purple" 
                className={cn(
                  "cursor-pointer text-center py-8",
                  mood === "Stressed" && "border-2 border-universe-neonPurple"
                )}
                onClick={() => handleMoodSelect("Stressed")}
              >
                <Frown className="w-16 h-16 mx-auto mb-4 text-red-400" />
                <h3 className="text-xl font-semibold mb-2">Stressed 😓</h3>
                <p className="text-gray-400">I'm feeling overwhelmed</p>
              </GlowingCard>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <GlowingCard 
                gradient="pink" 
                className={cn(
                  "cursor-pointer text-center py-8",
                  mood === "Tired" && "border-2 border-universe-neonPink"
                )}
                onClick={() => handleMoodSelect("Tired")}
              >
                <Meh className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
                <h3 className="text-xl font-semibold mb-2">Tired 😴</h3>
                <p className="text-gray-400">I need some rest</p>
              </GlowingCard>
            </motion.div>
          </div>
          
          {mood && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8"
            >
              <GlowingCard gradient="blue-purple" className="p-6 text-center">
                <Sparkles className="w-8 h-8 mx-auto mb-4 text-universe-neonPurple" />
                <h3 className="text-xl font-semibold mb-4">Your Personalized Quote</h3>
                <p className="text-lg italic">{motivationalQuote}</p>
              </GlowingCard>
            </motion.div>
          )}
        </TabsContent>
        
        <TabsContent value="chatbot" className="space-y-6">
          <SectionTitle 
            title="AI Wellbeing Assistant" 
            gradient="blue-purple" 
            description="Chat with our AI to discuss your feelings or get support"
          />
          
          <div className="max-w-3xl mx-auto">
            <GlowingCard gradient="blue-purple" className="p-0 overflow-hidden">
              <div className="flex flex-col h-[500px]">
                <div className="p-4 border-b border-universe-card bg-universe-card bg-opacity-50 flex items-center">
                  <Brain className="w-5 h-5 text-universe-neonPurple mr-2" />
                  <h3 className="font-semibold">MindBot Assistant</h3>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={cn(
                        "max-w-[75%] rounded-lg p-3",
                        msg.sender === "user"
                          ? "ml-auto bg-universe-neonPurple bg-opacity-20 text-white"
                          : "bg-universe-card text-white"
                      )}
                    >
                      <p>{msg.message}</p>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 border-t border-universe-card">
                  <div className="flex space-x-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 bg-universe-dark border-universe-card focus:border-universe-neonPurple"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSendMessage();
                        }
                      }}
                    />
                    <GradientButton
                      gradient="purple"
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                    >
                      Send
                    </GradientButton>
                  </div>
                </div>
              </div>
            </GlowingCard>
          </div>
        </TabsContent>
        
        <TabsContent value="motivation" className="space-y-6">
          <SectionTitle 
            title="Daily Motivation" 
            gradient="blue-purple" 
            description="Quotes and tips to boost your day"
          />
          
          <div className="max-w-3xl mx-auto">
            <GlowingCard gradient="blue-purple" className="p-6 text-center relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevCarousel}
                  className="rounded-full hover:bg-universe-card text-gray-400 hover:text-white"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
              </div>
              
              <div className="mx-12">
                <div className="min-h-[150px] flex items-center justify-center">
                  {carouselItems[carouselIndex].type === "quote" ? (
                    <div className="flex flex-col items-center">
                      <Sparkles className="w-8 h-8 mb-4 text-universe-neonPurple" />
                      <p className="text-lg italic">"{carouselItems[carouselIndex].content}"</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Heart className="w-8 h-8 mb-4 text-universe-neonPink" />
                      <p className="text-lg">
                        {carouselItems[carouselIndex].content}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-center mt-6 space-x-2">
                  {carouselItems.map((_, index) => (
                    <button
                      key={index}
                      className={cn(
                        "w-2 h-2 rounded-full",
                        index === carouselIndex 
                          ? "bg-universe-neonPurple" 
                          : "bg-universe-card"
                      )}
                      onClick={() => setCarouselIndex(index)}
                    />
                  ))}
                </div>
              </div>
              
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextCarousel}
                  className="rounded-full hover:bg-universe-card text-gray-400 hover:text-white"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
            </GlowingCard>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <GlowingCard gradient="blue">
              <div className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-universe-neonBlue" />
                  Daily Quotes
                </h3>
                <ul className="space-y-3">
                  {MOTIVATIONAL_QUOTES.slice(0, 4).map((quote, index) => (
                    <li key={index} className="text-gray-300 italic">"{quote}"</li>
                  ))}
                </ul>
              </div>
            </GlowingCard>
            
            <GlowingCard gradient="purple">
              <div className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-universe-neonPurple" />
                  Wellbeing Tips
                </h3>
                <ul className="space-y-3">
                  {WELLBEING_TIPS.slice(0, 4).map((tip, index) => (
                    <li key={index} className="text-gray-300">• {tip}</li>
                  ))}
                </ul>
              </div>
            </GlowingCard>
          </div>
        </TabsContent>
        
        <TabsContent value="support" className="space-y-6">
          <SectionTitle 
            title="Professional Support" 
            gradient="blue-purple" 
            description="Connect with university mental health resources"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlowingCard gradient="blue-purple">
              <div className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-universe-neonPurple" />
                  Campus Counseling Center
                </h3>
                
                <div className="space-y-4">
                  <p>
                    The university's counseling center offers free, confidential counseling 
                    services to all students.
                  </p>
                  
                  <div className="bg-universe-dark p-4 rounded-lg">
                    <p className="text-gray-300 mb-2"><span className="font-semibold">Location:</span> Student Center, Room 204</p>
                    <p className="text-gray-300 mb-2"><span className="font-semibold">Hours:</span> Monday-Friday, 9 AM - 5 PM</p>
                    <p className="text-gray-300"><span className="font-semibold">Phone:</span> (555) 123-4567</p>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <GradientButton gradient="purple" className="w-full">
                        Request Appointment
                      </GradientButton>
                    </DialogTrigger>
                    <DialogContent className="bg-universe-card border-universe-neonPurple">
                      <DialogHeader>
                        <DialogTitle>Request Counseling Appointment</DialogTitle>
                        <DialogDescription>
                          Fill out this form to request an appointment with a counselor.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium" htmlFor="name">Name</label>
                          <Input
                            id="name"
                            placeholder="Your name"
                            className="bg-universe-dark border-universe-card"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium" htmlFor="email">Email</label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Your email"
                            className="bg-universe-dark border-universe-card"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium" htmlFor="preferred-time">Preferred Time</label>
                          <Input
                            id="preferred-time"
                            placeholder="e.g., Afternoons, Monday mornings"
                            className="bg-universe-dark border-universe-card"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium" htmlFor="reason">Brief Reason for Visit (Optional)</label>
                          <Textarea
                            id="reason"
                            placeholder="Share any information that might help us match you with the right counselor"
                            className="bg-universe-dark border-universe-card"
                          />
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <GradientButton gradient="purple">
                          Submit Request
                        </GradientButton>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </GlowingCard>
            
            <GlowingCard gradient="blue">
              <div className="p-6">
                <h3 className="font-semibold mb-4">Crisis Resources</h3>
                
                <div className="space-y-4">
                  <div className="bg-red-500 bg-opacity-10 border border-red-500 border-opacity-20 rounded-lg p-4">
                    <h4 className="font-semibold text-red-400 mb-2">Emergency Services</h4>
                    <p className="text-gray-300 mb-1">For immediate emergencies:</p>
                    <p className="text-gray-300 mb-1">• Campus Emergency: (555) 911</p>
                    <p className="text-gray-300">• National Crisis Line: 988</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">24/7 Resources</h4>
                    <ul className="space-y-2">
                      <li className="text-gray-300">• Crisis Text Line: Text HOME to 741741</li>
                      <li className="text-gray-300">• Campus Night Line: (555) 789-0123</li>
                      <li className="text-gray-300">• Online Chat Support: <a href="#" className="text-universe-neonBlue hover:underline">wellness.university.edu/chat</a></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Support Groups</h4>
                    <ul className="space-y-2">
                      <li className="text-gray-300">• Stress Management: Tuesdays, 5 PM</li>
                      <li className="text-gray-300">• Mindfulness Meditation: Wednesdays, 12 PM</li>
                      <li className="text-gray-300">• Peer Support Circle: Thursdays, 6 PM</li>
                    </ul>
                  </div>
                </div>
              </div>
            </GlowingCard>
          </div>
          
          <GlowingCard gradient="purple-pink" className="p-6 text-center mt-6">
            <h3 className="font-semibold mb-4">Remember</h3>
            <p className="text-lg">
              Taking care of your mental health is just as important as your academics. 
              You are not alone, and help is available whenever you need it.
            </p>
          </GlowingCard>
        </TabsContent>
      </Tabs>
      
      {/* Floating Chat Button */}
      {!chatOpen && (
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            onClick={() => setChatOpen(true)}
            className="w-14 h-14 rounded-full bg-gradient-blue-purple shadow-neon flex items-center justify-center"
          >
            <MessageSquare className="h-6 w-6 text-white" />
          </Button>
        </motion.div>
      )}
      
      {/* Floating Chat Window */}
      {chatOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 w-80 z-50"
        >
          <GlowingCard gradient="blue-purple" className="p-0 overflow-hidden shadow-neon">
            <div className="flex flex-col h-96">
              <div className="p-3 border-b border-universe-card bg-universe-card bg-opacity-50 flex items-center justify-between">
                <div className="flex items-center">
                  <MessageSquare className="w-5 h-5 text-universe-neonPurple mr-2" />
                  <h3 className="font-semibold">MindBot</h3>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setChatOpen(false)}
                  className="h-8 w-8 text-gray-400 hover:text-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={cn(
                      "max-w-[75%] rounded-lg p-3",
                      msg.sender === "user"
                        ? "ml-auto bg-universe-neonPurple bg-opacity-20 text-white"
                        : "bg-universe-card text-white"
                    )}
                  >
                    <p className="text-sm">{msg.message}</p>
                  </div>
                ))}
              </div>
              
              <div className="p-3 border-t border-universe-card">
                <div className="flex space-x-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type..."
                    className="flex-1 bg-universe-dark border-universe-card focus:border-universe-neonPurple h-9 text-sm"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-universe-neonPurple hover:bg-purple-600 h-9 px-3"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </GlowingCard>
        </motion.div>
      )}
    </div>
  );
};

export default MindMoons;

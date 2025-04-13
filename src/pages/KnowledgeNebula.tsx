
import React, { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { useUniverse } from "@/contexts/UniverseContext";
import GradientText from "@/components/ui/GradientText";
import GlowingCard from "@/components/ui/GlowingCard";
import GradientButton from "@/components/ui/GradientButton";
import SectionTitle from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Search, 
  BookOpen, 
  Filter, 
  Download, 
  Clock, 
  Coffee, 
  BookMarked, 
  ShoppingCart 
} from "lucide-react";
import { cn } from "@/lib/utils";

const KnowledgeNebula = () => {
  const { resources, addResource, campusInfo } = useUniverse();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [resourceTypeFilter, setResourceTypeFilter] = useState<string | null>(null);
  const [courseFilter, setCourseFilter] = useState<string | null>(null);
  const [campusInfoTab, setCampusInfoTab] = useState("menu");
  
  const [newResource, setNewResource] = useState({
    title: "",
    course: "",
    type: "PDF",
    url: "#"
  });
  
  // Extract unique courses for filter
  const uniqueCourses = Array.from(new Set(resources.map(resource => resource.course)));
  
  // Filter resources
  const filteredResources = resources.filter(resource => {
    // Apply search term filter
    const matchesSearchTerm = searchTerm === "" || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.course.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply resource type filter
    const matchesType = resourceTypeFilter === null || resource.type === resourceTypeFilter;
    
    // Apply course filter
    const matchesCourse = courseFilter === null || resource.course === courseFilter;
    
    return matchesSearchTerm && matchesType && matchesCourse;
  });
  
  const handleAddResource = () => {
    addResource({
      title: newResource.title,
      course: newResource.course,
      uploadDate: new Date(),
      type: newResource.type as "PDF" | "PYQ",
      url: newResource.url
    });
    
    setNewResource({
      title: "",
      course: "",
      type: "PDF",
      url: "#"
    });
  };
  
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <GradientText gradient="blue" element="h1" className="text-3xl md:text-4xl font-bold mb-2">
          📚 Orbit: KnowledgeNebula
        </GradientText>
        <p className="text-gray-400">Access learning resources and campus information</p>
      </header>
      
      <Tabs defaultValue="resources" className="w-full">
        <TabsList className="mb-6 bg-universe-card">
          <TabsTrigger value="resources" className="data-[state=active]:bg-universe-neonBlue data-[state=active]:text-white">
            Academic Resources
          </TabsTrigger>
          <TabsTrigger value="campus-info" className="data-[state=active]:bg-universe-neonBlue data-[state=active]:text-white">
            Campus Info
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="resources" className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search PDFs, PYQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-universe-dark border-universe-card focus:border-universe-neonBlue w-full"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Select
                  value={resourceTypeFilter || ""}
                  onValueChange={value => setResourceTypeFilter(value === "" ? null : value)}
                >
                  <SelectTrigger className="bg-universe-dark border-universe-card w-[120px]">
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Type" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-universe-card border-universe-card">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="PDF">PDF</SelectItem>
                    <SelectItem value="PYQ">PYQ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="relative">
                <Select
                  value={courseFilter || ""}
                  onValueChange={value => setCourseFilter(value === "" ? null : value)}
                >
                  <SelectTrigger className="bg-universe-dark border-universe-card w-[150px]">
                    <div className="flex items-center">
                      <BookMarked className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Course" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-universe-card border-universe-card">
                    <SelectItem value="all">All Courses</SelectItem>
                    {uniqueCourses.map(course => (
                      <SelectItem key={course} value={course}>{course}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <GradientButton gradient="blue" className="whitespace-nowrap">
                    Upload Resource
                  </GradientButton>
                </DialogTrigger>
                <DialogContent className="bg-universe-card border-universe-neonBlue">
                  <DialogHeader>
                    <DialogTitle>Upload Resource</DialogTitle>
                    <DialogDescription>
                      Share study materials with your classmates
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="resource-title">Title</Label>
                      <Input
                        id="resource-title"
                        placeholder="Enter resource title"
                        value={newResource.title}
                        onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                        className="bg-universe-dark border-universe-card"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="resource-course">Course</Label>
                      <Input
                        id="resource-course"
                        placeholder="Enter course name"
                        value={newResource.course}
                        onChange={(e) => setNewResource({ ...newResource, course: e.target.value })}
                        className="bg-universe-dark border-universe-card"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="resource-type">Resource Type</Label>
                      <Select 
                        value={newResource.type}
                        onValueChange={(value) => setNewResource({ ...newResource, type: value })}
                      >
                        <SelectTrigger className="bg-universe-dark border-universe-card">
                          <SelectValue placeholder="Select resource type" />
                        </SelectTrigger>
                        <SelectContent className="bg-universe-card border-universe-card">
                          <SelectItem value="PDF">PDF</SelectItem>
                          <SelectItem value="PYQ">PYQ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="bg-universe-dark border border-dashed border-universe-card rounded-lg p-6 text-center">
                      <BookOpen className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-400">
                        Drop your file here or click to browse
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Supports PDF, DOC, PPT (Max 10MB)
                      </p>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <GradientButton
                      gradient="blue"
                      onClick={handleAddResource}
                      disabled={!newResource.title || !newResource.course}
                    >
                      Upload Resource
                    </GradientButton>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          {filteredResources.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-gray-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No resources found</h3>
              <p className="text-gray-400">
                Try adjusting your search or filters, or upload a new resource
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredResources.map((resource) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <GlowingCard gradient="blue" className="hover:shadow-neon">
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{resource.title}</h4>
                          <p className="text-sm text-gray-400 mt-1">{resource.course}</p>
                        </div>
                        <span className={cn(
                          "text-xs px-2 py-0.5 rounded-full",
                          resource.type === "PDF" 
                            ? "bg-blue-500 bg-opacity-30 text-blue-300" 
                            : "bg-yellow-500 bg-opacity-30 text-yellow-300"
                        )}>
                          {resource.type}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center text-xs text-gray-400">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{format(resource.uploadDate, "MMM d, yyyy")}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-1 text-universe-neonBlue hover:text-white hover:bg-universe-neonBlue hover:bg-opacity-20"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </GlowingCard>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="campus-info" className="space-y-6">
          <div className="flex justify-between items-center mb-6">
            <SectionTitle 
              title="Campus Information" 
              gradient="blue" 
              description="Everything you need to know about campus facilities"
            />
          </div>
          
          <div className="bg-universe-dark rounded-lg p-1 mb-6 inline-flex">
            <button
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                campusInfoTab === "menu" 
                  ? "bg-universe-card text-white" 
                  : "text-gray-400 hover:text-white"
              )}
              onClick={() => setCampusInfoTab("menu")}
            >
              Menu
            </button>
            <button
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                campusInfoTab === "shop-hours" 
                  ? "bg-universe-card text-white" 
                  : "text-gray-400 hover:text-white"
              )}
              onClick={() => setCampusInfoTab("shop-hours")}
            >
              Shop Hours
            </button>
            <button
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                campusInfoTab === "stationery" 
                  ? "bg-universe-card text-white" 
                  : "text-gray-400 hover:text-white"
              )}
              onClick={() => setCampusInfoTab("stationery")}
            >
              Stationery Stock
            </button>
          </div>
          
          {campusInfoTab === "menu" && (
            <div>
              <div className="flex items-center mb-4">
                <Coffee className="text-universe-neonBlue mr-2" />
                <h3 className="text-lg font-semibold">Campus Cafeteria Menu</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {campusInfo.menu.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <GlowingCard gradient="blue" className="hover:shadow-neon">
                      <div className="p-4 flex justify-between items-center">
                        <span className="font-medium">{item.item}</span>
                        <span className="text-universe-neonBlue font-semibold">₹{item.price}</span>
                      </div>
                    </GlowingCard>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
          
          {campusInfoTab === "shop-hours" && (
            <div>
              <div className="flex items-center mb-4">
                <Clock className="text-universe-neonBlue mr-2" />
                <h3 className="text-lg font-semibold">Campus Facilities Hours</h3>
              </div>
              
              <GlowingCard gradient="blue">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-universe-card">
                        <th className="px-4 py-3 text-left">Facility</th>
                        <th className="px-4 py-3 text-left">Operating Hours</th>
                      </tr>
                    </thead>
                    <tbody>
                      {campusInfo.shopHours.map((shop, index) => (
                        <tr key={index} className="border-b border-universe-card">
                          <td className="px-4 py-3">{shop.name}</td>
                          <td className="px-4 py-3 text-universe-neonBlue">{shop.hours}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlowingCard>
            </div>
          )}
          
          {campusInfoTab === "stationery" && (
            <div>
              <div className="flex items-center mb-4">
                <ShoppingCart className="text-universe-neonBlue mr-2" />
                <h3 className="text-lg font-semibold">Stationery Stock Availability</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {campusInfo.stationeryStock.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <GlowingCard gradient="blue" className="hover:shadow-neon">
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{item.item}</span>
                          <span className={cn(
                            "px-2 py-0.5 text-xs rounded-full",
                            item.available > 20 
                              ? "bg-green-500 bg-opacity-20 text-green-400" 
                              : item.available > 5 
                              ? "bg-yellow-500 bg-opacity-20 text-yellow-400" 
                              : "bg-red-500 bg-opacity-20 text-red-400"
                          )}>
                            {item.available > 20 
                              ? "In Stock" 
                              : item.available > 5 
                              ? "Limited" 
                              : "Low Stock"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <span>Available:</span>
                          <span>{item.available} units</span>
                        </div>
                      </div>
                    </GlowingCard>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KnowledgeNebula;

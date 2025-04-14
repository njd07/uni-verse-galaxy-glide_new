
import React, { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { useUniverse } from "@/contexts/UniverseContext";
import GradientText from "@/components/ui/GradientText";
import GlowingCard from "@/components/ui/GlowingCard";
import GradientButton from "@/components/ui/GradientButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  FileText,
  Calendar,
  Clock,
  Download,
  Coffee,
  Store,
  PenLine,
  MoreVertical,
  Filter,
  BookOpen,
  FileQuestion,
  Grid3X3,
  Plus,
  ShoppingCart 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import ResourceUploader from "@/components/ResourceUploader";

const KnowledgeNebula = () => {
  const { resources, addResource, campusInfo } = useUniverse();
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<"PDF" | "PYQ" | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  
  // Get unique courses from resources
  const courses = Array.from(new Set(resources.map((resource) => resource.course)));
  
  // Filter resources based on search and filters
  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          resource.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = !selectedCourse || resource.course === selectedCourse;
    const matchesType = !selectedType || resource.type === selectedType;
    
    return matchesSearch && matchesCourse && matchesType;
  });
  
  const handleDownload = (resource: typeof resources[0]) => {
    // In a real app, this would download the file
    // For now, just show a toast
    toast({
      title: "Download Started",
      description: `${resource.title} is being downloaded.`,
    });
  };
  
  const clearFilters = () => {
    setSelectedCourse(null);
    setSelectedType(null);
  };
  
  const handleAddResource = (newResource: Omit<typeof resources[0], "id">) => {
    addResource(newResource);
    setIsUploadDialogOpen(false);
  };
  
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <GradientText gradient="blue-purple" element="h1" className="text-3xl md:text-4xl font-bold mb-2">
          Knowledge Nebula
        </GradientText>
        <p className="text-gray-400">Access study materials and campus information</p>
      </header>
      
      <Tabs defaultValue="resources" className="w-full">
        <TabsList className="mb-6 bg-universe-card">
          <TabsTrigger value="resources" className="data-[state=active]:bg-universe-neonBlue data-[state=active]:text-white">
            Study Resources
          </TabsTrigger>
          <TabsTrigger value="campus" className="data-[state=active]:bg-universe-neonBlue data-[state=active]:text-white">
            Campus Info
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="resources" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-universe-dark border-universe-card focus:border-universe-neonBlue w-full"
              />
            </div>
            
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-universe-card">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-universe-card border-universe-neonBlue">
                  <div className="p-2">
                    <p className="text-xs text-gray-400 mb-1">Course</p>
                    <div className="grid grid-cols-2 gap-1 mb-3">
                      {courses.map((course) => (
                        <Button
                          key={course}
                          variant="outline"
                          size="sm"
                          className={cn(
                            "text-xs justify-start h-7",
                            selectedCourse === course
                              ? "bg-universe-neonBlue text-white border-universe-neonBlue"
                              : "border-universe-card"
                          )}
                          onClick={() => setSelectedCourse(selectedCourse === course ? null : course)}
                        >
                          {course}
                        </Button>
                      ))}
                    </div>
                    
                    <p className="text-xs text-gray-400 mb-1">Type</p>
                    <div className="flex gap-1 mb-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className={cn(
                          "text-xs justify-start h-7",
                          selectedType === "PDF"
                            ? "bg-universe-neonBlue text-white border-universe-neonBlue"
                            : "border-universe-card"
                        )}
                        onClick={() => setSelectedType(selectedType === "PDF" ? null : "PDF")}
                      >
                        <FileText className="w-3 h-3 mr-1" />
                        PDF
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className={cn(
                          "text-xs justify-start h-7",
                          selectedType === "PYQ"
                            ? "bg-universe-neonBlue text-white border-universe-neonBlue"
                            : "border-universe-card"
                        )}
                        onClick={() => setSelectedType(selectedType === "PYQ" ? null : "PYQ")}
                      >
                        <FileQuestion className="w-3 h-3 mr-1" />
                        PYQ
                      </Button>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-xs"
                      onClick={clearFilters}
                    >
                      Clear filters
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                <DialogTrigger asChild>
                  <GradientButton gradient="blue" className="whitespace-nowrap">
                    <Plus className="w-4 h-4 mr-2" /> 
                    Add Resource
                  </GradientButton>
                </DialogTrigger>
                <ResourceUploader 
                  onUpload={handleAddResource}
                  onCancel={() => setIsUploadDialogOpen(false)}
                />
              </Dialog>
            </div>
          </div>
          
          {filteredResources.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-gray-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No resources found</h3>
              <p className="text-gray-400 mb-6">
                {searchTerm || selectedCourse || selectedType
                  ? "Try changing your search or filters"
                  : "Upload study materials to get started"}
              </p>
              {!searchTerm && !selectedCourse && !selectedType && (
                <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                  <DialogTrigger asChild>
                    <GradientButton gradient="blue">
                      <Plus className="w-4 h-4 mr-2" />
                      Add First Resource
                    </GradientButton>
                  </DialogTrigger>
                  <ResourceUploader 
                    onUpload={handleAddResource}
                    onCancel={() => setIsUploadDialogOpen(false)}
                  />
                </Dialog>
              )}
            </div>
          ) : (
            <GlowingCard gradient="blue" className="overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-universe-card hover:bg-transparent">
                      <TableHead className="w-1/3">Title</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Upload Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredResources.map((resource) => (
                      <TableRow key={resource.id} className="border-universe-card hover:bg-universe-dark">
                        <TableCell className="font-medium">{resource.title}</TableCell>
                        <TableCell>{resource.course}</TableCell>
                        <TableCell>
                          <span className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                            resource.type === "PDF" 
                              ? "bg-blue-500 bg-opacity-20 text-blue-400" 
                              : "bg-amber-500 bg-opacity-20 text-amber-400"
                          )}>
                            {resource.type === "PDF" ? (
                              <FileText className="w-3 h-3 mr-1" />
                            ) : (
                              <FileQuestion className="w-3 h-3 mr-1" />
                            )}
                            {resource.type}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-gray-400">
                            <Calendar className="w-3 h-3 mr-1" />
                            <span>{format(new Date(resource.uploadDate), "MMM d, yyyy")}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDownload(resource)}
                            className="text-gray-400 hover:text-white hover:bg-universe-card"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </GlowingCard>
          )}
        </TabsContent>
        
        <TabsContent value="campus" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlowingCard gradient="blue" className="p-6">
              <div className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Coffee className="mr-2 text-universe-neonBlue" />
                  Cafe Menu
                </h3>
                
                <div className="space-y-3">
                  {campusInfo.menu.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span>{item.item}</span>
                      <span className="font-semibold">₹{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlowingCard>
            
            <GlowingCard gradient="purple" className="p-6">
              <div className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Store className="mr-2 text-universe-neonGreen" />
                  Shop Hours
                </h3>
                
                <div className="space-y-3">
                  {campusInfo.shopHours.map((shop, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span>{shop.name}</span>
                      <div className="flex items-center text-gray-400">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{shop.hours}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </GlowingCard>
            
            <GlowingCard gradient="purple" className="p-6">
              <div className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <PenLine className="mr-2 text-universe-neonPurple" />
                  Stationery Stock
                </h3>
                
                <div className="space-y-3">
                  {campusInfo.stationeryStock.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span>{item.item}</span>
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "text-xs px-2 py-0.5 rounded-full",
                          item.available > 20
                            ? "bg-green-500 bg-opacity-20 text-green-400"
                            : item.available > 10
                            ? "bg-yellow-500 bg-opacity-20 text-yellow-400"
                            : "bg-red-500 bg-opacity-20 text-red-400"
                        )}>
                          {item.available > 20 
                            ? "In stock" 
                            : item.available > 10 
                            ? "Limited" 
                            : "Low stock"}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full text-gray-400 hover:text-white hover:bg-universe-card"
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </GlowingCard>
          </div>
          
          <GlowingCard gradient="blue-purple" className="p-6">
            <div className="p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <Grid3X3 className="mr-2 text-universe-neonBlue" />
                Campus Map
              </h3>
              
              <div className="aspect-video bg-universe-dark rounded-lg flex items-center justify-center">
                <p className="text-gray-400">Interactive campus map coming soon</p>
              </div>
            </div>
          </GlowingCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KnowledgeNebula;


import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X, FileUp, FileText, File } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Resource } from '@/contexts/UniverseContext';

interface ResourceUploaderProps {
  onUpload: (resource: Omit<Resource, 'id'>) => void;
  onCancel: () => void;
}

const ResourceUploader: React.FC<ResourceUploaderProps> = ({ onUpload, onCancel }) => {
  const { toast } = useToast();
  
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [type, setType] = useState<'PDF' | 'PYQ'>('PDF');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const courses = [
    'Mathematics', 'Physics', 'Chemistry', 'Computer Science', 
    'English', 'History', 'Biology', 'Economics'
  ];
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };
  
  const handleFileSelect = (file: File) => {
    // Check file type - only allow PDF files
    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      toast({
        title: "Invalid file type",
        description: "Please select a PDF file",
        variant: "destructive",
      });
      return;
    }
    
    // Check file size - limit to 10MB
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "File size should be less than 10MB",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedFile(file);
    
    // Extract title from filename if no title is set
    if (!title) {
      const fileName = file.name.replace(/\.[^/.]+$/, ""); // Remove extension
      setTitle(fileName);
    }
  };
  
  const handleRemoveFile = () => {
    setSelectedFile(null);
  };
  
  const handleUpload = async () => {
    if (!title || !course || !selectedFile) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields and select a file",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      // In a real app, we would upload the file to storage
      // For now, we'll just simulate it with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a URL for the file (in a real app, this would be the storage URL)
      const url = URL.createObjectURL(selectedFile);
      
      // Create the resource object
      const newResource: Omit<Resource, 'id'> = {
        title,
        course,
        uploadDate: new Date(),
        type,
        url
      };
      
      // Call the onUpload callback
      onUpload(newResource);
      
      toast({
        title: "Resource uploaded",
        description: `${title} has been uploaded successfully`,
      });
    } catch (error) {
      console.error("Error uploading resource:", error);
      toast({
        title: "Upload failed",
        description: "An error occurred while uploading the resource",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <DialogContent className="bg-universe-card border-universe-neonPurple">
      <DialogHeader>
        <DialogTitle>Upload Resource</DialogTitle>
        <DialogDescription>
          Share study materials with your classmates
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Resource title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-universe-dark border-universe-card"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="course">Course</Label>
          <Select value={course} onValueChange={setCourse}>
            <SelectTrigger className="bg-universe-dark border-universe-card">
              <SelectValue placeholder="Select a course" />
            </SelectTrigger>
            <SelectContent>
              {courses.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select value={type} onValueChange={(val: 'PDF' | 'PYQ') => setType(val)}>
            <SelectTrigger className="bg-universe-dark border-universe-card">
              <SelectValue placeholder="Select resource type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PDF">PDF Document</SelectItem>
              <SelectItem value="PYQ">Previous Year Question</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Upload File</Label>
          
          {!selectedFile ? (
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
                isDragging 
                  ? "border-universe-neonPurple bg-universe-neonPurple bg-opacity-5" 
                  : "border-universe-card hover:border-universe-neonPurple"
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <FileUp className="mx-auto h-10 w-10 text-gray-400 mb-3" />
              <p className="text-sm text-gray-400">
                Drag & drop your file here or click to browse
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Supports PDF files (Max 10MB)
              </p>
              <Input
                id="file-upload"
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={handleFileInputChange}
              />
            </div>
          ) : (
            <div className="border rounded-lg p-4 bg-universe-dark border-universe-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-universe-neonPurple bg-opacity-20 flex items-center justify-center">
                    {type === 'PDF' ? (
                      <FileText className="w-5 h-5 text-universe-neonPurple" />
                    ) : (
                      <File className="w-5 h-5 text-universe-neonPurple" />
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium truncate max-w-[180px]">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleRemoveFile}
                  className="text-gray-400 hover:text-white hover:bg-universe-card"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <DialogFooter className="sm:justify-between">
        <Button
          variant="outline"
          onClick={onCancel}
          className="border-universe-card"
        >
          Cancel
        </Button>
        <Button
          onClick={handleUpload}
          disabled={!title || !course || !selectedFile || isUploading}
          className={cn(
            "bg-universe-neonPurple hover:bg-universe-neonPurple/80",
            isUploading && "opacity-50 cursor-not-allowed"
          )}
        >
          {isUploading ? "Uploading..." : "Upload Resource"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default ResourceUploader;


import { useState, useEffect } from 'react';
import { useUniverse, Assignment } from '@/contexts/UniverseContext';
import { useToast } from '@/hooks/use-toast';

export const useAssignments = () => {
  const { assignments, addAssignment, updateAssignment, deleteAssignment } = useUniverse();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const toggleCompletionStatus = (id: string, currentStatus: boolean) => {
    setLoading(true);
    try {
      updateAssignment(id, { completed: !currentStatus });
      
      toast({
        title: !currentStatus ? "Assignment completed" : "Assignment marked as incomplete",
        description: !currentStatus 
          ? "Great job on completing your assignment!" 
          : "Assignment has been marked as incomplete",
      });
    } catch (error) {
      console.error("Error toggling assignment status:", error);
      toast({
        title: "Operation failed",
        description: "Failed to update assignment status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createAssignment = (assignmentData: Omit<Assignment, 'id'>) => {
    setLoading(true);
    try {
      addAssignment(assignmentData);
      
      toast({
        title: "Assignment added",
        description: "New assignment has been added successfully",
      });
      
      return true;
    } catch (error) {
      console.error("Error creating assignment:", error);
      toast({
        title: "Operation failed",
        description: "Failed to add assignment. Please try again.",
        variant: "destructive",
      });
      
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeAssignment = (id: string) => {
    setLoading(true);
    try {
      deleteAssignment(id);
      
      toast({
        title: "Assignment deleted",
        description: "Assignment has been deleted successfully",
      });
      
      return true;
    } catch (error) {
      console.error("Error deleting assignment:", error);
      toast({
        title: "Operation failed",
        description: "Failed to delete assignment. Please try again.",
        variant: "destructive",
      });
      
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    assignments,
    loading,
    toggleCompletionStatus,
    createAssignment,
    removeAssignment,
    completedAssignments: assignments.filter(a => a.completed),
    pendingAssignments: assignments.filter(a => !a.completed)
  };
};

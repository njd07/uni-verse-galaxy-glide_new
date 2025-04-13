
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Types
type Priority = "High" | "Medium" | "Low";

export interface Assignment {
  id: string;
  title: string;
  dueDate: Date;
  priority: Priority;
  completed: boolean;
  description?: string;
  course?: string;
}

export interface Event {
  id: string;
  title: string;
  date: Date;
  isExam?: boolean;
  description?: string;
  course?: string;
  slot?: string;
  faculty?: string;
}

export interface ClassEvent {
  id: string;
  course: string;
  day: string;
  time: string;
  slot: string;
  faculty: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

export interface GroupChat {
  id: string;
  name: string;
  members: string[];
  messages: ChatMessage[];
}

export interface CommunityPost {
  id: string;
  userId: string;
  title: string;
  category: string;
  content: string;
  image?: string;
  likes: string[];
  comments: { id: string; userId: string; content: string; timestamp: Date }[];
  timestamp: Date;
}

export interface Friend {
  id: string;
  name: string;
  profilePicture?: string;
  status: "pending" | "accepted" | "declined";
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: Date;
  isRead: boolean;
  type: "assignment" | "exam" | "event" | "message" | "friend";
  relatedId?: string;
}

export interface Transaction {
  id: string;
  amount: number;
  shop: string;
  category: string;
  date: Date;
  type: "expense" | "topup";
}

export interface User {
  id: string;
  name: string;
  studentId: string;
  profilePicture?: string;
  assignmentsCompleted: number;
  eventsAttended: number;
  email: string;
}

export interface Resource {
  id: string;
  title: string;
  course: string;
  uploadDate: Date;
  type: "PDF" | "PYQ";
  url: string;
}

export interface CampusInfo {
  menu: { item: string; price: number }[];
  shopHours: { name: string; hours: string }[];
  stationeryStock: { item: string; available: number }[];
}

export interface Wallet {
  balance: number;
  savingsGoal: number;
  savedAmount: number;
  budget: {
    monthly: number;
    categories: {
      [key: string]: number;
    };
  };
}

export interface UniverseContextType {
  // User
  currentUser: User;
  updateUser: (user: Partial<User>) => void;
  
  // StudySphere
  events: Event[];
  addEvent: (event: Omit<Event, "id">) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  
  classes: ClassEvent[];
  addClassEvent: (classEvent: Omit<ClassEvent, "id">) => void;
  updateClassEvent: (id: string, classEvent: Partial<ClassEvent>) => void;
  deleteClassEvent: (id: string) => void;
  
  assignments: Assignment[];
  addAssignment: (assignment: Omit<Assignment, "id">) => void;
  updateAssignment: (id: string, assignment: Partial<Assignment>) => void;
  deleteAssignment: (id: string) => void;
  
  // Chat & Social
  groupChats: GroupChat[];
  addMessageToGroupChat: (groupId: string, message: Omit<ChatMessage, "id">) => void;
  createGroupChat: (groupChat: Omit<GroupChat, "id">) => void;
  
  friends: Friend[];
  addFriend: (friend: Omit<Friend, "id">) => void;
  updateFriendStatus: (id: string, status: Friend["status"]) => void;
  
  messages: ChatMessage[];
  addMessage: (message: Omit<ChatMessage, "id">) => void;
  markMessageAsRead: (id: string) => void;
  
  // SpendStar
  wallet: Wallet;
  updateWallet: (wallet: Partial<Wallet>) => void;
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  
  transactions: Transaction[];
  
  // StarConnect
  communityPosts: CommunityPost[];
  addCommunityPost: (post: Omit<CommunityPost, "id" | "likes" | "comments" | "timestamp">) => void;
  likePost: (postId: string, userId: string) => void;
  unlikePost: (postId: string, userId: string) => void;
  addCommentToPost: (postId: string, comment: { userId: string; content: string }) => void;
  
  // KnowledgeNebula
  resources: Resource[];
  addResource: (resource: Omit<Resource, "id">) => void;
  
  campusInfo: CampusInfo;
  updateCampusInfo: (info: Partial<CampusInfo>) => void;
  
  // Notifications
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, "id">) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  
  // UI State
  selectedChat: string | null;
  setSelectedChat: (chatId: string | null) => void;
  
  isNotificationOpen: boolean;
  setIsNotificationOpen: (isOpen: boolean) => void;
  
  isInboxOpen: boolean;
  setIsInboxOpen: (isOpen: boolean) => void;
  
  mood: "Happy" | "Stressed" | "Tired" | null;
  setMood: (mood: "Happy" | "Stressed" | "Tired" | null) => void;
  
  motivationalQuote: string;
  setMotivationalQuote: (quote: string) => void;
}

// Create context
const UniverseContext = createContext<UniverseContextType | null>(null);

// Create provider component
export const UniverseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // User state
  const [currentUser, setCurrentUser] = useState<User>({
    id: "user1",
    name: "Alex Smith",
    studentId: "ST12345",
    profilePicture: "https://i.pravatar.cc/300",
    assignmentsCompleted: 5,
    eventsAttended: 3,
    email: "alex.smith@university.edu"
  });
  
  // StudySphere state
  const [events, setEvents] = useState<Event[]>([
    {
      id: "event1",
      title: "Calculus Final Exam",
      date: new Date(2025, 3, 20, 10, 0),
      isExam: true,
      description: "Covers chapters 1-8",
      course: "MATH 101"
    },
    {
      id: "event2",
      title: "Physics Lab",
      date: new Date(2025, 3, 15, 14, 0),
      description: "Optics experiment",
      course: "PHYS 102"
    },
    {
      id: "event3",
      title: "Group Project Meeting",
      date: new Date(2025, 3, 17, 16, 0),
      description: "Discuss project timeline",
      course: "ENG 201"
    }
  ]);
  
  const [classes, setClasses] = useState<ClassEvent[]>([
    {
      id: "class1",
      course: "Mathematics",
      day: "Monday",
      time: "09:00",
      slot: "A1",
      faculty: "Dr. Johnson"
    },
    {
      id: "class2",
      course: "Physics",
      day: "Tuesday",
      time: "11:00",
      slot: "B2",
      faculty: "Prof. Richards"
    },
    {
      id: "class3",
      course: "Computer Science",
      day: "Wednesday",
      time: "14:00",
      slot: "C3",
      faculty: "Dr. Park"
    },
    {
      id: "class4",
      course: "English",
      day: "Thursday",
      time: "10:00",
      slot: "D1",
      faculty: "Prof. Williams"
    },
    {
      id: "class5",
      course: "Chemistry",
      day: "Friday",
      time: "13:00",
      slot: "E2",
      faculty: "Dr. Miller"
    }
  ]);
  
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: "assignment1",
      title: "Calculus Problem Set",
      dueDate: new Date(2025, 3, 18),
      priority: "High",
      completed: false,
      course: "MATH 101"
    },
    {
      id: "assignment2",
      title: "Physics Lab Report",
      dueDate: new Date(2025, 3, 22),
      priority: "Medium",
      completed: false,
      course: "PHYS 102"
    },
    {
      id: "assignment3",
      title: "English Essay",
      dueDate: new Date(2025, 3, 25),
      priority: "Low",
      completed: false,
      course: "ENG 201"
    }
  ]);
  
  // Chat & Social state
  const [groupChats, setGroupChats] = useState<GroupChat[]>([
    {
      id: "groupchat1",
      name: "Mathematics A1",
      members: ["user1", "user2", "user3"],
      messages: [
        {
          id: "msg1",
          senderId: "user2",
          receiverId: "groupchat1",
          content: "Hey, is there a quiz tomorrow?",
          timestamp: new Date(2025, 3, 12, 15, 30),
          isRead: true
        },
        {
          id: "msg2",
          senderId: "user3",
          receiverId: "groupchat1",
          content: "Yes, on chapters 3-4",
          timestamp: new Date(2025, 3, 12, 15, 32),
          isRead: true
        }
      ]
    },
    {
      id: "groupchat2",
      name: "Physics B2",
      members: ["user1", "user4", "user5"],
      messages: [
        {
          id: "msg3",
          senderId: "user4",
          receiverId: "groupchat2",
          content: "Did anyone understand today's lecture?",
          timestamp: new Date(2025, 3, 12, 16, 10),
          isRead: true
        },
        {
          id: "msg4",
          senderId: "user1",
          receiverId: "groupchat2",
          content: "I can help explain it if you want",
          timestamp: new Date(2025, 3, 12, 16, 15),
          isRead: true
        }
      ]
    },
    {
      id: "groupchat3",
      name: "Computer Science C3",
      members: ["user1", "user6", "user7"],
      messages: [
        {
          id: "msg5",
          senderId: "user6",
          receiverId: "groupchat3",
          content: "Who's doing the project together?",
          timestamp: new Date(2025, 3, 13, 10, 5),
          isRead: false
        }
      ]
    }
  ]);
  
  const [friends, setFriends] = useState<Friend[]>([
    {
      id: "user2",
      name: "Jamie Lee",
      profilePicture: "https://i.pravatar.cc/300?img=2",
      status: "accepted"
    },
    {
      id: "user3",
      name: "Taylor Wong",
      profilePicture: "https://i.pravatar.cc/300?img=3",
      status: "accepted"
    },
    {
      id: "user4",
      name: "Jordan Smith",
      profilePicture: "https://i.pravatar.cc/300?img=4",
      status: "pending"
    }
  ]);
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "dmsg1",
      senderId: "user2",
      receiverId: "user1",
      content: "Hey, let's study together for the exam?",
      timestamp: new Date(2025, 3, 13, 14, 25),
      isRead: false
    },
    {
      id: "dmsg2",
      senderId: "user3",
      receiverId: "user1",
      content: "Did you get the notes from yesterday?",
      timestamp: new Date(2025, 3, 13, 9, 10),
      isRead: true
    }
  ]);
  
  // SpendStar state
  const [wallet, setWallet] = useState<Wallet>({
    balance: 500,
    savingsGoal: 5000,
    savedAmount: 1000,
    budget: {
      monthly: 2000,
      categories: {
        Food: 800,
        Stationery: 400,
        Entertainment: 500,
        Others: 300
      }
    }
  });
  
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "trans1",
      amount: 50,
      shop: "Cafe",
      category: "Food",
      date: new Date(2025, 3, 12),
      type: "expense"
    },
    {
      id: "trans2",
      amount: 30,
      shop: "Bookstore",
      category: "Stationery",
      date: new Date(2025, 3, 11),
      type: "expense"
    },
    {
      id: "trans3",
      amount: 100,
      shop: "Movie Theater",
      category: "Entertainment",
      date: new Date(2025, 3, 10),
      type: "expense"
    },
    {
      id: "trans4",
      amount: 200,
      shop: "UPI Transfer",
      category: "Topup",
      date: new Date(2025, 3, 9),
      type: "topup"
    }
  ]);
  
  // StarConnect state
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([
    {
      id: "post1",
      userId: "user3",
      title: "My AI Art",
      category: "Art",
      content: "Created this using the new AI tool in the lab",
      image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWklMjBhcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      likes: ["user2", "user4", "user5", "user6", "user7"],
      comments: [
        {
          id: "comment1",
          userId: "user2",
          content: "This looks amazing!",
          timestamp: new Date(2025, 3, 11, 15, 30)
        },
        {
          id: "comment2",
          userId: "user4",
          content: "What tool did you use?",
          timestamp: new Date(2025, 3, 11, 16, 5)
        }
      ],
      timestamp: new Date(2025, 3, 11, 14, 0)
    },
    {
      id: "post2",
      userId: "user4",
      title: "Robotics Club Project",
      category: "Tech",
      content: "Our team built this autonomous robot for the competition",
      image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cm9ib3RpY3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      likes: ["user1", "user5", "user7"],
      comments: [
        {
          id: "comment3",
          userId: "user1",
          content: "This is so cool!",
          timestamp: new Date(2025, 3, 12, 10, 15)
        }
      ],
      timestamp: new Date(2025, 3, 12, 9, 0)
    },
    {
      id: "post3",
      userId: "user5",
      title: "Campus Band Performance",
      category: "Music",
      content: "We'll be performing this Friday at the Student Center",
      image: "https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFuZCUyMHBlcmZvcm1hbmNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      likes: ["user2", "user3", "user6"],
      comments: [],
      timestamp: new Date(2025, 3, 13, 11, 30)
    }
  ]);
  
  // KnowledgeNebula state
  const [resources, setResources] = useState<Resource[]>([
    {
      id: "resource1",
      title: "Calculus Formulas",
      course: "MATH 101",
      uploadDate: new Date(2025, 3, 5),
      type: "PDF",
      url: "#"
    },
    {
      id: "resource2",
      title: "Physics Previous Year Questions",
      course: "PHYS 102",
      uploadDate: new Date(2025, 3, 8),
      type: "PYQ",
      url: "#"
    },
    {
      id: "resource3",
      title: "Programming Basics",
      course: "CS 101",
      uploadDate: new Date(2025, 3, 10),
      type: "PDF",
      url: "#"
    }
  ]);
  
  const [campusInfo, setCampusInfo] = useState<CampusInfo>({
    menu: [
      { item: "Burger", price: 50 },
      { item: "Pizza", price: 80 },
      { item: "Sandwich", price: 40 },
      { item: "Coffee", price: 30 },
      { item: "Tea", price: 20 }
    ],
    shopHours: [
      { name: "Cafe", hours: "8 AM - 8 PM" },
      { name: "Bookstore", hours: "9 AM - 6 PM" },
      { name: "Library", hours: "7 AM - 11 PM" },
      { name: "Gym", hours: "6 AM - 10 PM" }
    ],
    stationeryStock: [
      { item: "Pens", available: 50 },
      { item: "Notebooks", available: 30 },
      { item: "Markers", available: 25 },
      { item: "Calculators", available: 10 }
    ]
  });
  
  // Notification state
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "notif1",
      title: "Exam Reminder",
      message: "Calculus Final Exam tomorrow at 10 AM",
      date: new Date(2025, 3, 19, 9, 0),
      isRead: false,
      type: "exam",
      relatedId: "event1"
    },
    {
      id: "notif2",
      title: "Assignment Due",
      message: "Physics Lab Report due in 2 days",
      date: new Date(2025, 3, 20, 10, 0),
      isRead: false,
      type: "assignment",
      relatedId: "assignment2"
    },
    {
      id: "notif3",
      title: "New Message",
      message: "Jamie Lee: Hey, let's study together for the exam?",
      date: new Date(2025, 3, 13, 14, 25),
      isRead: false,
      type: "message",
      relatedId: "dmsg1"
    },
    {
      id: "notif4",
      title: "Friend Request",
      message: "Jordan Smith sent you a friend request",
      date: new Date(2025, 3, 12, 15, 0),
      isRead: true,
      type: "friend",
      relatedId: "user4"
    },
    {
      id: "notif5",
      title: "Event Tomorrow",
      message: "Physics Lab tomorrow at 2 PM",
      date: new Date(2025, 3, 14, 10, 0),
      isRead: false,
      type: "event",
      relatedId: "event2"
    }
  ]);
  
  // UI state
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [mood, setMood] = useState<"Happy" | "Stressed" | "Tired" | null>(null);
  const [motivationalQuote, setMotivationalQuote] = useState<string>("Believe you can and you're halfway there.");
  
  // Methods
  const updateUser = (user: Partial<User>) => {
    setCurrentUser(prev => ({ ...prev, ...user }));
  };
  
  // StudySphere methods
  const addEvent = (event: Omit<Event, "id">) => {
    const newEvent = { ...event, id: `event${events.length + 1}` };
    setEvents(prev => [...prev, newEvent]);
    
    // Add notification for exam
    if (event.isExam) {
      addNotification({
        title: "New Exam Added",
        message: `${event.title} on ${event.date.toLocaleDateString()}`,
        date: new Date(),
        isRead: false,
        type: "exam",
        relatedId: newEvent.id
      });
    }
  };
  
  const updateEvent = (id: string, event: Partial<Event>) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...event } : e));
  };
  
  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    // Remove related notifications
    setNotifications(prev => prev.filter(n => n.relatedId !== id));
  };
  
  const addClassEvent = (classEvent: Omit<ClassEvent, "id">) => {
    const newClassEvent = { ...classEvent, id: `class${classes.length + 1}` };
    setClasses(prev => [...prev, newClassEvent]);
  };
  
  const updateClassEvent = (id: string, classEvent: Partial<ClassEvent>) => {
    setClasses(prev => prev.map(c => c.id === id ? { ...c, ...classEvent } : c));
  };
  
  const deleteClassEvent = (id: string) => {
    setClasses(prev => prev.filter(c => c.id !== id));
  };
  
  const addAssignment = (assignment: Omit<Assignment, "id">) => {
    const newAssignment = { ...assignment, id: `assignment${assignments.length + 1}` };
    setAssignments(prev => [...prev, newAssignment]);
    
    // Add notification
    addNotification({
      title: "New Assignment",
      message: `${assignment.title} due on ${assignment.dueDate.toLocaleDateString()}`,
      date: new Date(),
      isRead: false,
      type: "assignment",
      relatedId: newAssignment.id
    });
  };
  
  const updateAssignment = (id: string, assignment: Partial<Assignment>) => {
    setAssignments(prev => prev.map(a => a.id === id ? { ...a, ...assignment } : a));
    
    // If completed, update user stats
    if (assignment.completed) {
      setCurrentUser(prev => ({
        ...prev,
        assignmentsCompleted: prev.assignmentsCompleted + 1
      }));
    }
  };
  
  const deleteAssignment = (id: string) => {
    setAssignments(prev => prev.filter(a => a.id !== id));
    // Remove related notifications
    setNotifications(prev => prev.filter(n => n.relatedId !== id));
  };
  
  // Chat & Social methods
  const addMessageToGroupChat = (groupId: string, message: Omit<ChatMessage, "id">) => {
    const newMessage = { ...message, id: `msg${Math.random().toString(36).substr(2, 9)}` };
    setGroupChats(prev => prev.map(chat => {
      if (chat.id === groupId) {
        return { ...chat, messages: [...chat.messages, newMessage] };
      }
      return chat;
    }));
  };
  
  const createGroupChat = (groupChat: Omit<GroupChat, "id">) => {
    const newGroupChat = { ...groupChat, id: `groupchat${groupChats.length + 1}` };
    setGroupChats(prev => [...prev, newGroupChat]);
  };
  
  const addFriend = (friend: Omit<Friend, "id">) => {
    const newFriend = { ...friend, id: `user${friends.length + 10}` };
    setFriends(prev => [...prev, newFriend]);
  };
  
  const updateFriendStatus = (id: string, status: Friend["status"]) => {
    setFriends(prev => prev.map(f => f.id === id ? { ...f, status } : f));
  };
  
  const addMessage = (message: Omit<ChatMessage, "id">) => {
    const newMessage = { ...message, id: `dmsg${messages.length + 1}` };
    setMessages(prev => [...prev, newMessage]);
    
    // Add notification if user is receiving the message
    if (message.receiverId === currentUser.id) {
      const sender = friends.find(f => f.id === message.senderId);
      addNotification({
        title: "New Message",
        message: `${sender?.name || 'Someone'}: ${message.content.substring(0, 30)}${message.content.length > 30 ? '...' : ''}`,
        date: new Date(),
        isRead: false,
        type: "message",
        relatedId: newMessage.id
      });
    }
  };
  
  const markMessageAsRead = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, isRead: true } : m));
    // Mark related notification as read
    setNotifications(prev => prev.map(n => n.relatedId === id ? { ...n, isRead: true } : n));
  };
  
  // SpendStar methods
  const updateWallet = (walletUpdate: Partial<Wallet>) => {
    setWallet(prev => ({ ...prev, ...walletUpdate }));
  };
  
  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction = { ...transaction, id: `trans${transactions.length + 1}` };
    setTransactions(prev => [newTransaction, ...prev]);
    
    // Update wallet balance
    if (transaction.type === "expense") {
      setWallet(prev => ({ ...prev, balance: prev.balance - transaction.amount }));
    } else {
      setWallet(prev => ({ ...prev, balance: prev.balance + transaction.amount }));
    }
  };
  
  // StarConnect methods
  const addCommunityPost = (post: Omit<CommunityPost, "id" | "likes" | "comments" | "timestamp">) => {
    const newPost = {
      ...post,
      id: `post${communityPosts.length + 1}`,
      likes: [],
      comments: [],
      timestamp: new Date()
    };
    setCommunityPosts(prev => [newPost, ...prev]);
  };
  
  const likePost = (postId: string, userId: string) => {
    setCommunityPosts(prev => prev.map(post => {
      if (post.id === postId && !post.likes.includes(userId)) {
        return { ...post, likes: [...post.likes, userId] };
      }
      return post;
    }));
  };
  
  const unlikePost = (postId: string, userId: string) => {
    setCommunityPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes.filter(id => id !== userId) };
      }
      return post;
    }));
  };
  
  const addCommentToPost = (postId: string, comment: { userId: string; content: string }) => {
    setCommunityPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: `comment${Math.random().toString(36).substr(2, 9)}`,
          userId: comment.userId,
          content: comment.content,
          timestamp: new Date()
        };
        return { ...post, comments: [...post.comments, newComment] };
      }
      return post;
    }));
  };
  
  // KnowledgeNebula methods
  const addResource = (resource: Omit<Resource, "id">) => {
    const newResource = { ...resource, id: `resource${resources.length + 1}` };
    setResources(prev => [...prev, newResource]);
  };
  
  const updateCampusInfo = (info: Partial<CampusInfo>) => {
    setCampusInfo(prev => ({ ...prev, ...info }));
  };
  
  // Notification methods
  const addNotification = (notification: Omit<Notification, "id">) => {
    const newNotification = { ...notification, id: `notif${notifications.length + 1}` };
    setNotifications(prev => [newNotification, ...prev]);
  };
  
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };
  
  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };
  
  // Provide context value
  const contextValue: UniverseContextType = {
    currentUser,
    updateUser,
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    classes,
    addClassEvent,
    updateClassEvent,
    deleteClassEvent,
    assignments,
    addAssignment,
    updateAssignment,
    deleteAssignment,
    groupChats,
    addMessageToGroupChat,
    createGroupChat,
    friends,
    addFriend,
    updateFriendStatus,
    messages,
    addMessage,
    markMessageAsRead,
    wallet,
    updateWallet,
    addTransaction,
    transactions,
    communityPosts,
    addCommunityPost,
    likePost,
    unlikePost,
    addCommentToPost,
    resources,
    addResource,
    campusInfo,
    updateCampusInfo,
    notifications,
    addNotification,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    selectedChat,
    setSelectedChat,
    isNotificationOpen,
    setIsNotificationOpen,
    isInboxOpen,
    setIsInboxOpen,
    mood,
    setMood,
    motivationalQuote,
    setMotivationalQuote
  };
  
  return (
    <UniverseContext.Provider value={contextValue}>
      {children}
    </UniverseContext.Provider>
  );
};

// Create hook for using context
export const useUniverse = () => {
  const context = useContext(UniverseContext);
  if (!context) {
    throw new Error("useUniverse must be used within a UniverseProvider");
  }
  return context;
};

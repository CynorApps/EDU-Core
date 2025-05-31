import {
  Home,
  UserPlus,
  School,
  GraduationCap,
  FileBarChart,
  ClipboardList,
  CalendarDays,
  Banknote,
  LibraryBig,
  BedDouble,
  Bus,
  FileText,
  Settings,
} from "lucide-react";

import ProfileImage from "@/assets/profile-image.jpg";
import StudentImage from "@/assets/product-image.jpg"; // <-- Use a school/student image here
import BookImage from "@/assets/profile-image.jpg"; // <-- Use a library/book image here

export const navbarLinks = [
  {
    title: "",
    links: [
      {
        label: "Dashboard",
        icon: Home,
        path: "/dashboard",
      },
      {
        label: "Admission Management",
        icon: UserPlus,
        path: "/admission",
      },
      {
        label: "Class",
        icon: School,
        path: "/class",
      },
      {
        label: "Teachers",
        icon: GraduationCap,
        path: "/teachers",
      },
      {
        label: "Student Management",
        icon: FileBarChart,
        path: "/student-management",
      },
      {
        label: "Homework",
        icon: ClipboardList,
        path: "/homework",
      },
      {
        label: "Attendance",
        icon: CalendarDays,
        path: "/attendance",
      },
      {
        label: "Payment",
        icon: Banknote,
        path: "/payment",
      },
      {
        label: "Library",
        icon: LibraryBig,
        path: "/library",
      },
      {
        label: "Hostel",
        icon: BedDouble,
        path: "/hostel",
      },
      {
        label: "Transports",
        icon: Bus,
        path: "/transports",
      },
      {
        label: "Report",
        icon: FileText,
        path: "/report",
      },
      {
        label: "Settings",
        icon: Settings,
        path: "/settings",
      },
    ],
  },
];

// Example: Monthly student admissions for the year
export const overviewData = [
  { name: "Jan", total: 120 },
  { name: "Feb", total: 135 },
  { name: "Mar", total: 142 },
  { name: "Apr", total: 155 },
  { name: "May", total: 130 },
  { name: "Jun", total: 110 },
  { name: "Jul", total: 125 },
  { name: "Aug", total: 150 },
  { name: "Sep", total: 140 },
  { name: "Oct", total: 160 },
  { name: "Nov", total: 135 },
  { name: "Dec", total: 120 },
];

// Recent fee payments from students
export const recentSalesData = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav.sharma@school.com",
    image: ProfileImage,
    total: 15000, // Fee paid
  },
  {
    id: 2,
    name: "Priya Singh",
    email: "priya.singh@school.com",
    image: ProfileImage,
    total: 20000,
  },
  {
    id: 3,
    name: "Vivaan Patel",
    email: "vivaan.patel@school.com",
    image: ProfileImage,
    total: 18000,
  },
  {
    id: 4,
    name: "Siya Gupta",
    email: "siya.gupta@school.com",
    image: ProfileImage,
    total: 22000,
  },
  {
    id: 5,
    name: "Kabir Verma",
    email: "kabir.verma@school.com",
    image: ProfileImage,
    total: 16000,
  },
  {
    id: 6,
    name: "Anaya Mishra",
    email: "anaya.mishra@school.com",
    image: ProfileImage,
    total: 21000,
  },
  {
    id: 7,
    name: "Ishaan Mehta",
    email: "ishaan.mehta@school.com",
    image: ProfileImage,
    total: 19500,
  },
];

// Top performing students or classes
export const topProducts = [
  {
    number: 1,
    name: "Class 10A",
    image: StudentImage,
    description: "Highest overall academic performance in the school.",
    score: 98.2,
    status: "Active",
    rating: 4.9,
  },
  {
    number: 2,
    name: "Class 12B",
    image: StudentImage,
    description: "Outstanding board results and discipline.",
    score: 97.6,
    status: "Active",
    rating: 4.8,
  },
  {
    number: 3,
    name: "Science Club",
    image: BookImage,
    description: "Winners of the national science fair.",
    score: 96.5,
    status: "Active",
    rating: 4.7,
  },
  {
    number: 4,
    name: "Football Team",
    image: StudentImage,
    description: "Winners of inter-school football championship.",
    score: 95.0,
    status: "Active",
    rating: 4.7,
  },
  {
    number: 5,
    name: "Class 8C",
    image: StudentImage,
    description: "Best attendance and participation in events.",
    score: 94.3,
    status: "Active",
    rating: 4.6,
  },
  {
    number: 6,
    name: "Library",
    image: BookImage,
    description: "Most utilized resource with over 10,000 books.",
    score: 99.1,
    status: "Open",
    rating: 5.0,
  },
  {
    number: 7,
    name: "Art Club",
    image: BookImage,
    description: "Winners of state-level art competition.",
    score: 94.8,
    status: "Active",
    rating: 4.8,
  },
  {
    number: 8,
    name: "Music Band",
    image: StudentImage,
    description: "Winners of school music competition.",
    score: 93.5,
    status: "Active",
    rating: 4.5,
  },
  {
    number: 9,
    name: "Debate Team",
    image: StudentImage,
    description: "Champions of inter-school debate contest.",
    score: 96.0,
    status: "Active",
    rating: 4.8,
  },
  {
    number: 10,
    name: "Class 11D",
    image: StudentImage,
    description: "Excellent project work and discipline.",
    score: 93.9,
    status: "Active",
    rating: 4.6,
  },
];
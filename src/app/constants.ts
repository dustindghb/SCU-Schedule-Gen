// constants.ts
import { Requirement, CourseOption } from "./types";

export const QUARTER_NAMES = [
  "Fall 2024",
  "Winter 2025",
  "Spring 2025", 
  "Summer 2025",
  "Fall 2025",
  "Winter 2026",
  "Spring 2026",
  "Summer 2026",
  "Fall 2026",
  "Winter 2027",
  "Spring 2027",
  "Summer 2027"
];

export const REQUIREMENT_COURSE_OPTIONS: Record<string, CourseOption[]> = {
  "Core Programming": [
    { 
      code: "CSCI 10", 
      name: "Introduction to Computer Science", 
      credits: 4,
      availableQuarters: ["Fall", "Winter", "Spring"]
    },
    { 
      code: "COEN 11", 
      name: "Programming Fundamentals", 
      credits: 4,
      availableQuarters: ["Fall", "Winter", "Spring"]
    },
    { 
      code: "CS 106A", 
      name: "Programming Methodology", 
      credits: 5,
      availableQuarters: ["Fall", "Spring"]
    },
  ],
  "Data Structures": [
    { 
      code: "CSCI 61", 
      name: "Data Structures", 
      credits: 4,
      availableQuarters: ["Winter", "Spring"]
    },
    { 
      code: "CSCI 62", 
      name: "Advanced Programming", 
      credits: 4,
      availableQuarters: ["Fall", "Winter"]
    },
    { 
      code: "COEN 12", 
      name: "Abstract Data Types", 
      credits: 4,
      availableQuarters: ["Fall", "Winter", "Spring"]
    },
  ],
  "Calculus II": [
    { 
      code: "MATH 12", 
      name: "Calculus II", 
      credits: 4,
      availableQuarters: ["Fall", "Winter", "Spring"]
    },
    { 
      code: "MATH 13", 
      name: "Calculus III", 
      credits: 4,
      availableQuarters: ["Fall", "Winter", "Spring"]
    },
    { 
      code: "MATH 14", 
      name: "Differential Equations", 
      credits: 4,
      availableQuarters: ["Winter", "Spring"]
    },
  ],
  "Physics I": [
    { 
      code: "PHYS 31", 
      name: "Physics I", 
      credits: 4,
      availableQuarters: ["Fall", "Winter", "Spring"]
    },
    { 
      code: "PHYS 32", 
      name: "Physics II", 
      credits: 4,
      availableQuarters: ["Winter", "Spring"]
    },
    { 
      code: "PHYS 33", 
      name: "Physics III", 
      credits: 4,
      availableQuarters: ["Spring"]
    },
  ],
  "Technical Writing": [
    { 
      code: "ENGL 1A", 
      name: "Critical Thinking & Writing", 
      credits: 4,
      availableQuarters: ["Fall", "Winter", "Spring"]
    },
    { 
      code: "ENGL 2", 
      name: "Critical Reading & Writing", 
      credits: 4,
      availableQuarters: ["Fall", "Winter", "Spring"]
    },
    { 
      code: "COMM 12", 
      name: "Public Speaking", 
      credits: 4,
      availableQuarters: ["Fall", "Winter", "Spring", "Summer"]
    },
  ],
  "Ethics in Technology": [
    { 
      code: "PHIL 9", 
      name: "Ethics", 
      credits: 4,
      availableQuarters: ["Fall", "Winter", "Spring"]
    },
    { 
      code: "ENGR 10", 
      name: "Engineering Ethics", 
      credits: 1,
      availableQuarters: ["Fall", "Winter", "Spring"]
    },
    { 
      code: "PHIL 26", 
      name: "Technology and Society", 
      credits: 4,
      availableQuarters: ["Winter", "Spring"]
    },
  ],
  "default": [
    { 
      code: "ELECTIVE", 
      name: "General Elective", 
      credits: 4,
      availableQuarters: ["Fall", "Winter", "Spring", "Summer"]
    },
    { 
      code: "GE", 
      name: "General Education", 
      credits: 4,
      availableQuarters: ["Fall", "Winter", "Spring", "Summer"]
    },
  ]
};

export const INITIAL_REQUIREMENTS: Requirement[] = [
  {
    id: "1",
    name: "Introduction to Computer Science",
    status: "unsatisfied",
    isExpanded: false,
    courseOptions: REQUIREMENT_COURSE_OPTIONS["Core Programming"],
  },
  {
    id: "2", 
    name: "Data Structures",
    status: "unsatisfied",
    isExpanded: false,
    courseOptions: REQUIREMENT_COURSE_OPTIONS["Data Structures"],
  },
  {
    id: "3",
    name: "Calculus II",
    status: "unsatisfied", 
    isExpanded: false,
    courseOptions: REQUIREMENT_COURSE_OPTIONS["Calculus II"],
  },
  {
    id: "4",
    name: "Physics I",
    status: "unsatisfied",
    isExpanded: false,
    courseOptions: REQUIREMENT_COURSE_OPTIONS["Physics I"],
  },
  {
    id: "5",
    name: "Technical Writing",
    status: "unsatisfied",
    isExpanded: false,
    courseOptions: REQUIREMENT_COURSE_OPTIONS["Technical Writing"],
  },
  {
    id: "6",
    name: "Ethics in Technology", 
    status: "unsatisfied",
    isExpanded: false,
    courseOptions: REQUIREMENT_COURSE_OPTIONS["Ethics in Technology"],
  },
];
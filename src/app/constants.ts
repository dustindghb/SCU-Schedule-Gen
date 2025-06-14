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
      availableQuarters: ["Fall", "Winter", "Spring"],
      hoursPerWeek: 8,
      difficulty: 2,
      quality: 4.2,
      rating: 4.2
    },
    { 
      code: "COEN 11", 
      name: "Programming Fundamentals", 
      credits: 4,
      availableQuarters: ["Fall", "Winter", "Spring"],
      hoursPerWeek: 9,
      difficulty: 3,
      quality: 4.0,
      rating: 4.0
    },
    { 
      code: "CS 106A", 
      name: "Programming Methodology", 
      credits: 5,
      availableQuarters: ["Fall", "Spring"],
      hoursPerWeek: 10,
      difficulty: 3,
      quality: 4.5,
      rating: 4.5
    },
  ],
  "Data Structures": [
    { 
      code: "CSCI 61", 
      name: "Data Structures", 
      credits: 4,
      availableQuarters: ["Winter", "Spring"],
      hoursPerWeek: 12,
      difficulty: 4,
      quality: 4.1,
      rating: 4.1
    },
    { 
      code: "CSCI 62", 
      name: "Advanced Programming", 
      credits: 4,
      availableQuarters: ["Fall", "Winter"],
      hoursPerWeek: 11,
      difficulty: 4,
      quality: 3.9,
      rating: 3.9
    },
    { 
      code: "COEN 12", 
      name: "Abstract Data Types", 
      credits: 4,
      availableQuarters: ["Fall", "Winter", "Spring"],
      hoursPerWeek: 10,
      difficulty: 3,
      quality: 4.3,
      rating: 4.3
    },
  ],
  "Calculus II": [
    { 
      code: "MATH 12", 
      name: "Calculus II", 
      credits: 4,
      availableQuarters: ["Fall", "Winter", "Spring"],
      hoursPerWeek: 8,
      difficulty: 4,
      quality: 3.8,
      rating: 3.8
    },
    { 
      code: "MATH 13", 
      name: "Calculus III", 
      credits: 4,
      availableQuarters: ["Fall", "Winter", "Spring"],
      hoursPerWeek: 9,
      difficulty: 4,
      quality: 3.7,
      rating: 3.7
    },
    { 
      code: "MATH 14", 
      name: "Differential Equations", 
      credits: 4,
      availableQuarters: ["Winter", "Spring"],
      hoursPerWeek: 10,
      difficulty: 5,
      quality: 3.6,
      rating: 3.6
    },
  ],
  "Physics I": [
    { 
      code: "PHYS 31", 
      name: "Physics I", 
      credits: 4,
      availableQuarters: ["Fall", "Winter", "Spring"],
      hoursPerWeek: 9,
      difficulty: 3,
      quality: 3.9,
      rating: 3.9
    },
    { 
      code: "PHYS 32", 
      name: "Physics II", 
      credits: 4,
      availableQuarters: ["Winter", "Spring"],
      hoursPerWeek: 10,
      difficulty: 4,
      quality: 3.8,
      rating: 3.8
    },
    { 
      code: "PHYS 33", 
      name: "Physics III", 
      credits: 4,
      availableQuarters: ["Spring"],
      hoursPerWeek: 11,
      difficulty: 4,
      quality: 3.7,
      rating: 3.7
    },
  ],
  "Technical Writing": [
    { 
      code: "ENGL 1A", 
      name: "Critical Thinking & Writing", 
      credits: 4,
      availableQuarters: ["Fall", "Winter", "Spring"],
      hoursPerWeek: 6,
      difficulty: 2,
      quality: 4.0,
      rating: 4.0
    },
    { 
      code: "ENGL 2", 
      name: "Critical Reading & Writing", 
      credits: 4,
      availableQuarters: ["Fall", "Winter", "Spring"],
      hoursPerWeek: 7,
      difficulty: 2,
      quality: 3.9,
      rating: 3.9
    },
    { 
      code: "COMM 12", 
      name: "Public Speaking", 
      credits: 4,
      availableQuarters: ["Fall", "Winter", "Spring", "Summer"],
      hoursPerWeek: 5,
      difficulty: 1,
      quality: 4.3,
      rating: 4.3
    },
  ],
  "Ethics in Technology": [
    { 
      code: "PHIL 9", 
      name: "Ethics", 
      credits: 4,
      availableQuarters: ["Fall", "Winter", "Spring"],
      hoursPerWeek: 6,
      difficulty: 2,
      quality: 4.1,
      rating: 4.1
    },
    { 
      code: "ENGR 10", 
      name: "Engineering Ethics", 
      credits: 1,
      availableQuarters: ["Fall", "Winter", "Spring"],
      hoursPerWeek: 2,
      difficulty: 1,
      quality: 3.8,
      rating: 3.8
    },
    { 
      code: "PHIL 26", 
      name: "Technology and Society", 
      credits: 4,
      availableQuarters: ["Winter", "Spring"],
      hoursPerWeek: 7,
      difficulty: 3,
      quality: 4.0,
      rating: 4.0
    },
  ],
  "default": [
    { 
      code: "ELECTIVE", 
      name: "General Elective", 
      credits: 4,
      availableQuarters: ["Fall", "Winter", "Spring", "Summer"],
      hoursPerWeek: 6,
      difficulty: 2,
      quality: 3.5,
      rating: 3.5
    },
    { 
      code: "GE", 
      name: "General Education", 
      credits: 4,
      availableQuarters: ["Fall", "Winter", "Spring", "Summer"],
      hoursPerWeek: 5,
      difficulty: 2,
      quality: 3.7,
      rating: 3.7
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
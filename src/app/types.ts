// types.ts
export interface Course {
  id: string;
  name: string;
  professor: string;
  timeSlot: string;
  credits: number;
  requirementId?: string;
}

export interface Quarter {
  id: string;
  name: string;
  courses: Course[];
  isCurrent?: boolean;
}

export interface CourseOption {
  code: string;
  name: string;
  credits: number;
  availableQuarters?: string[];
  hoursPerWeek: number;
  difficulty: number;
  quality: number;
  rating: number;
  prerequisites?: string[];
}

export interface Requirement {
  id: string;
  name: string;
  status: "satisfied" | "unsatisfied";
  isExpanded: boolean;
  courseOptions: CourseOption[];
  selectedCourse?: string;
}

export interface DragResult {
  destination: {
    droppableId: string;
    index: number;
  } | null;
  source: {
    droppableId: string;
    index: number;
  };
  draggableId: string;
}
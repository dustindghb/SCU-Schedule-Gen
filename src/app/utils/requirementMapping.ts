import { CourseOption, Requirement } from "../types";
import { REQUIREMENT_COURSE_OPTIONS } from "../constants";

/**
 * Maps requirement names from academic transcripts to course option categories
 */
export const mapRequirementToCourseOptions = (requirementName: string): CourseOption[] => {
  const reqName = requirementName.toLowerCase();
  
  // Core Programming requirements
  if (reqName.includes('programming') || 
      reqName.includes('coen 11') || 
      reqName.includes('csci 10') ||
      reqName.includes('introduction to computer science') ||
      reqName.includes('programming fundamentals')) {
    return REQUIREMENT_COURSE_OPTIONS["Core Programming"] || [];
  }
  
  // Data Structures requirements
  if (reqName.includes('data structures') || 
      reqName.includes('coen 12') || 
      reqName.includes('csci 61') ||
      reqName.includes('csci 62') ||
      reqName.includes('advanced programming')) {
    return REQUIREMENT_COURSE_OPTIONS["Data Structures"] || [];
  }
  
  // Mathematics requirements
  if (reqName.includes('calculus') || 
      reqName.includes('math 12') || 
      reqName.includes('math 13') ||
      reqName.includes('math 14') ||
      reqName.includes('differential equations') ||
      reqName.includes('linear algebra')) {
    return REQUIREMENT_COURSE_OPTIONS["Calculus II"] || [];
  }
  
  // Physics requirements
  if (reqName.includes('physics') || 
      reqName.includes('phys') ||
      reqName.includes('engineering physics') ||
      reqName.includes('general physics')) {
    return REQUIREMENT_COURSE_OPTIONS["Physics I"] || [];
  }
  
  // Writing requirements
  if (reqName.includes('writing') || 
      reqName.includes('english') || 
      reqName.includes('engl') ||
      reqName.includes('technical writing') ||
      reqName.includes('business writing') ||
      reqName.includes('communication') ||
      reqName.includes('comm ')) {
    return REQUIREMENT_COURSE_OPTIONS["Technical Writing"] || [];
  }
  
  // Ethics requirements
  if (reqName.includes('ethics') || 
      reqName.includes('phil') ||
      reqName.includes('philosophy') ||
      reqName.includes('engr 10') ||
      reqName.includes('computer ethics')) {
    return REQUIREMENT_COURSE_OPTIONS["Ethics in Technology"] || [];
  }
  
  // Return default options for unmatched requirements
  return REQUIREMENT_COURSE_OPTIONS["default"] || [];
};

/**
 * Simplifies requirement names for better display in the UI
 */
export const simplifyRequirementName = (originalName: string): string => {
  let simplified = originalName;
  
  // Remove common prefixes to make names more readable
  if (simplified.includes('Core: CAS:')) {
    simplified = simplified.replace('Core: CAS: ', '').trim();
  } else if (simplified.includes('Computer Science Major:')) {
    simplified = simplified.replace('Computer Science Major: ', 'CS: ').trim();
  } else if (simplified.includes('University Requirement:')) {
    simplified = simplified.replace('University Requirement: ', 'University: ').trim();
  }
  
  // Further simplifications for common requirements
  if (simplified.includes('Must complete a minimum 60 Upper Division Units')) {
    simplified = 'Upper Division Units (60 minimum)';
  } else if (simplified.includes('Must complete 175 units')) {
    simplified = 'Total Units (175 minimum)';
  } else if (simplified.includes('Must have a minimum 2.000 Cumulative GPA')) {
    simplified = 'Cumulative GPA (2.0 minimum)';
  }
  
  return simplified;
};

/**
 * Determines if a requirement should be included in the planning interface
 */
export const shouldIncludeRequirement = (status: string, name: string): boolean => {
  // Include requirements that are not satisfied
  if (status !== 'Satisfied') {
    return true;
  }
  
  // Exclude certain administrative requirements that don't need course planning
  const excludePatterns = [
    'gpa',
    'cumulative',
    'must declare',
    'emphasis'
  ];
  
  const lowerName = name.toLowerCase();
  return !excludePatterns.some(pattern => lowerName.includes(pattern));
};

/**
 * Creates a Requirement object from parsed transcript data
 */
export const createRequirementFromTranscript = (
  id: string,
  name: string,
  status: string,
  courses: Array<{course: string; period: string; units: string; grade: string}>
): Requirement => {
  const simplifiedName = simplifyRequirementName(name);
  const courseOptions = mapRequirementToCourseOptions(name);
  const requirementStatus = status === 'Satisfied' ? 'satisfied' : 'unsatisfied';
  
  // If there are courses, use the first one as the selected course
  const selectedCourse = courses.length > 0 ? courses[0].course : undefined;
  
  return {
    id,
    name: simplifiedName,
    status: requirementStatus,
    isExpanded: false,
    courseOptions,
    selectedCourse
  };
};

/**
 * Filters and processes requirements from transcript data
 */
export const processTranscriptRequirements = (
  transcriptData: Map<string, {status: string; courses: any[]}>
): Requirement[] => {
  const requirements: Requirement[] = [];
  let reqId = 1;
  
  transcriptData.forEach((reqData, reqName) => {
    // Only include requirements that need attention
    if (shouldIncludeRequirement(reqData.status, reqName)) {
      const requirement = createRequirementFromTranscript(
        reqId.toString(),
        reqName,
        reqData.status,
        reqData.courses
      );
      
      requirements.push(requirement);
      reqId++;
    }
  });
  
  return requirements;
};
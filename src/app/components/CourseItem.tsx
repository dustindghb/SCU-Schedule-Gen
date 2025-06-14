import React, { useState, useEffect } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { 
  Box, 
  Typography, 
  Collapse, 
  Card, 
  CardContent, 
  Chip,
  Rating,
  IconButton,
  Button
} from "@mui/material";
import { 
  AccessTime, 
  Star, 
  TrendingUp, 
  ExpandMore, 
  ExpandLess,
  CheckCircle,
  Schedule
} from "@mui/icons-material";
import { Course, CourseOption, Requirement } from "../types";
import { REQUIREMENT_COURSE_OPTIONS } from "../constants";

interface CourseItemProps {
  course: Course;
  index: number;
  requirement?: Requirement; // Add requirement prop to track selections
  onCourseSelect?: (requirementId: string, courseName: string) => void;
  onToggleExpand?: (requirementId: string) => void;
}

export const CourseItem: React.FC<CourseItemProps> = ({ 
  course, 
  index, 
  requirement,
  onCourseSelect,
  onToggleExpand
}) => {
  const [isExpanded, setIsExpanded] = useState(requirement?.isExpanded || false);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(
    requirement?.selectedCourse || null
  );

  // Update state when requirement changes
  useEffect(() => {
    setSelectedCourse(requirement?.selectedCourse || null);
    setIsExpanded(requirement?.isExpanded || false);
  }, [requirement?.selectedCourse, requirement?.isExpanded]);

  // Map course names to requirement categories to find courses that fulfill the requirement
  const getRequirementCategory = (courseName: string): string => {
    if (courseName.includes("COEN 11") || courseName.includes("COEN 10") || courseName.includes("Programming")) {
      return "Core Programming";
    }
    if (courseName.includes("COEN 12") || courseName.includes("Data Structures")) {
      return "Data Structures";
    }
    if (courseName.includes("MATH 12") || courseName.includes("Calculus")) {
      return "Calculus II";
    }
    if (courseName.includes("PHYS") || courseName.includes("Physics")) {
      return "Physics I";
    }
    if (courseName.includes("ENGL") || courseName.includes("Technical Writing") || courseName.includes("COMM")) {
      return "Technical Writing";
    }
    if (courseName.includes("PHIL") || courseName.includes("Ethics") || courseName.includes("ENGR 10")) {
      return "Ethics in Technology";
    }
    return "default";
  };

  // Get courses that fulfill the same requirement
  const requirementCategory = requirement ? requirement.name : getRequirementCategory(course.name);
  const fulfillmentOptions: CourseOption[] = REQUIREMENT_COURSE_OPTIONS[requirementCategory] || REQUIREMENT_COURSE_OPTIONS["default"];

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (requirement && onToggleExpand) {
      onToggleExpand(requirement.id);
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  const handleSelectCourse = (courseName: string) => {
    setSelectedCourse(courseName);
    if (requirement && onCourseSelect) {
      onCourseSelect(requirement.id, courseName);
    }
  };

  // Check if this item should be expandable (has requirement data)
  const isExpandable = Boolean(requirement);
  
  // Check if this is a requirement item (not yet placed in a quarter)
  const isRequirementItem = Boolean(requirement);

  // Get display name - use requirement name if it exists, otherwise course name
  const displayName = requirement ? requirement.name : course.name;

  return (
    <Draggable draggableId={course.id} index={index}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          sx={{
            mb: 1,
          }}
        >
          <Box
            {...provided.dragHandleProps}
            sx={{
              p: 2,
              backgroundColor: requirement?.status === "satisfied" ? "#e8f5e8" : "white",
              border: requirement?.status === "satisfied" ? "1px solid #4caf50" : "1px solid #ddd",
              borderRadius: 1,
              boxShadow: 1,
              cursor: "grab",
              "&:hover": {
                boxShadow: 2,
              },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: isRequirementItem ? "medium" : "normal" }}>
                  {displayName}
                </Typography>
                
                {/* Show course details for placed courses */}
                {!isRequirementItem && (
                  <Typography variant="body2" color="textSecondary">
                    {course.professor} • {course.timeSlot} • {course.credits} credits
                  </Typography>
                )}
                
                {/* Show selected course when collapsed and it's a requirement */}
                {isRequirementItem && selectedCourse && (!isExpandable || !isExpanded) && (
                  <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}>
                    <CheckCircle color="success" fontSize="small" />
                    <Typography variant="body2" color="success.main" sx={{ fontWeight: "medium" }}>
                      Selected: {selectedCourse}
                    </Typography>
                  </Box>
                )}
              </Box>
              
              {isExpandable && (
                <IconButton 
                  onClick={handleExpandClick}
                  size="small"
                  sx={{ ml: 1 }}
                >
                  {isExpanded ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              )}
            </Box>
          </Box>

          {isExpandable && (
            <Collapse in={isExpanded}>
              <Box sx={{ mt: 1, ml: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold", color: "primary.main" }}>
                  Courses that fulfill {requirementCategory} requirement:
                </Typography>
                {fulfillmentOptions.map((courseOption: CourseOption, idx: number) => {
                  const isSelected = selectedCourse === courseOption.name;
                  return (
                    <Card 
                      key={idx} 
                      sx={{ 
                        mb: 1, 
                        backgroundColor: isSelected ? "#e8f5e8" : "#f8f9fa",
                        border: isSelected ? "2px solid #4caf50" : "1px solid transparent",
                        position: "relative"
                      }}
                    >
                      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: "bold", flex: 1 }}>
                            {courseOption.name}
                          </Typography>
                          <Button
                            variant={isSelected ? "contained" : "outlined"}
                            size="small"
                            onClick={() => handleSelectCourse(courseOption.name)}
                            startIcon={isSelected ? <CheckCircle /> : null}
                            sx={{ 
                              ml: 2,
                              backgroundColor: isSelected ? "#4caf50" : undefined,
                              "&:hover": {
                                backgroundColor: isSelected ? "#45a049" : undefined
                              }
                            }}
                          >
                            {isSelected ? "Selected" : "Select"}
                          </Button>
                        </Box>
                        
                        {/* Quarter availability */}
                        <Box sx={{ mb: 2 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
                            <Schedule fontSize="small" color="action" />
                            <Typography variant="caption" color="textSecondary">
                              Available Quarters:
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                            {courseOption.availableQuarters?.map((quarter, qIdx) => (
                              <Chip
                                key={qIdx}
                                label={quarter}
                                size="small"
                                variant="outlined"
                                sx={{ fontSize: "0.7rem", height: 20 }}
                              />
                            ))}
                          </Box>
                        </Box>
                        
                        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, minWidth: "100px" }}>
                            <AccessTime fontSize="small" color="action" />
                            <Box>
                              <Typography variant="caption" color="textSecondary">
                                Hours/Week
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                {courseOption.hoursPerWeek}h
                              </Typography>
                            </Box>
                          </Box>
                          
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, minWidth: "120px" }}>
                            <Star fontSize="small" color="action" />
                            <Box>
                              <Typography variant="caption" color="textSecondary">
                                Quality
                              </Typography>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                <Rating 
                                  value={courseOption.quality} 
                                  readOnly 
                                  size="small" 
                                  max={5}
                                />
                                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                  {courseOption.quality}/5
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                          
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, minWidth: "100px" }}>
                            <TrendingUp fontSize="small" color="action" />
                            <Box>
                              <Typography variant="caption" color="textSecondary">
                                Difficulty
                              </Typography>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                <Chip 
                                  label={`${courseOption.difficulty}/5`}
                                  size="small"
                                  color={
                                    courseOption.difficulty <= 2 ? "success" :
                                    courseOption.difficulty <= 3.5 ? "warning" : "error"
                                  }
                                  sx={{ fontSize: "0.75rem", height: 20 }}
                                />
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  );
                })}
              </Box>
            </Collapse>
          )}
        </Box>
      )}
    </Draggable>
  );
};
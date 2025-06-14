import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Badge,
  Button,
  Box,
} from "@mui/material";
import { AutoAwesome } from "@mui/icons-material";
import { Quarter, Requirement } from "../types";
import { CourseItem } from "./CourseItem";

interface QuarterCardProps {
  quarter: Quarter;
  tokens: number;
  requirements: Requirement[];
  onAutoGenerate: (quarterId: string) => void;
  onCourseSelect: (requirementId: string, courseName: string) => void;
  onToggleExpand: (requirementId: string) => void;
}

export const QuarterCard: React.FC<QuarterCardProps> = ({
  quarter,
  tokens,
  requirements,
  onAutoGenerate,
  onCourseSelect,
  onToggleExpand,
}) => {
  // Helper function to get requirement data for a course
  const getRequirementForCourse = (course: any): Requirement | undefined => {
    if (course.requirementId) {
      return requirements.find(req => req.id === course.requirementId);
    }
    return undefined;
  };

  return (
    <Card sx={{ border: quarter.isCurrent ? "2px solid #1976d2" : "1px solid #ddd" }}>
      <CardHeader
        title={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h6">{quarter.name}</Typography>
            {quarter.isCurrent && (
              <Badge 
                badgeContent="Current" 
                color="primary" 
                sx={{ 
                  ml: 2,
                  "& .MuiBadge-badge": {
                    position: "relative",
                    transform: "none",
                    fontSize: "0.75rem",
                    height: 20,
                    minWidth: 50,
                    borderRadius: "10px"
                  }
                }} 
              />
            )}
          </Box>
        }
        action={
          quarter.isCurrent && (
            <Button
              variant="contained"
              startIcon={<AutoAwesome />}
              onClick={() => onAutoGenerate(quarter.id)}
              disabled={tokens < 25}
              size="small"
            >
              Auto Generate (25 tokens)
            </Button>
          )
        }
      />
      <CardContent>
        <Droppable droppableId={quarter.id}>
          {(provided) => (
            <Box
              {...provided.droppableProps}
              ref={provided.innerRef}
              sx={{
                minHeight: 120,
                p: 2,
                border: "1px dashed gray",
                borderRadius: 1,
                backgroundColor: "#f9f9f9",
              }}
            >
              {quarter.courses.length === 0 ? (
                <Typography variant="body2" color="textSecondary" align="center">
                  Drop requirements here or use auto-generate
                </Typography>
              ) : (
                quarter.courses.map((course, index) => (
                  <CourseItem 
                    key={course.id} 
                    course={course} 
                    index={index}
                    requirement={getRequirementForCourse(course)}
                    onCourseSelect={onCourseSelect}
                    onToggleExpand={onToggleExpand}
                  />
                ))
              )}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </CardContent>
    </Card>
  );
};
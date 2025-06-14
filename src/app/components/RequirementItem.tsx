import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { Box, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Requirement } from "../types";

interface RequirementItemProps {
  requirement: Requirement;
  index: number;
}

export const RequirementItem: React.FC<RequirementItemProps> = ({ requirement, index }) => {
  return (
    <Draggable draggableId={requirement.id} index={index}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            p: 2,
            mb: 1,
            backgroundColor: requirement.status === "satisfied" ? "#e8f5e8" : "white",
            border: requirement.status === "satisfied" ? "1px solid #4caf50" : "1px solid #ddd",
            borderRadius: 1,
            boxShadow: 1,
            cursor: "grab",
            "&:hover": {
              boxShadow: 2,
            },
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: "medium" }}>
            {requirement.name}
          </Typography>
          
          {/* Show selected course when there is one */}
          {requirement.selectedCourse && (
            <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}>
              <CheckCircle color="success" fontSize="small" />
              <Typography variant="body2" color="success.main" sx={{ fontWeight: "medium" }}>
                Selected: {requirement.selectedCourse}
              </Typography>
            </Box>
          )}
          
          {/* Show not fulfilled message for requirements without selection */}
          {!requirement.selectedCourse && (
            <Typography variant="body2" color="textSecondary">
              Requirement not yet fulfilled
            </Typography>
          )}
        </Box>
      )}
    </Draggable>
  );
};
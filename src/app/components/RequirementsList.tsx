import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import { Box, Typography, Paper } from "@mui/material";
import { RequirementItem } from "./RequirementItem";
import { Requirement } from "../types";

interface RequirementsListProps {
  requirements: Requirement[];
}

export const RequirementsList: React.FC<RequirementsListProps> = ({ 
  requirements
}) => {
  return (
    <Paper sx={{ p: 2, height: "fit-content" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Degree Requirements
      </Typography>
      
      <Droppable droppableId="requirements">
        {(provided) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{ minHeight: 200 }}
          >
            {requirements.map((requirement, index) => (
              <RequirementItem
                key={requirement.id}
                requirement={requirement}
                index={index}
              />
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </Paper>
  );
};
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Quarter, Requirement } from "../types";
import { QuarterCard } from "./QuarterCard";

interface QuartersGridProps {
  quarters: Quarter[];
  tokens: number;
  requirements: Requirement[];
  onAddQuarter: () => void;
  onAutoGenerate: (quarterId: string) => void;
  onCourseSelect: (requirementId: string, courseName: string) => void;
  onToggleExpand: (requirementId: string) => void;
}

export const QuartersGrid: React.FC<QuartersGridProps> = ({
  quarters,
  tokens,
  requirements,
  onAddQuarter,
  onAutoGenerate,
  onCourseSelect,
  onToggleExpand,
}) => {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6">Quarter Planning</Typography>
        <Button variant="outlined" startIcon={<Add />} onClick={onAddQuarter}>
          Add Quarter
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {quarters.map((quarter) => (
          <QuarterCard
            key={quarter.id}
            quarter={quarter}
            tokens={tokens}
            requirements={requirements}
            onAutoGenerate={onAutoGenerate}
            onCourseSelect={onCourseSelect}
            onToggleExpand={onToggleExpand}
          />
        ))}
      </Box>
    </Box>
  );
};
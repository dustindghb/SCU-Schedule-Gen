import React from "react";
import { Box, Typography } from "@mui/material";
import { MonetizationOn } from "@mui/icons-material";

interface HeaderProps {
  tokens: number;
}

export const Header: React.FC<HeaderProps> = ({ tokens }) => {
  return (
    <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Box>
        <Typography variant="h4" fontWeight="bold">
          SCU Quarterly Planner
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Plan your academic journey at Santa Clara University
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <MonetizationOn color="warning" />
        <Typography variant="h6">{tokens} tokens</Typography>
      </Box>
    </Box>
  );
};
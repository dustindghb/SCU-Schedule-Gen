// AutoGenerateButton.tsx
import React from "react";
import { Button, Tooltip } from "@mui/material";
import { AutoAwesome } from "@mui/icons-material";

interface AutoGenerateButtonProps {
  onClick: () => void;
  tokens: number;
  disabled?: boolean;
  variant?: "contained" | "outlined" | "text";
  tokenCost?: number;
}

export const AutoGenerateButton: React.FC<AutoGenerateButtonProps> = ({
  onClick,
  tokens,
  disabled = false,
  variant = "outlined",
  tokenCost = 25,
}) => {
  const canGenerate = tokens >= tokenCost && !disabled;
  
  const buttonContent = (
    <Button
      variant={variant}
      startIcon={<AutoAwesome />}
      onClick={onClick}
      disabled={!canGenerate}
      sx={{ 
        borderRadius: 1.5,
        textTransform: "none",
        fontWeight: 500,
      }}
    >
      Auto-Generate ({tokenCost} tokens)
    </Button>
  );

  if (!canGenerate && tokens < tokenCost) {
    return (
      <Tooltip title={`Need ${tokenCost - tokens} more tokens to auto-generate courses`}>
        <span>{buttonContent}</span>
      </Tooltip>
    );
  }

  return buttonContent;
};
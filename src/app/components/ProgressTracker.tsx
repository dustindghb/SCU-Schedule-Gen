import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  LinearProgress,
  Chip,
} from "@mui/material";
import {
  TrendingUp,
  CheckCircle,
  Assignment,
  Timeline,
} from "@mui/icons-material";

interface ProgressTrackerProps {
  satisfiedCount: number;
  totalCount: number;
  progressPercentage: number;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  satisfiedCount,
  totalCount,
  progressPercentage,
}) => {
  const remainingCount = totalCount - satisfiedCount;

  // Determine progress color based on percentage
  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "success";
    if (percentage >= 60) return "info";
    if (percentage >= 40) return "warning";
    return "error";
  };

  const progressColor = getProgressColor(progressPercentage);

  // Calculate estimated completion based on current progress
  const getCompletionMessage = (percentage: number) => {
    if (percentage === 100) return "🎉 All requirements completed!";
    if (percentage >= 80) return "Almost there! Final stretch!";
    if (percentage >= 60) return "Great progress! More than halfway done!";
    if (percentage >= 40) return "Good progress! Keep it up!";
    if (percentage >= 20) return "Getting started! You're on your way!";
    return "Ready to begin your academic journey!";
  };

  return (
    <Card sx={{ mb: 4, overflow: "visible" }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Timeline sx={{ mr: 1, color: "primary.main" }} />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Degree Progress Tracker
          </Typography>
        </Box>

        <Box sx={{ 
          display: "flex", 
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "stretch", md: "center" },
          gap: 3 
        }}>
          {/* Progress Bar Section */}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2" color="textSecondary">
                  Requirements Completed
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  {satisfiedCount} of {totalCount} ({progressPercentage}%)
                </Typography>
              </Box>
              
              <LinearProgress
                variant="determinate"
                value={progressPercentage}
                color={progressColor}
                sx={{
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: "grey.200",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 6,
                    transition: "transform 0.4s ease-in-out",
                  },
                }}
              />
            </Box>

            <Typography 
              variant="body2" 
              color="textSecondary" 
              sx={{ fontStyle: "italic" }}
            >
              {getCompletionMessage(progressPercentage)}
            </Typography>
          </Box>

          {/* Stats Section */}
          <Box sx={{ 
            display: "flex", 
            gap: 1, 
            justifyContent: { xs: "center", md: "flex-end" },
            flexWrap: "wrap",
            minWidth: { md: "300px" }
          }}>
            <Chip
              icon={<CheckCircle />}
              label={`${satisfiedCount} Completed`}
              color="success"
              variant="outlined"
              size="small"
              sx={{ fontWeight: "bold" }}
            />
            
            <Chip
              icon={<Assignment />}
              label={`${remainingCount} Remaining`}
              color={remainingCount === 0 ? "success" : "warning"}
              variant="outlined"
              size="small"
              sx={{ fontWeight: "bold" }}
            />

            <Chip
              icon={<TrendingUp />}
              label={`${progressPercentage}% Done`}
              color={progressColor}
              variant="filled"
              size="small"
              sx={{ fontWeight: "bold", color: "white" }}
            />
          </Box>
        </Box>

        {/* Milestone Messages */}
        {progressPercentage === 100 && (
          <Box 
            sx={{ 
              mt: 2, 
              p: 2, 
              backgroundColor: "success.lighter", 
              borderRadius: 2,
              border: "1px solid",
              borderColor: "success.light"
            }}
          >
            <Typography variant="body2" color="success.dark" sx={{ fontWeight: "bold" }}>
            Congratulations! You&apos;ve completed all your degree requirements!
            </Typography>
          </Box>
        )}

        {progressPercentage >= 75 && progressPercentage < 100 && (
          <Box 
            sx={{ 
              mt: 2, 
              p: 2, 
              backgroundColor: "info.lighter", 
              borderRadius: 2,
              border: "1px solid",
              borderColor: "info.light"
            }}
          >
            <Typography variant="body2" color="info.dark" sx={{ fontWeight: "bold" }}>
              You&apos;re in the home stretch! Only {remainingCount} requirement{remainingCount !== 1 ? 's' : ''} left to complete!
            </Typography>
          </Box>
        )}

        {totalCount === 0 && (
          <Box 
            sx={{ 
              mt: 2, 
              p: 2, 
              backgroundColor: "grey.100", 
              borderRadius: 2,
              border: "1px solid",
              borderColor: "grey.300"
            }}
          >
            <Typography variant="body2" color="textSecondary" sx={{ fontWeight: "bold" }}>
              📁 Upload your academic progress file to see your personalized degree progress!
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
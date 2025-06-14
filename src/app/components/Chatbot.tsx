import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  IconButton,
  Collapse,
  Fab,
  Badge,
  Avatar,
  Chip,
  Paper
} from "@mui/material";
import {
  Chat,
  Send,
  Close,
  ExpandLess,
  ExpandMore,
  SmartToy,
  Person
} from "@mui/icons-material";

interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  type?: "text" | "suggestion";
}

interface ChatbotProps {
  position?: "bottom-right" | "bottom-left" | "inline";
}

export const Chatbot: React.FC<ChatbotProps> = ({ position = "bottom-right" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text: "Hi! I'm your SCU academic planning assistant. I can help you with course recommendations, prerequisites, and planning your quarters. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      
      if (!isOpen) {
        setUnreadCount(prev => prev + 1);
      }
    }, 1000);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes("prerequisite") || input.includes("prereq")) {
      return "I can help you check prerequisites! For example, COEN 12 (Data Structures) requires COEN 11 (Programming Fundamentals). What specific course are you interested in?";
    }
    if (input.includes("coen") || input.includes("computer")) {
      return "Great choice! Computer Engineering courses at SCU are excellent. COEN 11 and 12 are foundational courses. Would you like recommendations for your specific quarter?";
    }
    if (input.includes("math") || input.includes("calculus")) {
      return "Math requirements include Calculus I, II, and III. MATH 11, 12, and 13 are the standard sequence. Most students take these in their first year.";
    }
    if (input.includes("gpa") || input.includes("grade")) {
      return "I can help you plan courses based on difficulty! Would you like to see easier courses for this quarter, or are you looking for more challenging options?";
    }
    if (input.includes("schedule") || input.includes("time")) {
      return "I can help you avoid time conflicts! What courses are you considering, and do you prefer morning or afternoon classes?";
    }
    if (input.includes("professor") || input.includes("teacher")) {
      return "I have professor ratings and reviews! Which course are you looking at? I can show you the best professors with their difficulty and quality ratings.";
    }
    
    return "I can help you with course planning, prerequisites, professor recommendations, and schedule conflicts. Try asking about specific courses or requirements!";
  };

  const suggestionChips = [
    "Show COEN prerequisites",
    "Best professors for MATH 12",
    "Easy courses for this quarter",
    "Help me avoid time conflicts"
  ];

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const positionStyles = {
    "bottom-right": {
      position: "fixed" as const,
      bottom: 20,
      right: 20,
      zIndex: 1000,
    },
    "bottom-left": {
      position: "fixed" as const,
      bottom: 20,
      left: 20,
      zIndex: 1000,
    },
    inline: {
      position: "relative" as const,
    },
  };

  if (!isOpen && position !== "inline") {
    return (
      <Box sx={positionStyles[position]}>
        <Badge badgeContent={unreadCount} color="error">
          <Fab
            color="primary"
            onClick={handleToggle}
            sx={{
              background: "linear-gradient(45deg, #1976d2, #42a5f5)",
              "&:hover": {
                background: "linear-gradient(45deg, #1565c0, #1976d2)",
              },
            }}
          >
            <Chat />
          </Fab>
        </Badge>
      </Box>
    );
  }

  return (
    <Box sx={positionStyles[position]}>
      <Card
        sx={{
          width: position === "inline" ? "100%" : 380,
          height: position === "inline" ? "auto" : isMinimized ? "auto" : 500,
          display: "flex",
          flexDirection: "column",
          boxShadow: position === "inline" ? 1 : 8,
          borderRadius: 2,
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "primary.main" }}>
              <SmartToy />
            </Avatar>
          }
          title="Academic Assistant"
          subheader="Online"
          action={
            <Box>
              {position !== "inline" && (
                <>
                  <IconButton onClick={handleMinimize} size="small">
                    {isMinimized ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                  <IconButton onClick={handleToggle} size="small">
                    <Close />
                  </IconButton>
                </>
              )}
            </Box>
          }
          sx={{
            background: "linear-gradient(45deg, #1976d2, #42a5f5)",
            color: "white",
            "& .MuiCardHeader-subheader": {
              color: "rgba(255,255,255,0.8)",
            },
          }}
        />

        <Collapse in={!isMinimized}>
          <CardContent
            sx={{
              flex: 1,
              p: 0,
              display: "flex",
              flexDirection: "column",
              height: position === "inline" ? 400 : 350,
            }}
          >
            {/* Messages Area */}
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              {messages.map((message) => (
                <Box
                  key={message.id}
                  sx={{
                    display: "flex",
                    justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
                    mb: 1,
                  }}
                >
                  <Paper
                    sx={{
                      p: 1.5,
                      maxWidth: "80%",
                      bgcolor: message.sender === "user" ? "primary.main" : "grey.100",
                      color: message.sender === "user" ? "white" : "text.primary",
                      borderRadius: 2,
                      borderBottomRightRadius: message.sender === "user" ? 0 : 2,
                      borderBottomLeftRadius: message.sender === "bot" ? 0 : 2,
                    }}
                  >
                    <Typography variant="body2">{message.text}</Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        mt: 0.5,
                        opacity: 0.7,
                        fontSize: "0.7rem",
                      }}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>
                  </Paper>
                </Box>
              ))}
              <div ref={messagesEndRef} />
            </Box>

            {/* Suggestion Chips */}
            {messages.length <= 2 && (
              <Box sx={{ px: 2, pb: 1 }}>
                <Typography variant="caption" color="textSecondary" sx={{ mb: 1, display: "block" }}>
                  Quick suggestions:
                </Typography>
                <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                  {suggestionChips.map((suggestion, idx) => (
                    <Chip
                      key={idx}
                      label={suggestion}
                      size="small"
                      onClick={() => handleSuggestionClick(suggestion)}
                      sx={{ fontSize: "0.7rem", cursor: "pointer" }}
                    />
                  ))}
                </Box>
              </Box>
            )}

            {/* Input Area */}
            <Box sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
              <Box sx={{ display: "flex", gap: 1, alignItems: "flex-end" }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Ask about courses, professors, or planning..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  size="small"
                  multiline
                  maxRows={3}
                />
                <IconButton
                  color="primary"
                  onClick={handleSendMessage}
                  disabled={inputValue.trim() === ""}
                  sx={{
                    bgcolor: "primary.main",
                    color: "white",
                    "&:hover": { bgcolor: "primary.dark" },
                    "&:disabled": { bgcolor: "grey.300" },
                  }}
                >
                  <Send />
                </IconButton>
              </Box>
            </Box>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
};
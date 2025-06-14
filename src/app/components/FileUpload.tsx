import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Badge,
  TextField,
  Box,
  CircularProgress,
  Alert,
  Chip,
} from "@mui/material";
import { Upload, CheckCircle, Warning } from "@mui/icons-material";
import * as XLSX from 'xlsx';
import { Requirement, CourseOption } from "../types";
import { REQUIREMENT_COURSE_OPTIONS } from "../constants";

type SheetRow = (string | number | boolean | Date | null | undefined)[];

interface FileUploadProps {
  uploadedFile: File | null;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRequirementsUpdate: (requirements: Requirement[]) => void;
}

interface ParsedRequirement {
  name: string;
  status: string;
  courses: Array<{
    course: string;
    period: string;
    units: string;
    grade: string;
  }>;
}

// Utility functions for mapping requirements
const mapRequirementToCourseOptions = (requirementName: string): CourseOption[] => {
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
      reqName.includes('arts') ||
      reqName.includes('creative writing') ||
      reqName.includes('comm ')) {
    return REQUIREMENT_COURSE_OPTIONS["Technical Writing"] || [];
  }
  
  // Ethics requirements
  if (reqName.includes('ethics') || 
      reqName.includes('phil') ||
      reqName.includes('philosophy') ||
      reqName.includes('engr 10') ||
      reqName.includes('computer ethics') ||
      reqName.includes('justice') ||
      reqName.includes('technology and society') ||
      reqName.includes('science technology')) {
    return REQUIREMENT_COURSE_OPTIONS["Ethics in Technology"] || [];
  }
  
  // Return default options for unmatched requirements
  return REQUIREMENT_COURSE_OPTIONS["default"] || [];
};

const simplifyRequirementName = (originalName: string): string => {
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

const shouldIncludeRequirement = (status: string, name: string): boolean => {
  // Include ALL requirements (both satisfied and unsatisfied) for progress tracking
  // Only exclude certain administrative requirements that don't represent actual coursework
  const excludePatterns = [
    'must declare',
    'emphasis',
    'upper division units',
    'total units',
    '175 units',
    '60 upper division',
    'cumulative gpa',
    'minimum 2.000'
  ];
  
  const lowerName = name.toLowerCase();
  return !excludePatterns.some(pattern => lowerName.includes(pattern));
};

export const FileUpload: React.FC<FileUploadProps> = ({ 
  uploadedFile, 
  onFileUpload, 
  onRequirementsUpdate 
}) => {
  const [uploading, setUploading] = React.useState(false);
  const [parseStatus, setParseStatus] = React.useState<{
    success: boolean;
    message: string;
    requirementsCount?: number;
  } | null>(null);

  const parseXLSXFile = async (file: File): Promise<Requirement[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          if (!data) throw new Error("Failed to read file");

          const workbook = XLSX.read(data, {
            cellStyles: true,
            cellFormula: true,
            cellDates: true,
            cellNF: true,
            sheetStubs: true
          });

          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          
          // Convert to JSON array
          const jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1}) as SheetRow[];
          
          // Parse requirements from the data
          const requirementsMap = new Map<string, ParsedRequirement>();
          
          // Start from row 3 (index 2) since rows 1-2 are headers
          for (let i = 2; i < jsonData.length; i++) {
            const row = jsonData[i];
            if (row && row[0] && row[1]) {
              const requirement = row[0].toString().trim();
              const status = row[1].toString().trim();
              
              if (!requirementsMap.has(requirement)) {
                requirementsMap.set(requirement, {
                  name: requirement,
                  status: status,
                  courses: []
                });
              }
              
              // Add course if it exists
              if (row[3]) {
                requirementsMap.get(requirement)!.courses.push({
                  course: row[3].toString().trim(),
                  period: row[4] ? row[4].toString().trim() : '',
                  units: row[5] ? row[5].toString().trim() : '',
                  grade: row[6] ? row[6].toString().trim() : ''
                });
              }
            }
          }

          // Process requirements and include both satisfied and unsatisfied
          const processedRequirements: Requirement[] = [];
          let reqId = 1;
          
          requirementsMap.forEach((reqData, reqName) => {
            // Include all relevant requirements (both satisfied and unsatisfied)
            if (shouldIncludeRequirement(reqData.status, reqName)) {
              const simplifiedName = simplifyRequirementName(reqName);
              const courseOptions = mapRequirementToCourseOptions(reqName);
              
              // Set status based on what's in the file
              const requirementStatus = reqData.status === 'Satisfied' ? 'satisfied' : 'unsatisfied';
              
              // If there are courses, use the first one as the selected course
              const selectedCourse = reqData.courses.length > 0 ? reqData.courses[0].course : undefined;
              
              processedRequirements.push({
                id: reqId.toString(),
                name: simplifiedName,
                status: requirementStatus,
                isExpanded: false,
                courseOptions,
                selectedCourse
              });
              
              reqId++;
            }
          });

          // Sort requirements: unsatisfied first, then satisfied
          processedRequirements.sort((a, b) => {
            if (a.status === 'unsatisfied' && b.status === 'satisfied') return -1;
            if (a.status === 'satisfied' && b.status === 'unsatisfied') return 1;
            return 0; // Keep original order within same status
          });
          
          console.log(`Successfully processed ${processedRequirements.length} requirements from transcript`);
          console.log(`Satisfied: ${processedRequirements.filter(r => r.status === 'satisfied').length}, Unsatisfied: ${processedRequirements.filter(r => r.status === 'unsatisfied').length}`);
          resolve(processedRequirements);
        } catch (error) {
          reject(new Error(`Failed to parse XLSX file: ${error}`));
        }
      };

      reader.onerror = () => {
        reject(new Error("Failed to read file"));
      };

      reader.readAsArrayBuffer(file);
    });
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setParseStatus(null);
    
    try {
      // Call the original handler
      onFileUpload(event);
      
      // Check if it's an XLSX file
      if (file.name.toLowerCase().endsWith('.xlsx') || file.name.toLowerCase().endsWith('.xls')) {
        console.log("Parsing XLSX file...");
        
        const requirements = await parseXLSXFile(file);
        
        console.log("Parsed requirements:", requirements);
        
        // Update requirements in the parent component
        onRequirementsUpdate(requirements);
        
        setParseStatus({
          success: true,
          message: "Academic progress file parsed successfully!",
          requirementsCount: requirements.length
        });
      } else {
        setParseStatus({
          success: false,
          message: "Please upload an XLSX file containing your academic progress."
        });
      }
      
    } catch (error) {
      console.error('Error processing file:', error);
      setParseStatus({
        success: false,
        message: `Error processing file: ${error}`
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card sx={{ mb: 4 }}>
      <CardHeader
        title={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Upload />
            <Typography variant="h6">Upload Academic Progress</Typography>
          </Box>
        }
      />
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <TextField
              type="file"
              inputProps={{ accept: ".csv,.xlsx,.xls,.json" }}
              onChange={handleFileChange}
              fullWidth
              disabled={uploading}
            />
            {uploading && <CircularProgress size={24} />}
            {uploadedFile && !uploading && (
              <Badge badgeContent="✓" color="secondary">
                <Chip 
                  label={uploadedFile.name} 
                  icon={<CheckCircle />} 
                  color="success" 
                  variant="outlined"
                />
              </Badge>
            )}
          </Box>
          
          <Typography variant="body2" color="textSecondary">
            Upload your degree audit or academic progress file (XLSX, CSV, Excel, or JSON format).
            XLSX files will be automatically parsed to extract unsatisfied requirements.
          </Typography>

          {/* Parse Status */}
          {parseStatus && (
            <Alert 
              severity={parseStatus.success ? "success" : "error"}
              icon={parseStatus.success ? <CheckCircle /> : <Warning />}
            >
              <Typography variant="body2">
                {parseStatus.message}
                {parseStatus.success && parseStatus.requirementsCount && (
                  <span> Found {parseStatus.requirementsCount} requirements to complete.</span>
                )}
              </Typography>
            </Alert>
          )}

          {/* File Requirements */}
          <Box sx={{ p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
              Supported File Formats:
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Chip label="XLSX (Recommended)" color="primary" size="small" />
              <Chip label="XLS" color="primary" size="small" />
              <Chip label="CSV" color="secondary" size="small" />
              <Chip label="JSON" color="secondary" size="small" />
            </Box>
            <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: "block" }}>
              For best results, upload your official degree audit or academic progress report in XLSX format.
              The system will automatically identify unsatisfied requirements and load them into your planner.
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
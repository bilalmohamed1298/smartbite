import { useContext, useEffect, useState } from "react";
import {
  Box,
  MobileStepper,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Checkbox,
  Button,
  Stack,
} from "@mui/material";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { MealsContext } from "../../Utils/MealsContext";

const questions = [
  {
    question: "Which restrictions/allergies do you have?",
    options: [
      "Veganism",
      "Vegetarianism",
      "Pescetarianism",
      "Gluten-Free",
      "Lactose intolerant",
      "Nut allergy",
      "Other",
    ],
  },
  {
    question: "How often do you exercise?",
    options: ["Never", "1-2 times a week", "3-4 times a week", "Everyday"],
  },
  {
    question: "How many meals do you eat per day?",
    options: ["1", "2", "3", "More than 3"],
  },
  {
    question: "Do you have any food preferences?",
    options: ["Vegetarian", "Vegan", "Keto", "No preference"],
  },
  {
    question: "How much water do you drink daily?",
    options: ["Less than 1L", "1-2L", "2-3L", "More than 3L"],
  },
  { question: "Do you smoke?", options: ["Yes", "No", "Trying to quit"] },
  {
    question: "How much sleep do you get per night?",
    options: ["Less than 5h", "5-6h", "7-8h", "More than 8h"],
  },
  {
    question: "Do you have any medical conditions?",
    options: ["Diabetes", "Hypertension", "Heart Disease", "None"],
  },
  {
    question: "How active is your daily routine?",
    options: [
      "Sedentary",
      "Lightly active",
      "Moderately active",
      "Very active",
    ],
  },
  {
    question: "Do you track your calories?",
    options: ["Yes, daily", "Sometimes", "Rarely", "Never"],
  },
  {
    question: "What type of diet do you follow?",
    options: ["Balanced", "High protein", "Low carb", "Other"],
  },
  { question: "Do you take supplements?", options: ["Yes", "No", "Sometimes"] },
  {
    question: "Are you interested in meal planning?",
    options: ["Yes", "No", "Maybe"],
  },
];

const OverallQuestions = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [direction, setDirection] = useState(1);
  const { userDetails, setUserDetails } = useContext(MealsContext);

  /////////////////////////////////////////////////////////

  const activityMap = {
    Never: 1.2,
    "1-2 times a week": 1.375,
    "3-4 times a week": 1.55,
    Everyday: 1.725,
  };

  const routineMap = {
    Sedentary: 1.2,
    "Lightly active": 1.375,
    "Moderately active": 1.55,
    "Very active": 1.725,
  };

  const waterIntakeMap = {
    "Less than 1L": -0.1,
    "1-2L": 0,
    "2-3L": 0.1,
    "More than 3L": 0.2,
  };

  const medicalConditionMap = {
    Diabetes: -0.1,
    Hypertension: -0.1,
    "Heart Disease": -0.2,
    None: 0,
  };

  const sleepMap = {
    "Less than 5h": -0.2,
    "5-6h": -0.1,
    "7-8h": 0,
    "More than 8h": 0.1,
  };

  const alcoholMap = {
    Never: 0.1,
    Rarely: 0,
    Sometimes: -0.1,
    Frequently: -0.2,
  };

  const smokingMap = {
    Yes: -0.2,
    No: 0.1,
    "Trying to quit": -0.1,
  };

  const exerciseLevel = selectedOptions[1] || "Never";
  const dailyRoutine = selectedOptions[9] || "Sedentary";
  const waterIntake = selectedOptions[4] || "1-2L";
  const medicalCondition = selectedOptions[8] || "None";
  const sleepQuality = selectedOptions[7] || "7-8h";
  const alcoholConsumption = selectedOptions[6] || "Never";
  const smokingStatus = selectedOptions[5] || "No";

  const exerciseMultiplier = activityMap[exerciseLevel] || 1.2;
  const routineMultiplier = routineMap[dailyRoutine] || 1.2;
  const waterEffect = waterIntakeMap[waterIntake] || 0;
  const medicalEffect = medicalConditionMap[medicalCondition] || 0;
  const sleepEffect = sleepMap[sleepQuality] || 0;
  const alcoholEffect = alcoholMap[alcoholConsumption] || 0;
  const smokingEffect = smokingMap[smokingStatus] || 0;

  const activityLevel = (
    (exerciseMultiplier + routineMultiplier) / 2 +
    waterEffect +
    medicalEffect +
    sleepEffect +
    alcoholEffect +
    smokingEffect
  ).toFixed(2);

  //////////////////////////////////////////////////////////

  let tempUserDetails = { ...userDetails };
  tempUserDetails.activity = activityLevel;
  useEffect(() => {
    setUserDetails({ ...tempUserDetails });
  }, [selectedOptions]);

  /////////////////////////////////////////////////////////

  const handleNext = (option) => {
    setSelectedOptions((prev) => ({ ...prev, [activeStep]: option }));
    setTimeout(() => {
      if (activeStep < questions.length - 1) {
        setDirection(1);
        setActiveStep((prev) => prev + 1);
      }
    }, 100);
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setDirection(-1);
      setActiveStep((prev) => prev - 1);
    }
  };

  return (
    <Stack
      sx={{
        justifyContent:'space-between',
        height: "100%",
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: "12px",
            bgcolor: "#A34BCE",
            color: "#fff",
            width: "60px",
            padding: "5px",
            borderRadius: "5px",
            textAlign: "center",
            fontWeight: "600",
          }}
          gutterBottom
        >
          Activity
        </Typography>
        <MobileStepper
          variant="progress"
          steps={questions.length}
          position="static"
          activeStep={activeStep}
          sx={{
            bgcolor: "transparent",
            width: "190%",
            mb: 2,
            "& .MuiLinearProgress-root": {
              bgcolor: "#D8BFF2",
            },
            "& .MuiLinearProgress-bar": {
              bgcolor: "#A34BCE",
            },
          }}
          backButton={<></>}
          nextButton={<></>}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ x: direction * 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -direction * 50, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              paddingTop: "5%",
            }}
          >
            <Typography variant="h6" gutterBottom>
              {questions[activeStep].question}
            </Typography>

            <List>
              {questions[activeStep].options.map((option, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    onClick={() => handleNext(option)}
                    sx={{
                      borderRadius: 2,
                      my: 1,
                      bgcolor:
                        selectedOptions[activeStep] === option
                          ? "#f5e6ff"
                          : "#F5F8FC",
                      ":hover": { bgcolor: "#F9F3FE" },
                    }}
                  >
                    <Checkbox
                      checked={selectedOptions[activeStep] === option}
                      sx={{
                        "&.Mui-checked": {
                          color: "#A34BCE",
                        },
                      }}
                    />
                    <ListItemText primary={option} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </motion.div>
        </AnimatePresence>
      </Box>

      <Box>
        {activeStep > 0 && (
          <IconButton
            onClick={handleBack}
            size="large"
            sx={{
              bgcolor: "#E7EDf5",
              "&:hover": { bgcolor: "#DEE4EB" },
              width: 65,
              height: 60,
            }}
          >
            <KeyboardArrowLeft />
          </IconButton>
        )}

        {activeStep === questions.length - 1 && selectedOptions[activeStep] ? (
          <Link to="/details">
            <Button
              size="large"
              sx={{
                borderRadius: "50px",
                backgroundColor: "#A34BCE",
                color: "white",
                width: { xs: "66%", sm: "80%" },
                height: 60,
                fontWeight: "bold",
                textTransform: "none",
                fontSize: "18px",
                ml:3,
                "&:hover": {
                  backgroundColor: "#A34BCE",
                },
              }}
            >
              Next
            </Button>
          </Link>
        ) : (
          ""
        )}
      </Box>
    </Stack>
  );
};

export default OverallQuestions;

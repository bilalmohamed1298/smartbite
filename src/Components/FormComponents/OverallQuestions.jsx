import { useEffect, useState } from "react";
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
  useTheme,
  Button,
} from "@mui/material";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

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
        "None",
      ],
    },
    {
      question: "What is your main goal?",
      options: [
        "Lose weight",
        "Gain muscle",
        "Improve health",
        "Maintain weight",
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
    {
      question: "Do you consume alcohol?",
      options: ["Never", "Rarely", "Sometimes", "Frequently"],
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
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [direction, setDirection] = useState(1);
  
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

    useEffect(()=>{
      console.log(selectedOptions)
    },[selectedOptions])


  return (
    <Box sx={{
      position:'relative',
      height:'100%'
    }}>
          <MobileStepper
        variant="progress"
        steps={questions.length}
        position="static"
        activeStep={activeStep}
        sx={{
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

      {activeStep > 0 && (
        <IconButton
          onClick={handleBack}
          size="large"
          sx={{
            position: "absolute",
            bottom: 20,
            left: 20,
            bgcolor: "#E7EDf5",
            "&:hover": { bgcolor: "#DEE4EB" },
            width: 65,
            height: 60,
          }}
        >
          <KeyboardArrowLeft />
        </IconButton>
      )}

      {
        activeStep === questions.length -1?
        <Link to='/details'
        >
                    <Button
              size="large"
              sx={{
                borderRadius: "50px",
                backgroundColor: "#A34BCE",
                color: "white",
                width: {xs:'70%',sm:'80%'},
                height: 60,
                fontWeight: "bold",
                textTransform: "none",
                fontSize: "18px",
                "&:hover": {
                  backgroundColor: "#A34BCE",

                },
                position: "absolute",
                bottom: 20,
                right: 20,
              }}
            >
              Next
            </Button>
        </Link>
        :''
      }


    </Box>
  )
}

export default OverallQuestions
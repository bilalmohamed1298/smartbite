import { useContext, useEffect, useMemo, useState } from "react";
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
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { MealsContext } from "../../Utils/MealsContext";

const questions = [
  {
    question: "كم مرة تمارس الرياضة؟",
    options: ["أبدًا", "1-2 مرات أسبوعيًا", "3-4 مرات أسبوعيًا", "يوميًا"],
  },
  {
    question: "كم وجبة تتناول يوميًا؟",
    options: ["1", "2", "3", "أكثر من 3"],
  },
  {
    question: "هل لديك تفضيلات غذائية؟",
    options: ["نباتي", "متوازن", "كيتو", "بدون تفضيل"],
  },
  {
    question: "كم لترًا من الماء تشرب يوميًا؟",
    options: ["أقل من 1 لتر", "1-2 لتر", "2-3 لتر", "أكثر من 3 لتر"],
  },
  { question: "هل تدخن؟", options: ["نعم", "لا", "أحاول الإقلاع"] },
  {
    question: "كم عدد ساعات النوم التي تحصل عليها يوميًا؟",
    options: ["أقل من 5 ساعات", "5-6 ساعات", "7-8 ساعات", "أكثر من 8 ساعات"],
  },
  {
    question: "هل لديك أي حالات طبية؟",
    options: ["سكري", "ارتفاع ضغط الدم", "أمراض القلب", "لا شيء"],
  },
  {
    question: "ما مدى نشاط روتينك اليومي؟",
    options: ["خامل", "نشاط خفيف", "نشاط معتدل", "نشاط عالي"],
  },
  {
    question: "هل تتابع استهلاكك للسعرات الحرارية؟",
    options: ["نعم، يوميًا", "أحيانًا", "نادرًا", "أبدًا"],
  },
  {
    question: "ما نوع النظام الغذائي الذي تتبعه؟",
    options: ["متوازن", "غني بالبروتين", "منخفض الكربوهيدرات", "أخرى"],
  },
  {
    question: "هل تتناول المكملات الغذائية؟",
    options: ["نعم", "لا", "أحيانًا"],
  },
  {
    question: "هل أنت مهتم بتخطيط الوجبات؟",
    options: ["نعم", "لا", "ربما"],
  },
  {
    question: "هل تشعر بالتعب أو الضعف غالبًا؟",
    options: ["نعم", "نادرًا", "أبدًا"],
  },
  {
    question: "هل تعاني من تساقط الشعر أو ضعف الأظافر؟",
    options: ["نعم", "نادرًا", "أبدًا"],
  },
  {
    question: "هل لديك جفاف في الجلد أو تشققات في زوايا الفم؟",
    options: ["نعم", "لا"],
  },
  {
    question: "هل تعاني من تشنجات عضلية أو وخز متكرر؟",
    options: ["نعم", "لا"],
  },
  {
    question: "هل تواجه صعوبة في الرؤية الليلية؟",
    options: ["نعم", "لا"],
  },
];

const OverallQuestions = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [direction, setDirection] = useState(1);
  const { userDetails, setUserDetails, setVitaminDeficiencies } =
    useContext(MealsContext);

  /////////////////////////////////////////////////////////

  const activityMap = {
    أبدًا: 1.2,
    "1-2 مرات أسبوعيًا": 1.375,
    "3-4 مرات أسبوعيًا": 1.55,
    يوميًا: 1.725,
  };

  const routineMap = {
    خامل: 1.2,
    "نشاط خفيف": 1.375,
    "نشاط معتدل": 1.55,
    "نشاط عالي": 1.725,
  };

  const waterIntakeMap = {
    "أقل من 1 لتر": -0.1,
    "1-2 لتر": 0,
    "2-3 لتر": 0.1,
    "أكثر من 3 لتر": 0.2,
  };

  const medicalConditionMap = {
    سكري: -0.1,
    "ارتفاع ضغط الدم": -0.1,
    "أمراض القلب": -0.2,
    "لا شيء": 0,
  };

  const sleepMap = {
    "أقل من 5 ساعات": -0.2,
    "5-6 ساعات": -0.1,
    "7-8 ساعات": 0,
    "أكثر من 8 ساعات": 0.1,
  };

  const smokingMap = {
    نعم: -0.2,
    لا: 0.1,
    "أحاول الإقلاع": -0.1,
  };

  const exerciseLevel = selectedOptions[1] || "أبدًا";
  const dailyRoutine = selectedOptions[9] || "خامل";
  const waterIntake = selectedOptions[4] || "1-2 لتر";
  const medicalCondition = selectedOptions[8] || "لا شيء";
  const sleepQuality = selectedOptions[7] || "7-8 ساعات";
  const smokingStatus = selectedOptions[5] || "لا";

  const exerciseMultiplier = activityMap[exerciseLevel] || 1.2;
  const routineMultiplier = routineMap[dailyRoutine] || 1.2;
  const waterEffect = waterIntakeMap[waterIntake] || 0;
  const medicalEffect = medicalConditionMap[medicalCondition] || 0;
  const sleepEffect = sleepMap[sleepQuality] || 0;
  const smokingEffect = smokingMap[smokingStatus] || 0;

  const activityLevel = (
    (exerciseMultiplier + routineMultiplier) / 2 +
    waterEffect +
    medicalEffect +
    sleepEffect +
    smokingEffect
  ).toFixed(2);

  //////////////////// vitaminDeficiencies /////////////////

  const vitaminDeficiencyMap = {
    "هل تشعر بالتعب أو الضعف غالبًا؟": "فيتامين B12, فيتامين D",
    "هل تعاني من تساقط الشعر أو ضعف الأظافر؟": "البيوتين, الزنك, الحديد",
    "هل لديك جفاف في الجلد أو تشققات في زوايا الفم؟": "فيتامين B2, أوميغا-3",
    "هل تعاني من تشنجات عضلية أو وخز متكرر؟":
      "المغنيسيوم, البوتاسيوم, الكالسيوم",
    "هل تواجه صعوبة في الرؤية الليلية؟": "فيتامين A",
  };

  const vitaminDeficiencies = useMemo(() => {
    return questions
      .slice(-5)
      .filter(
        (q, index) => selectedOptions[questions.length - 5 + index] === "نعم"
      )
      .map((q) => vitaminDeficiencyMap[q.question]);
  }, [selectedOptions, questions]);

  useEffect(() => {
    setVitaminDeficiencies(vitaminDeficiencies);
    console.log(vitaminDeficiencies);
  }, [vitaminDeficiencies]);

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
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: "12px",
            bgcolor: "#A34BCE",
            color: "#fff",
            width: "90px",
            padding: "5px",
            borderRadius: "5px",
            textAlign: "center",
            fontWeight: "600",
          }}
          gutterBottom
        >
          تقييم حالتك الصحية
        </Typography>
        <MobileStepper
          variant="progress"
          steps={questions.length}
          position="static"
          activeStep={activeStep}
          sx={{
            bgcolor: "transparent",
            width: "196%",
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
                    <ListItemText primary={option} sx={{ flex: "0 0 auto" }} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </motion.div>
        </AnimatePresence>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: "row",
          width: "100%",
        }}
      >
        <Box sx={{ width: "auto" }}>
          {activeStep > 0 && (
            <IconButton
              onClick={handleBack}
              size="large"
              sx={{
                bgcolor: "#E7EDf5",
                "&:hover": { bgcolor: "#DEE4EB" },
                width: 60,
                height: 60,
              }}
            >
              <KeyboardArrowRight />
            </IconButton>
          )}
        </Box>
        <Box sx={{ width: "100%" }}>
          {activeStep === questions.length - 1 &&
          selectedOptions[activeStep] ? (
            <Link to="/custom-diet">
              <Button
                size="large"
                sx={{
                  borderRadius: "50px",
                  backgroundColor: "#A34BCE",
                  color: "white",
                  height: 60,
                  fontWeight: "bold",
                  textTransform: "none",
                  fontSize: "18px",
                  "&:hover": {
                    backgroundColor: "#A34BCE",
                  },
                  width: "100%",
                }}
              >
                التالي
              </Button>
            </Link>
          ) : (
            ""
          )}
        </Box>
      </Box>
    </Stack>
  );
};

export default OverallQuestions;

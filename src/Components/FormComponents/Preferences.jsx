import { useState } from "react";
import {
  Box,
  Button,
  createTheme,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  DirectionsBike,
  DirectionsRun,
  KeyboardArrowLeft,
  RocketLaunch,
} from "@mui/icons-material";

const Preferences = () => {
  const [preferences, setPreferences] = useState({
    goal: "",
    idealWeight: "",
    duration: 0,
  });
  const [visibleFields, setVisibleFields] = useState(["goal"]);
  const [duration, setDuration] = useState(45);

  const marks = [
    { value: 90, label: <DirectionsRun fontSize="large" /> },
    { value: 45, label: <DirectionsBike fontSize="large" /> },
    { value: 30, label: <RocketLaunch fontSize="large" /> },
  ];

  const handleChange = (field, value) => {
    setPreferences((prev) => ({ ...prev, [field]: value }));

    if (field === "goal" && !visibleFields.includes("idealWeight")) {
      setVisibleFields([...visibleFields, "idealWeight"]);
    } else if (field === "idealWeight" && !visibleFields.includes("duration")) {
      setVisibleFields([...visibleFields, "duration"]);
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#A34BCE",
      },
    },
  });

  console.log(preferences);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        position: "relative",
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
            mb: "12px",
          }}
          gutterBottom
        >
          Goal & Profile
        </Typography>
        <hr
          style={{
            border: "2px solid #D8BFF2",
            width: "94%",
            marginLeft: "8px",
          }}
        />
      </Box>

      <Box>
        {visibleFields.includes("goal") && (
          <>
            <Stack
              sx={{
                mb: 7,
              }}
            >
              <Box
                sx={{
                  mx: "auto",
                }}
              >
                <Typography
                  sx={{ fontSize: "18px", textAlign: "center", my: 2 }}
                  gutterBottom
                >
                  What is your goal
                </Typography>
                <FormControl component="fieldset" sx={{ mb: 2 }}>
                  <RadioGroup
                    value={preferences.goal}
                    onChange={(e) => handleChange("goal", e.target.value)}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 3,
                      ml: 1,
                      mt: 1,
                    }}
                  >
                    {["Losing weight", "Gaining muscle"].map((option) => (
                      <FormControlLabel
                        key={option}
                        value={option}
                        control={<Radio sx={{ display: "none" }} />}
                        label={
                          <ThemeProvider theme={theme}>
                            <Button
                              color="primary"
                              size="large"
                              variant={
                                preferences.goal === option
                                  ? "contained"
                                  : "outlined"
                              }
                              onClick={() => handleChange("goal", option)}
                              sx={{
                                borderRadius: "50px",
                                textTransform: "none",
                                px: 3,
                                py: 1,
                                fontWeight: "600",
                                border: "2px solid #A34BCE",
                                width: "400px",
                                bgColor: "#F5F8FC",
                              }}
                            >
                              {option}
                            </Button>
                          </ThemeProvider>
                        }
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Box>
            </Stack>
          </>
        )}

        {visibleFields.includes("idealWeight") && (
          <>
            <Typography sx={{ fontSize: "18px" }} gutterBottom>
              What would be your ideal weight?
            </Typography>
            <TextField
              fullWidth
              type="number"
              value={preferences.idealWeight}
              onChange={(e) => handleChange("idealWeight", e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <Typography sx={{ fontSize: "18px", ml: 1 }}>kg</Typography>
                ),
              }}
            />
          </>
        )}

        {visibleFields.includes("duration") && (
          <>
            <Box sx={{ width: "80%", textAlign: "center", mt: 10, mx: "auto" }}>
              <Typography
                sx={{ fontSize: "18px", fontWeight: "" }}
                gutterBottom
              >
                Set Your Pace: Pick Your Days! 🚀🔥
              </Typography>
              <Typography variant="body2" mt={1}>
                Selected Duration: <strong>{duration} days</strong>
              </Typography>
              <Slider
                value={duration}
                min={30}
                max={90}
                step={null}
                marks={marks}
                onChange={(e, newValue) => {
                  setDuration(newValue);
                  handleChange("duration", e.target.value);
                }}
                sx={{
                  ".MuiSlider-markLabel": { mt: 2 },
                  "& .MuiSlider-thumb": { bgcolor: "#A34BCE" },
                  "& .MuiSlider-track": { bgcolor: "#A34BCE" },
                  "& .MuiSlider-rail": { opacity: 0.5, color: "#D8BFF2" },
                }}
              />
            </Box>
          </>
        )}
      </Box>

      <Link to="/details">
        <IconButton
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
      </Link>

      {visibleFields.includes("duration") && preferences.duration && (
        <Link to="/Preferences">
          <Button
            size="large"
            sx={{
              borderRadius: "50px",
              backgroundColor: "#A34BCE",
              color: "white",
              width: { xs: "70%", sm: "80%" },
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
      )}
    </Box>
  );
};

export default Preferences;

import { useState } from "react";
import { Box, Typography, IconButton, Stack, Button } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    img: "/purple-foods.jpg",
    text: "When it comes to nutrition, finding what works for you makes all the difference.",
  },
  {
    img: "/1G-WEGYqtUqpFoh6W6VJHRw.jpg",
    text: "Healthy eating is the foundation of a strong body.",
  },
  {
    img: "/build-a-healthy-nutrition-foundation-for-youth-athletes.jpg",
    text: "Stay active, eat well, and live your best life.",
  },
];

export default function Welcome() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <Box sx={{}}>
      <Stack
        sx={{
          p: 5,
        }}
      >
        <Typography
          sx={{
            mb: 10,
            fontSize: "30px",
            fontWeight: "600",
            textAlign: "center",
            color: "#201325",
          }}
        >
          Welcome!
        </Typography>
        <Box
          sx={{
            maxWidth: "350px",
            height: "400px",
            cursor: "pointer",
            textAlign: "center",
            p: 2,
            borderRadius: "12px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            bgcolor: "white",
            mb: {sm:16,xs:5},
            mx: "auto",
            
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Box
                sx={{
                  backgroundColor: "#D8BFF2",
                  borderRadius: {sm:"28px",xs:'24px'},
                  p: {sm:"16px",xs:'12px'},
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={slides[currentIndex].img}
                  alt="Nutrition"
                  style={{
                    width: "100%",
                    height: {sm:"210px"},
                    borderRadius: "12px",
                  }}
                />
              </Box>

              <Typography
                variant="body1"
                sx={{ my: 5, color: "#333", fontWeight: 600, fontSize: {sm: "20px"} }}
              >
                {slides[currentIndex].text}
              </Typography>
            </motion.div>
          </AnimatePresence>

          {/* Pagination Dots */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            {slides.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  bgcolor: index === currentIndex ? "#555" : "#ccc",
                  mx: 0.5,
                  transition: "0.3s",
                }}
              />
            ))}
          </Box>

          {currentIndex !== 0 ? (
            <IconButton
              onClick={prevSlide}
              sx={{
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "white",
                boxShadow: 2,
                "&:hover": { bgcolor: "#f5f5f5" },
              }}
            >
              <ArrowBackIos />
            </IconButton>
          ) : (
            ""
          )}

          {currentIndex !== slides.length - 1 ? (
            <IconButton
              onClick={nextSlide}
              sx={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "white",
                boxShadow: 2,
                "&:hover": { bgcolor: "#f5f5f5" },
              }}
            >
              <ArrowForwardIos />
            </IconButton>
          ) : (
            ""
          )}
        </Box>

        {currentIndex === slides.length - 1 ? (
          <Link to="/overall">
            <Button
              size="large"
              sx={{
                borderRadius: "50px",
                backgroundColor: "#A34BCE",
                color: "white",
                width: "100%",
                height: "60px",
                fontWeight: "bold",
                textTransform: "none",
                fontSize: "18px",
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
      </Stack>
    </Box>
  );
}

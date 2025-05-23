import { useState } from "react";
import { Box, Typography, IconButton, Stack, Button } from "@mui/material";
import { ChevronRight, ChevronLeft } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    img: "/welcome-1.webp",
    text: "عندما يتعلق الأمر بالتغذية، فإن العثور على ما يناسبك يُحدث فرقًا كبيرًا.",
  },
  {
    img: "/welcome-2.webp",
    text: "التغذية الصحية هي أساس الجسم القوي.",
  },
  {
    img: "/welcome-3.webp",
    text: "كن نشيطًا، تناول طعامًا صحيًا، وعِش حياتك بأفضل شكل.",
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
    <Stack
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Typography
        sx={{
          mt: { xs: 8, sm: 8 },
          fontSize: "30px",
          fontWeight: "600",
          textAlign: "center",
          color: "#201325",
        }}
      >
        مرحباً
      </Typography>
      <Box
        sx={{
          maxWidth: { xs: "300px", sm: "380px" },
          height: "550px",
          cursor: "pointer",
          textAlign: "center",
          p: { xs: 5, sm: 2 },
          borderRadius: "12px",
          display: "flex",
          justifyContent: { xs: "start", sm: "start" },
          flexDirection: "column",
          mb: 2,
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
                borderRadius: { sm: "22px", xs: "18px" },
                p: { sm: "10px", xs: "6px" },
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
                  borderRadius: "12px",
                  objectFit: "cover",
                  loading: "eager",
                  fetchpriority: "high",
                }}
              />
            </Box>

            <Typography
              variant="body1"
              sx={{
                my: 3,
                color: "#333",
                fontWeight: 600,
                fontSize: { sm: "20px" },
                height: "70px",
              }}
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
                bgcolor: index === currentIndex ? "#A34BCE" : "#cce",
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
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "white",
              boxShadow: 2,
              "&:hover": { bgcolor: "#f5f5f5" },
              width: { xs: 40, sm: 50, md: 60 },
              height: { xs: 40, sm: 50, md: 60 },
            }}
          >
            <ChevronRight
              fontSize="large"
              pr={1}
              sx={{ fontSize: { xs: 20, sm: 30, md: 40 } }}
            />
          </IconButton>
        ) : (
          ""
        )}

        {currentIndex !== slides.length - 1 ? (
          <IconButton
            onClick={nextSlide}
            sx={{
              position: "absolute",
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "white",
              boxShadow: 2,
              "&:hover": { bgcolor: "#f5f5f5" },
              width: { xs: 40, sm: 50, md: 60 },
              height: { xs: 40, sm: 50, md: 60 },
            }}
          >
            <ChevronLeft
              fontSize="large"
              sx={{ fontSize: { xs: 20, sm: 30, md: 40 } }}
            />
          </IconButton>
        ) : (
          ""
        )}
      </Box>
      <Box>
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
              التالي
            </Button>
          </Link>
        ) : (
          ""
        )}
      </Box>
    </Stack>
  );
}

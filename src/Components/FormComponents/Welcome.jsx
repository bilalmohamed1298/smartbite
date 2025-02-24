import { useState } from "react";
import { Box, Typography, IconButton, Stack, Button } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Link } from "react-router-dom";

const slides = [
  {
    img: "/pizza.jpg",
    text: "When it comes to nutrition, finding what works for you makes all the difference.",
  },
  {
    img: "/pizza.jpg",
    text: "Healthy eating is the foundation of a strong body.",
  },
  {
    img: "/pizza.jpg",
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
          }}
        >
          Welcome!
        </Typography>
        <Box
          sx={{
            maxWidth: "330px",
            height: "400px",
            cursor: "pointer",
            textAlign: "center",
            p: 2,
            borderRadius: "12px",
            boxShadow: 3,
            bgcolor: "white",
            mb: 18,
            mx: "auto",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#FFEFEF",
              borderRadius: "12px",
              p: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}
          >
            <img
              src={slides[currentIndex].img}
              alt="Nutrition"
              style={{ width: "100%", borderRadius: 10 }}
            />
          </Box>

          <Typography
            variant="body1"
            sx={{ my: 5, color: "#333", fontWeight: 600, fontSize: "18px" }}
          >
            {slides[currentIndex].text}
          </Typography>

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

          {/* Pagination Dots */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            {slides.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: index === currentIndex ? "#555" : "#ccc",
                  mx: 0.5,
                  transition: "0.3s",
                }}
              />
            ))}
          </Box>
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
                fontSize:'18px',
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

import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const Logo = () => {
  return (
    <Stack
      display={{ xs: "none", lg: "flex" }}
      sx={{
        mt: 1,
      }}
    >
      <Box
        sx={{
          mx: "auto",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <img
          src="/logo.png"
          alt=""
          style={{
            width: "60px",
            borderRadius: "30%",
          }}
        />

        <Typography
          sx={{
            fontSize: "45px",
            fontWeight: "600",
            color: "#201325",
          }}
        >
          NutriVibe
        </Typography>
      </Box>
    </Stack>
  );
};

export default Logo;

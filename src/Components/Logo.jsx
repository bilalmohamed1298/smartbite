import { Box, Stack, Typography } from "@mui/material";
import { text } from "framer-motion/client";
import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" style={{textDecoration: "none",}}>
    <Stack
      display={{ xs: "none", lg: "flex" }}
      sx={{
        mt: 0,
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
        <Typography
          sx={{
            fontSize: "45px",
            fontWeight: "600",
            color: "#201325",
          }}
        >
          Smartbite
        </Typography>

        <img
          src="/logo.webp"
          alt="Logo"
          style={{
            width: "65px",
            borderRadius: "30%",
          }}
        />
      </Box>

    </Stack>
    </Link>
  );
};

export default Logo;

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { Button, Box, Typography, Paper, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { KeyboardArrowLeft } from "@mui/icons-material";

const data = [
  { name: "", generic: 40, weight: 78 },
  { name: "", generic: 30, weight: 72 },
  { name: "", generic: 40, weight: 60 },
  { name: "", generic: 70, weight: 50 },
  { name: "", generic: 80, weight: 40 },
];

const CustomDietComponent = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#fcf6ff",
        borderRadius: 4,
        height: "100%",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Typography
        fontWeight="bold"
        gutterBottom
        sx={{ mt: {xs:7,sm:10},mx:'auto', fontSize: { xs: "22px", sm: "40px" },width:{xs:'80%',sm:'60%'} }}
      >
        The perfect diet is the one tailored for you.
      </Typography>

      <Paper
        sx={{
          p: 2,
          borderRadius: 2,
          boxShadow: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: { xs: "80%", sm: "50%" },
          mx: "auto",
        }}
      >
        <ResponsiveContainer width={"100%"} height={190}>
          <AreaChart
            data={data}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <XAxis hide />
            <YAxis hide />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="generic"
              stroke="#A7B3C3"
              fill="#A7B3C3"
              fillOpacity={0.1}
              strokeWidth={3}
              dot={{ stroke: "#A7B3C3", strokeWidth: 2, r: 4 }}
            />
            <Area
              type="monotone"
              dataKey="weight"
              stroke="#A34BCE"
              fill="#A34BCE"
              fillOpacity={0.2}
              strokeWidth={3}
              dot={{ stroke: "#A34BCE", strokeWidth: 2, r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          px={2}
          mt={1}
        >
          <Box
            sx={{
              backgroundColor: "#A7B3C3",
              color: "white",
              px: 1,
              py: 0.5,
              borderRadius: 1,
              fontSize: 14,
            }}
          >
            Generic program
          </Box>
          <Box
            sx={{
              backgroundColor: "#A34BCE",
              color: "white",
              px: 1,
              py: 0.5,
              borderRadius: 1,
              fontSize: 14,
            }}
          >
            Weight
          </Box>
        </Box>
      </Paper>

      <Typography
        color="textSecondary"
        my={2}
        mx={"auto"}
        sx={{
          fontSize: { xs: "14px", sm: "18px" },
          width: { xs: "100%", sm: "80%" },
        }}
      >
        Smartbite helps you discover the perfect plan to achieve your goals.
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: "row",
          width: "100%",
          
        }}
      >
        <Box sx={{ width: "auto" }}>
          <Link to="/overall">
            <IconButton
              size="large"
              sx={{
                bgcolor: "#E7EDf5",
                "&:hover": { bgcolor: "#DEE4EB" },
                width: 60,
                height: 60,
              }}
            >
              <KeyboardArrowLeft />
            </IconButton>
          </Link>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Link to="/details">
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
                  width:'100%'
                }}
            >
              Let’s Discover You
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default CustomDietComponent;

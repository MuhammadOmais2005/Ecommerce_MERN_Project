import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import SecurityIcon from "@mui/icons-material/Security";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { useSelector } from "react-redux";

const features = [
  {
    icon: <LocalShippingIcon fontSize="large" />,
    title: "Free Shipping",
    description: "Fast & reliable delivery across the country.",
  },
  {
    icon: <AutorenewIcon fontSize="large" />,
    title: "Easy Returns",
    description: "7-day easy return and exchange policy.",
  },
  {
    icon: <SecurityIcon fontSize="large" />,
    title: "Secure Payment",
    description: "100% secure payment gateway.",
  },
  {
    icon: <SupportAgentIcon fontSize="large" />,
    title: "24/7 Support",
    description: "Support team always available.",
  },
  {
    icon: <SupportAgentIcon fontSize="large" />,
    title: "Cash on Delivery",
    description: "Pay when you receive your order.",
  },
];

const WhyChooseUs = () => {


  const { mode } = useSelector((state) => {
    return state.theme
  })


  return (
    <Box sx={{ mb: 12, backgroundColor: "" }}>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" sx={{ color: "primary.main" }} fontWeight="400" mb={6}>
          WHY CHOOSE US
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            columnGap: { sm: "1rem", md: "2rem", lg: "3rem", xl: "4rem" },
            rowGap: { xs: "1rem", sm: "1rem", md: "2rem", lg: "3rem", xl: "4rem" },
            justifyContent: "center",
            alignItems: "stretch"
          }}
        >
          {features.map((feature, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: "card.main",
                textAlign: "center",
                boxShadow: mode ? "0px 4px 20px rgba(0,0,0,0.2)" : "0px 4px 20px rgba(255,255,255,0.4)",
                px: 3,
                py: { xs: 5, md: 3 },
                borderRadius: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: 6,
                },
                flexBasis: { xs: '80%', sm: 'calc((100% - (1 * 1rem)) / 2 )', md: 'calc((100% - (2 * 2rem)) / 3 )', lg: 'calc((100% - (2 * 3rem)) / 3 )', xl: 'calc((100% - (2 * 4rem)) / 3 )' }
              }}
            >
              <Box>
                <Avatar
                  sx={{
                    bgcolor: "primary.main",
                    width: 60,
                    height: 60,
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  {feature.icon}
                </Avatar>

                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {feature.title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

      </Container>
    </Box>
  );
};

export default WhyChooseUs;

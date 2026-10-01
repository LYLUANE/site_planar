import { Box, Divider, Grid, Link, Stack, Typography } from "@mui/material";

import { Call, LocalPostOffice } from "@mui/icons-material";

function Footer() {
  return (
    <Grid
      sx={{
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#c8bcac",
        position: "center",
        width: "30%",
        ml: "650px",
      }}
    >
      <Box sx={{ borderColor: "purple" }}>
        <Grid
          sx={{
            borderColor: "red",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Divider sx={{ borderColor: "white" }} />
          <Typography
            variant="h1"
            sx={{ letterSpacing: 3, fontWeight: 700, color: "#e0e0e0" }}
          >
            <Box
              component="span"
              sx={{ opacity: 0.5, fontSize: "0.75rem", mr: 0.5 }}
            >
              PLANAR
            </Box>{" "}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              letterSpacing: 3,
              fontWeight: 700,
              color: "#e0e0e0",
              ml: "100px",
              mt: "50px",
            }}
          >
            <Box
              component="span"
              sx={{ opacity: 0.5, fontSize: "0.75rem", mr: 0.5, mb: "2px" }}
            ></Box>{" "}
            <LocalPostOffice /> Email:
            <Link sx={{ ml: "10px" }}>planar_moveis@gmail.com</Link>
          </Typography>

          <Typography
            variant="body2"
            sx={{
              letterSpacing: 3,
              fontWeight: 700,
              color: "#e0e0e0",
              ml: "100px",
              mt: "50px",
            }}
          >
            <Box
              component="span"
              sx={{ opacity: 0.5, fontSize: "0.75rem", mr: 0.5 }}
            ></Box>{" "}
            <Call /> Telefone:(14)-996651162
          </Typography>
        </Grid>
      </Box>
    </Grid>
  );
}
export default Footer;

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Image } from "mui-image";
import { siteUrl, localUrl } from "./const";

export default function BtnAppBar() {
  const redirectToHomepage = () => {
    window.location.replace(localUrl);
  };
  return (
    <Box sx={{ color: "primary.main", bgcolor: "text.primary" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Image
              src="https://i.ibb.co/PCLy9nc/RCSSA-120x120.jpg"
              fit="contain"
              height="5vh"
            />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button color="inherit" onClick={redirectToHomepage}>
              RCSSA接机平台
            </Button>
          </Typography>
          <Button color="inherit" onClick={redirectToHomepage}>
            主页
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

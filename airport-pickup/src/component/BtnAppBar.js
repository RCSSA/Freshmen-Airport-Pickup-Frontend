import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { localUrl } from "../const";
import logo from "../images/logo.png";

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
            onClick={()=>window.location.replace("https://rcssa.rice.edu/")}
          >
            <img placeholder="rcssa logo" src={logo} style={{height: "55px"}}/>
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

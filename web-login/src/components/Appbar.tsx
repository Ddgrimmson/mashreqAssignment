import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LanguageSelector from "./LanguageSelector";
import { Toolbar } from "@mui/material";
import { useTranslation } from "react-i18next";

const Appbar = () => {
    const {t} = useTranslation()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {t('appName')}
        </Typography>
        <IconButton
          color="inherit"
        >
          <LanguageSelector />
        </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Appbar;
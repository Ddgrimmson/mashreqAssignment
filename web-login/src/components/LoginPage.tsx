import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { MenuItem } from "@mui/material";
import { useTheme } from "../theme/context";
import useUsernameValidation from "../hooks/useUsernameValidations";
import useCountry from "../hooks/useCountry";
import { useState } from "react";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const { setThemeName } = useTheme();
  const { country, onCountryValueChange } = useCountry();
  const { signIn } = useFirebaseAuth();
  const { getUsernameErrorMessage } = useUsernameValidation();
  const { t } = useTranslation();

  const [usernameError, setUsernameError] = useState<string | undefined>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username") || "";
    const password = data.get("password") || "";
    const usernameErrorMessage = getUsernameErrorMessage(
      country,
      username?.toString()
    );
    if (usernameErrorMessage) {
      setUsernameError(usernameErrorMessage);
    } else {
      signIn(username, password, country);
    }
    console.log({
      username,
      password,
    });
  };

  const handleCountryChange = (value: string) => {
    setThemeName(value);
    onCountryValueChange(value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t("login.signIn")}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            label={t("login.country")}
            data-testid="country"
            select
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => handleCountryChange(e.target.value)}
            required
          >
            <MenuItem value="india">{t("login.countries.India")}</MenuItem>
            <MenuItem value="uk">{t("login.countries.UnitedKingdom")}</MenuItem>
            <MenuItem value="spain">{t("login.countries.Spain")}</MenuItem>
            <MenuItem value="thailand">{t("login.countries.Thailand")}</MenuItem>
          </TextField>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label={t("login.username")}
            data-testid="username"
            name="username"
            autoComplete="username"
            autoFocus
            helperText={usernameError}
            error={usernameError !== undefined}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={t("login.password")}
            data-testid="password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            data-testid="submitBtn"
          >
            <Typography>{t("login.submitBtn")}</Typography>
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;

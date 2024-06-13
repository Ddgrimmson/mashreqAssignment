import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useTranslation } from "react-i18next";

const HomePage: React.FC = () => {
  const { logout } = useFirebaseAuth();
  const { userInfo } = useSelector((state: RootState) => state.user);
  const {t} = useTranslation();

  return (
    <Container>
      <Typography variant="h2" align="center" gutterBottom>
        {`${t('home.welcome')} ${userInfo?.username}`}
      </Typography>
      <Box sx={{my: 2}}>
      <Card>
        <CardContent>
          <Typography variant="body2" gutterBottom>
            {`${t('home.email')} : ${userInfo?.email}`}
          </Typography>
          <Typography variant="body2">
            {`${t('home.country')} : ${userInfo?.country}`}
          </Typography>
        </CardContent>
      </Card>
      </Box>
      <Box textAlign="right">
        <Button onClick={logout} variant="contained" color="primary">
          {`${t('home.logout')}`}
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;

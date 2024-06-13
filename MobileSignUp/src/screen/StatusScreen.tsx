// StatusScreen.js

import React, { useEffect, useState } from 'react';
import Container from '../components/Container';
import { auth, firestore } from '../config/firebase';
import { Button, Card, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

const StatusScreen = ({ navigation }) => {
  const [userData, setUserData] = useState();
  const {t} = useTranslation();

  const fetchUserData = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const data = (await firestore.collection('users').doc(user.uid).get()).data();
        setUserData(data)
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      navigation.navigate('Default')
    }
  };

  const logoutUser = async () => {
    // await auth.signOut()
    navigation.navigate('Default')
  }


  useEffect(() => {
    fetchUserData()
  }, [auth.currentUser]);
  return (
   <Container showAppBar={true} showLeftIcon={true} withDrawer={true} screenName={t('home.welcome')}>
    <Text variant='headlineLarge'>
      {`${t('home.welcome')} ${userData?.username}`}
    </Text>
    
    <Card>
      <Card.Content>
        <Text>{`${t('home.email')} ${userData?.email}`}</Text>
        <Text>{`${t('home.country')} ${userData?.country}`}</Text>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => logoutUser}>{t('home.logout')}</Button>
      </Card.Actions>
    </Card>
   </Container>
  );
};

export default StatusScreen;

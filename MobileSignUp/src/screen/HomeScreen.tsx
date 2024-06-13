import React, { useState } from 'react';
import {Text, RadioButton, Button} from 'react-native-paper';
import useCountry from '../hooks/useCountry';
import {useForm, Controller} from 'react-hook-form';
import {TextInput} from '../components';
import Container from '../components/Container';
import useUsernameValidation from '../hooks/useUsernameValidations';
import ConditionalView from '../components/ConditionalView';
import _ from 'lodash';
import {auth, firestore} from '../config/firebase';
import { useTranslation } from 'react-i18next';
import Loader from '../components/Loader';

const HomeScreen = ({navigation}) => {
  const {country = 'india', onCountryValueChange} = useCountry();
  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
    trigger,
  } = useForm();

  const [loader, setLoader] = useState<boolean | undefined>();

  const {t} = useTranslation()

  const {getUsernamePattern, getUsernameErrorMessage} = useUsernameValidation();
  const password = watch('password');

  const onSubmit = async data => {
    try {
      setLoader(true);
      const userCredential = await auth.createUserWithEmailAndPassword(
        data.email,
        data.password,
      );
      await userCredential.user.updateProfile({
        displayName: data.username,
      });
      const storedDatae = await firestore
        .collection('users')
        .doc(userCredential.user.uid)
        .set({
          email: data.email.toLowerCase(),
          username: data.username,
          country: country,
        });
      navigation.navigate('Status', {...data, success: true});
      setLoader(false)
    } catch (error) {
      console.log('Signup failed: ' + error);
      console.error(error);
      setLoader(false)
      // navigation.navigate('Status', {error, success: false});
    }
  };

  return (
    <Container showAppBar={true} showLeftIcon={true} withDrawer={true} screenName={t('signUp.signUp')} appBarMode='center-aligned'>
      <Loader visible={true} />
      <Text variant="labelLarge">{t('signUp.country')}</Text>
      <RadioButton.Group value={country} onValueChange={onCountryValueChange}>
        <RadioButton.Item
          labelVariant="labelSmall"
          label={t('signUp.countries.UnitedKingdom')}
          value="uk"
        />
        <RadioButton.Item
          labelVariant="labelSmall"
          label={t('signUp.countries.India')}
          value="india"
        />
        <RadioButton.Item
          labelVariant="labelSmall"
          label={t('signUp.countries.Spain')}
          value="spain"
        />
        <RadioButton.Item
          labelVariant="labelSmall"
          label={t('signUp.countries.Thailand')}
          value="thailand"
        />
      </RadioButton.Group>
      <ConditionalView condition={!_.isEmpty(country)}>
        <Controller
          control={control}
          rules={{
            required: t('signUp.errors.emailRequired'),
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              message: t('signUp.errors.emailError'),
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              label={t('signUp.email')}
              variant="outlined"
              onBlur={onBlur}
              onChangeText={e => {
                onChange(e);
                trigger('email');
              }}
              value={value}
              error={errors.email?.message}
              type="email"
            />
          )}
          name="email"
          defaultValue=""
        />
        <Controller
          control={control}
          rules={{
            required: t('signUp.errors.userNameRequired'),
            pattern: {
              value: getUsernamePattern(country),
              message: getUsernameErrorMessage(country),
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              label={t('signUp.username')}
              variant="outlined"
              onBlur={onBlur}
              onChangeText={e => {
                onChange(e);
                trigger();
              }}
              value={value}
              error={errors.username?.message}
            />
          )}
          name="username"
          defaultValue=""
        />

        <Controller
          control={control}
          rules={{required: t('signUp.errors.passwordRequired')}}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              label={t('signUp.password')}
              variant="outlined"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={e => {
                onChange(e);
                trigger();
              }}
              value={value}
              error={errors.password?.message}
            />
          )}
          name="password"
          defaultValue=""
        />

        <Controller
          control={control}
          rules={{
            required: true,
            validate: value =>
              value === password || t('signUp.errors.passwordsDoNotMatch'),
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              label={t('signUp.confirmPassword')}
              variant="outlined"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={e => {
                onChange(e);
                trigger();
              }}
              value={value}
              error={errors.confirmPassword?.message}
            />
          )}
          name="confirmPassword"
          defaultValue=""
        />

        <Button mode="contained" onPress={handleSubmit(onSubmit)}>
          {t('signUp.submitBtn')}
        </Button>
      </ConditionalView>
    </Container>
  );
};

export default HomeScreen;

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {I18nextProvider} from 'react-i18next';
import i18n from './i18n';
import AppRoutes from './src/config';
import {NavigationContainer} from '@react-navigation/native';
import { ThemeProvider } from './src/ThemeContext';
import useNotification from './src/hooks/useNotification';

const App = (): React.JSX.Element => {
  const notification = useNotification()
  return (
    <NavigationContainer>
      <I18nextProvider i18n={i18n}>
        <SafeAreaProvider>
              <ThemeProvider>
              <AppRoutes />
              </ThemeProvider>
        </SafeAreaProvider>
      </I18nextProvider>
    </NavigationContainer>
  );
};

export default App;

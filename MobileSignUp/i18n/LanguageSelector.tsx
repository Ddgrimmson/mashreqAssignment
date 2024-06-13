import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, View } from 'react-native';
import { Text } from 'react-native-paper';

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'th', name: 'ไทย' },
    { code: 'hn', name: 'हिन्दी' }
];

  return (
    <View>
      <Text variant='headlineMedium'>{t('selectLanguage')}</Text>
      {languages.map(lang => <Button title={lang.name} onPress={() => changeLanguage(lang.code)} />)}
    </View>
  );
};

export default LanguageSelector;
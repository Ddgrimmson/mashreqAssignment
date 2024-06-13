import _ from 'lodash';
import { useTranslation } from 'react-i18next';

const useUsernameValidation = () => {
  const {t} = useTranslation()
  const validationRules = {
    india: /^[a-zA-Z0-9]{5,}$/,
    uk: /^[a-zA-Z][a-zA-Z0-9]{5,}$/,
    spain: /^[a-zA-Z]{6,}$/, 
    thailand: /^[a-z0-9]{4,}$/, 
  };

  const validationErrors = {
    india: t("signUp.errors.Username should be alphanumeric with atleast 5 characters"),
    uk: t("signUp.errors.Username should begin with alphabets and can be alphanumeric with atleast 5 characters"),
    spain: t("signUp.errors.Username should contain alphabets and atleast 6 characters"),
    thailand: t("signUp.errors.Username should contain lower case alphabets and atleast 4 characters",) 
  };

  const getUsernamePattern = (key: string) => _.get(validationRules, key);

  const getUsernameErrorMessage = (key: string) => _.get(validationErrors, key);

  return {getUsernamePattern, getUsernameErrorMessage};
};

export default useUsernameValidation;

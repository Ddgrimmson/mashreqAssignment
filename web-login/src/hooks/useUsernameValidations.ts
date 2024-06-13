import { useTranslation } from "react-i18next";


const useUsernameValidation = () => {
  const {t} = useTranslation();
  const validationRules: {[key: string]: RegExp} = {
    india: /^[a-zA-Z0-9]{5,}$/,
    uk: /^[a-zA-Z][a-zA-Z0-9]{5,}$/,
    spain: /^[a-zA-Z]{6,}$/, 
    thailand: /^[a-z0-9]{4,}$/, 
  };

  const validationErrors: {[key: string]: string} = {
    india: t("login.errors.Username should be alphanumeric with atleast 5 characters"),
    uk: t("login.errors.Username should begin with alphabets and can be alphanumeric with atleast 5 characters"),
    spain: t("login.errors.Username should contain alphabets and atleast 6 characters"),
    thailand: t("login.errors.Username should contain lower case alphabets and atleast 4 characters",) 
  };

  const getUsernamePattern = (key: string) => validationRules[key];

  const getUsernameErrorMessage = (key: string, value: string | undefined) => {
    console.log(key, value)
    console.log("=======================>", getUsernamePattern(key).test(value), key,  validationErrors[key])
    return value && getUsernamePattern(key).test(value) ? undefined : validationErrors[key]
  };

  return {getUsernameErrorMessage};
};

export default useUsernameValidation;

import React from 'react';
import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  View,
} from 'react-native';
import {TextInput as PaperTextInput} from 'react-native-paper';
import ErrorText from './ErrorText';
import ConditionalView from './ConditionalView';
import _ from 'lodash'

interface TextInputProps {
  onChange:
    | ((e: NativeSyntheticEvent<TextInputChangeEventData>) => void)
    | undefined;
  value: string;
  error: any;
  variant: 'flat' | 'outlined' | undefined;
  label: string;
  secureTextEntry?: boolean
}

const TextInput = (props: TextInputProps) => {
  const {variant, error, onChange, label, ...rest} = props;
  return (
    <View style={{width: '100%', marginBottom: 20}}>
      <PaperTextInput accessibilityLabel={label} label={label} mode={variant} onChange={onChange} {...rest} />
      <ConditionalView condition={!_.isEmpty(error)}>
        <ErrorText>{error}</ErrorText>
      </ConditionalView>
    </View>
  );
};

export default TextInput;

import React from 'react';
import {
  Input, Label, styled,
} from 'tamagui';
import { NativeSyntheticEvent, TextInputChangeEventData, Text } from 'react-native';
import LabelTextComponent from './labelText.component';

const InputText = styled(Input, {
  name: 'InputText',
  width: 300,
  borderColor: '#000',
  marginBottom: 5,
});

type Props = {
    placeholder: string,
    value: string,
    onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    isPassword: boolean,
    inputId: string,
    label: string,
    isBlackText: boolean,
    defaultValue?: string,
    errorText?: string,
}
const InputComponent = ({
  placeholder, value, onChange, isPassword, inputId, label, isBlackText, defaultValue, errorText,
}: Props) => (
  <>
    <LabelTextComponent isBlack={isBlackText} htmlFor={inputId} text={label} />
    <InputText size="$4" borderWidth={1} placeholder={defaultValue ?? placeholder} value={value} onChange={onChange} secureTextEntry={isPassword} id={inputId} />
    {errorText && <Text style={{ color: 'red' }}>{errorText}</Text> }
  </>
);

export default InputComponent;

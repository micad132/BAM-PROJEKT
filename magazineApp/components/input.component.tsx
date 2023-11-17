import React from 'react';
import {
  Input, Label, styled,
} from 'tamagui';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

const InputText = styled(Input, {
  name: 'InputText',
  width: 300,
  borderColor: '#000',
  marginBottom: 5,
});

const LabelText = styled(Label, {
  color: '#fff',
});

type Props = {
    placeholder: string,
    value: string,
    onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    isPassword: boolean,
    inputId: string,
    label: string,
}
const InputComponent = ({
  placeholder, value, onChange, isPassword, inputId, label,
}: Props) => (
  <>
    <LabelText htmlFor={inputId}>{label}</LabelText>
    <InputText size="$4" borderWidth={1} placeholder={placeholder} value={value} onChange={onChange} secureTextEntry={isPassword} id={inputId} />
  </>
);

export default InputComponent;

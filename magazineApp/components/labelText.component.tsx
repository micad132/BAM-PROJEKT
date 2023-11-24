import React from 'react';
import { Label } from 'tamagui';

type Props = {
    isBlack: boolean,
    text: string,
    htmlFor: string,
}

const LabelTextComponent = ({ isBlack, text, htmlFor }: Props) => (
  <Label style={{ color: isBlack ? '#000' : '#fff' }} htmlFor={htmlFor}>
    {text}
  </Label>
);

export default LabelTextComponent;

import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import theme from '../../styles/theme';
import {
  Container,
  IconContainer,
  InputText
} from './styles';

//tipagem dos icones
interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}

export function Input({ iconName, value, ...rest }: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const theme = useTheme();

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value); //tem conteúdo? True | não tem conteúdo? False
  }

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail}
          size={24}
        />
      </IconContainer>
      <InputText
        {...rest}
        isFocused={isFocused}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
    </Container>
  );
}

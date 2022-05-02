import React from 'react';
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
  iconName: React.ComponentProps<typeof Feather>['name']
}

export function Input({ iconName, ...rest }: Props) {

  const theme = useTheme();

  return (
    <Container>
      <IconContainer>
        <Feather
          name={iconName}
          color={theme.colors.text_detail}
          size={24}
        />
      </IconContainer>
      <InputText
        {...rest}
      />
    </Container>
  );
}

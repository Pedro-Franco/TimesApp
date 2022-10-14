import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';

import { Container } from './styles';

export function Input({...rest}: TextInputProps) {
  
  //desestruturando as cores para usar no INPUT
  const { COLORS } = useTheme();

  return(
    <Container
      placeholderTextColor={COLORS.GRAY_300}
      {...rest}
    />
  );
}
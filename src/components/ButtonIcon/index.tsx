import { TouchableOpacityProps } from 'react-native';
import { Container, Icon, ButtonIconTypeStyleProps } from './styles';
import { MaterialIcons } from '@expo/vector-icons';

type Props = TouchableOpacityProps & {

  //deixando dinamico para usar as propriedades do material-icons
  icon: keyof typeof MaterialIcons.glyphMap
  type?: ButtonIconTypeStyleProps;
}

export function ButtonIcon({ icon, type = 'PRIMARY', ...rest}: Props) {
  return(
    <Container>
      <Icon 
        name={icon}
        type={type}
        {...rest}
      />
    </Container>
  );
}
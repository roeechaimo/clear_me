import { useNavigate } from 'react-router-dom';
import NavWrapper from '../../styles/navWrapper/NavWrapper';
import AppButton from '../appButton/AppButton';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <NavWrapper>
      <AppButton onButtonClick={() => navigate(-1)} buttonText={'Back'} />
    </NavWrapper>
  );
}

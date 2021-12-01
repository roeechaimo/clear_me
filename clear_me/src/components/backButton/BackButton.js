import { useNavigate } from 'react-router-dom';
import AppButton from '../appButton/AppButton';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <div className="nav-wrapper">
      <AppButton onButtonClick={() => navigate(-1)} buttonText={'Back'} />
    </div>
  );
}

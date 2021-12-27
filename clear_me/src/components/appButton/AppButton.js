import styled from 'styled-components';
import Button from '../../styles/button/Button';

const ButtonWrapper = styled.div`
  margin: 1%;
`;

export default function AppButton({ onButtonClick = null, buttonText = '', style = {} }) {
  return (
    <ButtonWrapper>
      <Button onClick={onButtonClick} style={style}>
        {buttonText}
      </Button>
    </ButtonWrapper>
  );
}

import styled from 'styled-components';

const Button = styled.span`
  padding: 5px;
  border: 1px solid ${(props) => props.theme.colors.primary};
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
`;

export default Button;

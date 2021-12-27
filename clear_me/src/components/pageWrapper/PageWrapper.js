import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: auto;
  margin-bottom: 2%;
`;

export default function PageWrapper({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

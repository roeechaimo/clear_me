import styled from 'styled-components';

const ErrorSpan = styled.span`
  color: ${(props) => props.theme.colors.error};
`;

const ErrorParagragh = styled.p`
  color: ${(props) => props.theme.colors.error};
  ${(props) => props?.style};
`;

export default function ErrorText({ isParagragh = false, text = '', style = {} }) {
  return isParagragh ? (
    <ErrorParagragh style={style}>{text}</ErrorParagragh>
  ) : (
    <ErrorSpan style={style}>{text}</ErrorSpan>
  );
}

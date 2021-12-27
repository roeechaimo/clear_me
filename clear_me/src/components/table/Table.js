import styled from 'styled-components';

const StylesTable = styled.table`
  border-spacing: 0px;
  border-top: 1px solid #000000;
  border-bottom: 1px solid #000000;
  width: 75%;
  border-radius: 5px;

  thead {
    background-color: #808080;
  }

  thead td:first-child {
    border-top-left-radius: 5px;
  }

  thead td:last-child {
    border-top-right-radius: 5px;
  }

  tbody tr:last-child td:first-child {
    border-bottom-left-radius: 5px;
  }

  tbody tr:last-child td:last-child {
    border-bottom-right-radius: 5px;
  }

  tbody tr:nth-child(2n) {
    background: #d8d8d8;
  }

  tbody > tr > td {
    cursor: ${(props) => props?.cursor || 'initial'};
  }

  tr,
  td {
    padding: 5px;
  }

  td {
    border-right: 1px solid #000000;
    border-left: 1px solid #000000;
  }

  td:first-child {
    border-right: none;
  }

  td:last-child {
    border-left: none;
  }

  td input[type='checkbox']:disabled {
    background-color: green;
    color: green;
  }

  td input[type='checkbox'] {
    background-color: green;
    color: green;
  }
`;

export default function Table({ cursor, children }) {
  return <StylesTable cursor={cursor}>{children}</StylesTable>;
}

import styled from 'styled-components';

export const Container = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell,
    'Helvetica Neue', sans-serif;
`;

export const Table = styled.table`
  width: 883px;
  height: 13px;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.14px;
  /* color: #333333; */

  td {
    border-bottom: 1px solid #ddd;

    text-align: left;
    padding: 8px;
  }
  .not-first:hover {
    background-color: #dddddd;
    cursor: pointer;
  }
  th {
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
    padding: 8px;
    text-align: left;
    color: gray;
  }
`;

export const Button = styled.button`
  width: 76px;
  height: 28px;
  border-radius: 4px;
  border: solid 1px #ee0000;
  background-color: white;
  float: right;

  &:active {
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }

  &:hover {
    cursor: pointer;
    background-color: #db212160;
  }
`;

export const H1 = styled.h1`
  display: inline;
`;

export const FlexRow = styled.div`
  display: flex;
`;

export const FlexColumn = styled.div`
  flex: 50%;
  padding: 10px;
  height: 400px;
`;


export const Input = styled.input`
  margin: 10px auto;
  width: 240px;

  &:focus {
    border: 1px solid rgba(59, 153, 252, 0.5);
    box-shadow: 0 0 10px #719ece;
  }
`;

export const Label = styled.label`
  display: block;
`;

import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Container, Button, H1 } from './UserStyles';

const ShowUser = (props) => {
  const location = useLocation();
  const email = window.atob(window.location.pathname.replace('/users/', ''));
  const user = location.state && location.state.user;

  return (
    <UserContainer>
      {user && user.email ? (
        <>
          <H1>{user.email}</H1>
          <SaveBtn type="submit">
            {/* <Button onClick={handleSubmit} type="submit"> */}
            Save
          </SaveBtn>
          <hr />
          <FlexRow>
              <FlexColumn>hi</FlexColumn>
              <FlexColumn style={{borderLeft: "1px solid rgba(77, 76, 76, 0.993)"}}>hola</FlexColumn>
          </FlexRow>
        </>
      ) : (
        <h1>Something funky happened! Just go back to the previous page and try again.</h1>
      )}
    </UserContainer>
  );
};

export default ShowUser;

const UserContainer = styled(Container)`
  padding: 40px;
`;

const FlexRow = styled.div`
  display: flex;
`;

const FlexColumn = styled.div`
  flex: 50%;
  padding: 10px;
  height: 400px;
`;


const SaveBtn = styled(Button)`
    border: solid 1px #0329559a;
    color: white;
    background-color: #0070c9;

    &:hover {
    cursor: pointer;
    background-color: #1875df9f;
  }
` 
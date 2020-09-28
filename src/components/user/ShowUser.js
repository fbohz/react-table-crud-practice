import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useHistory} from 'react-router-dom';
import { Container, Button, H1, FlexColumn, FlexRow, Input } from './UserStyles';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const UPDATE_USER = gql`
  mutation updateUser($email: ID!, $newAttributes: UserAttributesInput!) {
    updateUser(email: $email, newAttributes: $newAttributes) {
      email
    }
  }
`;

const ShowUser = (props) => {
  const location = useLocation();
//   const email = window.atob(window.location.pathname.replace('/users/', ''));
  const getUser = location.state && location.state.user;
  const [user, setUser] = useState(getUser);
  const [checked, setChecked] = useState('');
  const [name, setName] = useState('');
  const [updateUser] = useMutation(UPDATE_USER);
  const history = useHistory();

  useEffect(() => {
    if (user) {
      setChecked(user.role);
      setName(user.name);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      email: user.email,
      name,
      role: checked,
      __typename: 'User',
    };

    // console.log(newUser);
    const response = await updateUser({
      variables: {
        email: user.email,
        newAttributes: {
          name,
          role: newUser.role,
        },
      },
    });

    if (response) {
      console.log(response);
      setUser(newUser);
      history.push("/");
      document.location.reload()
    }
  };

  const handleTextChange = (changeEvent) => {
    setName(changeEvent.target.value);
  };

  const handleOptionChange = (changeEvent) => {
    setChecked(changeEvent.target.value);
  };

  return (
    <UserContainer>
      {user && user.email ? (
        <form>
          <H1>{user.email}</H1>
          <SaveBtn type="submit" onClick={handleSubmit}>
            Save
          </SaveBtn>
          <hr />
          <FlexRow>
            <FlexColumn>
              <label htmlFor="name">
                <small>Name</small>
              </label>
              <br />
              <Input name="name" type="text" value={name} onChange={handleTextChange} />
            </FlexColumn>
            <FlexColumn style={{ borderLeft: '1px solid rgba(77, 76, 76, 0.822)' }}>
              <label htmlFor="role">
                <small>Role</small>
              </label>
              <br />
              <br />
              <input
                type="radio"
                value="ADMIN"
                name="role"
                onChange={handleOptionChange}
                checked={checked === 'ADMIN'}
              />
              <label htmlFor="admin">Admin</label>
              <br />
              <input
                type="radio"
                value="DEVELOPER"
                name="role"
                onChange={handleOptionChange}
                checked={checked === 'DEVELOPER'}
              />
              <label htmlFor="developer">Developer</label>
              <br />
              <input
                type="radio"
                value="APP_MANAGER"
                name="role"
                onChange={handleOptionChange}
                checked={checked === 'APP_MANAGER'}
              />
              <label htmlFor="APP_MANAGER">App Manager</label>
              <br />
              <input
                type="radio"
                value="MARKETING"
                name="role"
                onChange={handleOptionChange}
                checked={checked === 'MARKETING'}
              />
              <label htmlFor="marketing">Marketing</label>
              <br />
              <input
                type="radio"
                value="SALES"
                name="role"
                onChange={handleOptionChange}
                checked={checked === 'SALES'}
              />
              <label htmlFor="sales">Sales</label>
            </FlexColumn>
          </FlexRow>
        </form>
      ) : (
        <h1>
          Something funky happened<span role="img" aria-label="emoji">🤯</span>! <br /> Just go back to the previous page and try again.
        </h1>
      )}
    </UserContainer>
  );
};

export default ShowUser;

const UserContainer = styled(Container)`
  padding: 40px;
`;

const SaveBtn = styled(Button)`
  border: solid 1px #0329559a;
  color: white;
  background-color: #0070c9;

  &:hover {
    cursor: pointer;
    background-color: #1875df9f;
  }
`;

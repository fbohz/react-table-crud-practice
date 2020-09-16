import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Container, Button, H1 } from './UserStyles';
import { useQuery, useMutation } from '@apollo/react-hooks';

const ShowUser = (props) => {
  const location = useLocation();
  const email = window.atob(window.location.pathname.replace('/users/', ''));
  const user = location.state && location.state.user;
  const [checked, setChecked] = useState('');
  const [name, setName] = useState('');
  //   console.log(checked);
  useEffect(() => {
    if (user) {
        setChecked(user.role);
        setName(user.name)
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(name, checked)
  }

  const handleTextChange = (changeEvent) => {
    setName(changeEvent.target.value)
  }

  const handleOptionChange = (changeEvent) => {
    setChecked(changeEvent.target.value);
  };

  //   const isChecked = (value) => {
  //     // setChecked(value);
  //     if (value === checked) {
  //         return true
  //     } else {
  //         return false
  //     }
  //   };

  return (
    <UserContainer>
      {user && user.email ? (
        <form>
          <H1>{user.email}</H1>
          <SaveBtn type="submit" onClick={handleSubmit} >
            Save
          </SaveBtn>
          <hr />
          <FlexRow>
            <FlexColumn>
              <label htmlFor="name">
                <small>Name</small>
              </label>
              <br />
              <Input name="name" type="text" value={name} onChange={handleTextChange}/>
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
          Something funky happened🤯! <br /> Just go back to the previous page and try again.
        </h1>
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
`;

const Input = styled.input`
  margin: 10px auto;
  width: 240px;

  &:focus {
    border: 1px solid rgba(59, 153, 252, 0.5);
    box-shadow: 0 0 10px #719ece;
  }
`;

const Label = styled.label`
  display: block;
`;

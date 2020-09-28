import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useHistory } from 'react-router-dom';
import { Container, Table, Button, H1 } from './UserStyles';
// import styled from 'styled-components';

const RESET_USERS = gql`
  mutation resetUsers {
    resetUsers
  }
`;

const DELETE_USERS = gql`
  mutation deleteUsers($emails: [ID]!) {
    deleteUsers(emails: $emails)
  }
`;

const Users = ({ data }) => {
  const { allUsers } = data;
  const [checked, setChecked] = useState([]);
  const [users, setUsers] = useState(allUsers);
  const [deleteUsers] = useMutation(DELETE_USERS);
  const [reset] = useMutation(RESET_USERS);
  const history = useHistory();

  const resetUsers = async () => {
    const response = await reset();

    if (response) {
      console.log(response);
    }
  };


  const renderUser = (user) => {
    const enc = window.btoa(user.email);
    history.push({
      pathname: `/users/${enc}`,
      state: { user: user },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checked.length < 1) {
      alert('Please make selection!');
    } else {
      const newUsers = users.filter((u) => {
        return !checked.includes(u.email);
      });

      if (window.confirm('Are you sure you wanna delete user(s)?')) {
        const response = await deleteUsers({
          variables: {
            emails: checked,
          },
        });
        setUsers(newUsers);
        setChecked([]);

        if (response) {
          console.log(response);
        }
      }
    }
  };

  const handleChange = (e) => {
    if (checked.includes(e.target.value)) {
      const newChecked = checked.filter((n) => n !== e.target.value);
      setChecked(newChecked);
    } else {
      setChecked([...checked, e.target.value]);
    }
  };

  const capitalize = (word) => {
    if (word === 'APP_MANAGER') {
      return 'App Manager';
    } else {
      return word[0].toUpperCase() + word.substr(1).toLowerCase();
    }
  };

  return (
    <Container>
      <button style={{ display: 'block' }} onClick={resetUsers}>
        RESET
      </button>
      <form>
        <H1>Users</H1>
        <Button onClick={handleSubmit} type="submit">
          Delete
        </Button>
        <Table>
          <thead>
            <tr>
              <th></th>
              <th>EMAIL</th>
              <th>NAME</th>
              <th>ROLE</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, i) => {
              return (
                <tr key={user.email} className="not-first">
                  <td>
                    <input
                      onChange={handleChange}
                      type="checkbox"
                      id=""
                      name="user"
                      value={user.email}
                    />
                  </td>
                  <td onClick={() => renderUser(user)}>{user.email}</td>
                  <td onClick={() => renderUser(user)}>{user.name}</td>
                  <td onClick={() => renderUser(user)}>{capitalize(user.role)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </form>
    </Container>
  );
};

export default Users;

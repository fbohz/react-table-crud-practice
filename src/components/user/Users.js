import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const Container = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell,
    'Helvetica Neue', sans-serif;
`;

const Table = styled.table`
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

const Button = styled.button`
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

const H1 = styled.h1`
  display: inline;
`;

const RESET_USERS = gql`
  mutation resetUsers {
    resetUsers
  }
`;

const ALL_USERS_QUERY = gql`
  query {
    allUsers {
      email
      name
      role
    }
  }
`;
// deleteUsers(emails: [ID]!): [ID!]!
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

  //   console.log(allUsers);
  //   console.log(data.data.allUsers)
  const resetUsers = async () => {
    const response = await reset();

    if (response) {
      console.log(response);
    }
  };
  
  const editUser = (user) => {};

  const renderUser = (user) => {
    console.log(user);
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
          // checked
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
    //   e.persist()
    // console.log(e.target)
    if (checked.includes(e.target.value)) {
      const newChecked = checked.filter((n) => n !== e.target.value);
      setChecked(newChecked);
    } else {
      setChecked([...checked, e.target.value]);
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
              const key = user.email;
              return (
                <tr key={user.email} className="not-first" onClick={() => renderUser(user)}>
                  <td>
                    <input
                      onChange={handleChange}
                      type="checkbox"
                      id=""
                      name="user"
                      value={user.email}
                    />
                  </td>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
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

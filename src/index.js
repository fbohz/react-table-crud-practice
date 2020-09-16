import { ApolloProvider, useQuery, useMutation } from '@apollo/react-hooks';
import ApolloClient, { gql } from 'apollo-boost';
import React from 'react';
import ReactDOM from 'react-dom';
import env from './env';
import Users from './components/user/Users'

const client = new ApolloClient({
  uri: env.GRAPHQL_ENDPOINT,
  request: operation => {
    operation.setContext({
      headers: {
        'x-api-key': env.GRAPHQL_API_KEY,
      }
    })
  }
});

const ALL_USERS_QUERY = gql`
  query {
    allUsers {
      email
      name
      role
    }
  }
`;

//  resetUsers: Boolean!

const RESET_USERS = gql`
    mutation resetUsers {
      resetUsers
  }
`

const App = () => {
  const { loading, error, data } = useQuery(ALL_USERS_QUERY);
  const [reset] = useMutation(RESET_USERS)

  const resetUsers = async () => {
    const response = await reset()

    if (response) {
      console.log(response)
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  return (
    <>
    <button style={{display: "block"}} onClick={resetUsers}>RESET</button>
    <Users data={data} />
    </>
    // <pre>
    //   <code>
    //     {JSON.stringify(data, null, 2)}
    //   </code>
    // </pre>
  )
}

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
import { ApolloProvider, useQuery, useMutation } from '@apollo/react-hooks';
import ApolloClient, { gql } from 'apollo-boost';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import env from './env';
import Users from './components/user/Users';

const client = new ApolloClient({
  uri: env.GRAPHQL_ENDPOINT,
  request: (operation) => {
    operation.setContext({
      headers: {
        'x-api-key': env.GRAPHQL_API_KEY,
      },
    });
  },
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



const App = () => {
  const { loading, error, data } = useQuery(ALL_USERS_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  return (
    <Switch>
      <Route exact path='/' render={() =>  <Users data={data} /> } />
      {/* <Users data={data} /> */}
      {/* <Route exact path='/users/:userId' component={ HomeContainer } /> */}
    </Switch>
    // <pre>
    //   <code>
    //     {JSON.stringify(data, null, 2)}
    //   </code>
    // </pre>
  );
};

const Root = () => (
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));

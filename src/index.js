import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider } from 'react-apollo';
import {createHttpLink} from 'apollo-link-http'  //connect client to graphql
import { InMemoryCache } from 'apollo-cache-inmemory';     //apollo use to cache the data
import { ApolloClient,gql } from 'apollo-boost';

import { store, persistor } from './redux/store';

import './index.css';
import App from './App';

//connection to backend
const httpLink=createHttpLink({
  uri:'https://crwn-clothing.com'
});

const cache=new InMemoryCache();  //used to manage data

const client=new ApolloClient({
  link:httpLink,
  cache
});

client.query({
  query:gql`
  {
    getCollectionsByTitle(title:"hats"){
      title
      id
      items{
        name
        id
        price
      }
    }
  }
  `
}).then(res=>console.log(res))

ReactDOM.render(
  <ApolloProvider client={client}>
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);

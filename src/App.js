import React from 'react'
import {
  BrowserRouter,
  Route,
  Routes,
  Router,
} from 'react-router-dom'
import { Provider } from 'react-redux';
import { routes } from './routes'
import history from './history'
import BaseLayout from './scenes/BaseLayout/BaseLayout'

import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';

import './fonts.css';
import 'react-toastify/dist/ReactToastify.css';

import store from './app/store'
import { Blockpass } from './scenes/Header/Blockpass';

const POLLING_INTERVAL = 12000;

const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
};



class App extends React.PureComponent {

  render() {
    return (
      <Web3ReactProvider getLibrary={getLibrary}>
        <Provider store={store}>
          <BaseLayout history={history}>
            <Routes>
              {routes.map((route) => (
                <Route key={route.path} path={route.path} element={route.component} />

              ))}
            </Routes>
          </BaseLayout>
        </Provider>
      </Web3ReactProvider>

    )
  }
}

export default App
import React from 'react';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import Board from './components/Board';
import store from './store/store';
import '@mantine/core/styles.css';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <MantineProvider>
        <ModalsProvider>
          <div className="app">
            <Board />
          </div>
        </ModalsProvider>
      </MantineProvider>
    </Provider>
  );
}

export default App;
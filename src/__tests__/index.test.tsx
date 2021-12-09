import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import { store } from '../store/store';

jest.mock('react-dom', () => ({ render: jest.fn() }));

test('renders with App and root div', () => {
  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);
  require('../index.tsx');
  expect(ReactDOM.render).toHaveBeenCalledWith(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    root,
  );
});

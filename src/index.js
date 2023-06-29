import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';

import App from './components/App';
import { contactsReducer } from './components/Redux/contactsSlice';
import  filterReducer  from './components/Redux/filterSlice';

axios.defaults.baseURL = "https://649bf2870480757192372e49.mockapi.io";

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: filterReducer,
  },
});

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
        <App />
       </Provider>
);


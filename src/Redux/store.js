import { configureStore } from '@reduxjs/toolkit';
import { createAction, createReducer } from '@reduxjs/toolkit';

export const addContact = createAction('contacts/addContact');
export const deleteContact = createAction('contacts/deleteContact');

const myReducer = createReducer([], {
  [addContact]: (state, action) => state + action.payload,
  [deleteContact]: (state, action) => state - action.payload,
});

export const store = configureStore({
  reducer: {
    contacts: myReducer,
    filter: '',
  },
});

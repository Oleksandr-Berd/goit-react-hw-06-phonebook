import { createSlice, nanoid } from '@reduxjs/toolkit';

const contactsInitialState = [{ id: 0, name: '', number: 0 }];

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(name, number) {
        return {
          payload: {
            name,
            number,
            id: nanoid(),
          },
        };
      },
    },
    deleteTask(state, action) {
      const index = state.findIndex(contact => contact.id === action.payload);
      state.splice(index, 1);
    },
  },
});

export const { addTask, deleteTask } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;

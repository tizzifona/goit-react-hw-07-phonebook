import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = "https://649bf2870480757192372e49.mockapi.io";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleFulfilled = (state, action) => {
  state.isLoading = false;
  state.items = action.payload;
};

const handleFulfilledAdd = (state, action) => {
  state.isLoading = false;
  state.items.push(action.payload);
};

const handleFulfilledDelete = (state, action) => {
  state.isLoading = false;
  state.items = state.items.filter((contact) => contact.id !== action.payload);
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.error.message;
};

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('/contacts');
    return data;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw rejectWithValue(error);
  }
});

export const addContact = createAsyncThunk('contacts/addContact', async ({ name, number }, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/contacts', { name, number });
    return data;
  } catch (error) {
    console.error('Error adding contact:', error);
    throw rejectWithValue(error);
  }
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`/contacts/${id}`);
    return id;
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw rejectWithValue(error);
  }
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, handleFulfilled)
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, handleFulfilledAdd)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, handleFulfilledDelete)
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        handleRejected
      );
  },
});

export const { actions: contactsActions, reducer: contactsReducer } = contactsSlice;
export default contactsReducer;


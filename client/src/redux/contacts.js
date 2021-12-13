import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const baseURL = "http://localhost:5000/api/";

const config = {
   headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`
   }
};

const initialState = {
   contacts: [],
   status: "",
   error: ""
}

export const getContacts = createAsyncThunk("contacts/getContacts", 
async(userId, { rejectWithValue}) => {
   try {
      const response = await axios.get(baseURL + "users/" + userId, config);
      console.log(config);
      return response.data.user.Contacts;
   } catch (error) {
      return rejectWithValue(error.response.data);
   }
})

export const fetchContact = createAsyncThunk("contacts/fetContact", 
async(contactId, { rejectWithValue }) => {
      try {
         const response = await axios.get(baseURL + "contacts/" + contactId, config);
         return response;
      } catch (error) {
         return rejectWithValue(error.response.data);
      }
   })

   export const addContact = createAsyncThunk("contacts/addContact", 
   async({ firstname , lastname, email, phone, userId }, { rejectWithValue}) => {
      try {
         const response = await axios.post(
            baseURL + "contacts",
            { firstname , lastname, email, phone, userId },
            config
         );
      return response.data.newContact;
   } catch (error) {
      return rejectWithValue(error.response.data.message);
   }
})
export const updateContact = createAsyncThunk("contacts/updateContact", 
   async({ userId, firstname, lastname, email, phone }, { rejectWithValue}) => {
      try {
         const response = await axios.patch(
            baseURL + "contacts/", + userId, 
            { firstname, lastname, email, phone }, 
            config
         );
      console.log(response.data);
      return response.data;
   } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
   }
})
export const deleteContact = createAsyncThunk("contacts/deleteContact", 
async(userId, { rejectWithValue}) => {
   try {
      const response = await axios.delete(baseURL + "contacts/" + userId, config);
      console.log(response.data);
      return response.data;
   } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
   }
})

export const contactSlice = createSlice({
   name: 'contacts',
   initialState,
   reducers: {},
   extraReducers: {
      [getContacts.pending]: (state, action) => {
         state.status = "pending";
         state.error = "";
      },
      [getContacts.fulfilled]: (state, action) => {
         state.status = "success";
         state.contacts = action.payload;
         state.error = "";
      },
      [getContacts.rejected]: (state, action) => {
         state.status = "failed";
         state.error = action.payload;
      },
      [fetchContact.pending]: (state, action) => {
         state.status = "pending";
         state.error = "";
      },
      [fetchContact.fulfilled]: (state, action) => {
         state.status = "success";
         state.contacts = action.payload;
         state.error = "";
      },
      [fetchContact.rejected]: (state, action) => {
         state.status = "failed";
         state.error = action.payload;
      },
      [addContact.pending]: (state) => {
         state.status = "pending";
         state.error = "";
      },
      [addContact.fulfilled]: (state, action) => {
         state.status = "success";
         state.contacts.push(action.payload);
         state.error = "";
      },
      [addContact.rejected]: (state, action) => {
         state.status = "failed";
         state.error = action.payload;
      },
      [updateContact.pending]: (state) => {
         state.status = "pending";
         state.error = "";
      },
      [updateContact.fulfilled]: (state, action) => {
         state.status = "success";
         state.contacts = action.payload;
         state.error = "";
      },
      [updateContact.rejected]: (state, action) => {
         state.status = "failed";
         state.error = action.payload;
      },
      [deleteContact.pending]: (state) => {
         state.status = "pending";
         state.error = "";
      },
      [deleteContact.fulfilled]: (state, action) => {
         state.status = "success";
         const { id } = action.payload;
         console.log(state.contacts);
         state.contacts.filter((contact) => contact.id !== id);
         state.error = "";
      },
      [deleteContact.rejected]: (state, action) => {
         state.status = "failed";
         state.error = action.payload;
      }
   }
})

export const {
   getContacts_pending,
   getContacts_success,
   getContacts_fail,
   addContact_pending,
   addContact_success,
   addContact_fail,
   updateContact_pending,
   updateContact_success,
   updateContact_fail
 } = contactSlice.actions;

export default contactSlice.reducer;
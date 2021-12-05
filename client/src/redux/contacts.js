import { createSlice } from "@reduxjs/toolkit";

export const contactSlice = createSlice({
   name: 'contacts',
   initialState: {
      contacts: []
   },
   reducers: {
      getContacts: (state, action) => {
         state.contacts = action.payload;
         console.log(state.contacts);
      },
      addContact: (state, action) => {
         state.contacts.push(action.payload);
      },
      updateContact: (state, action) => {
         state.contacts = action.payload;
      },
      deleteContact: (state, action) => {
         const { id } = action.payload;
         console.log(state.contacts);
         state.contacts.filter((contact) => contact.id !== id);
      }
   }
})

export const { getContacts, addContact, updateContact, deleteContact } = contactSlice.actions;

export default contactSlice.reducer;
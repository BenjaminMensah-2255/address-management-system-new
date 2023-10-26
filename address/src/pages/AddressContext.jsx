import React, { createContext, useContext, useReducer } from 'react';

const AddressContext = createContext();

export const useAddress = () => {
  return useContext(AddressContext);
};

const initialState = {
  data: [],
};

const addressReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ADDRESS':
      return { ...state, data: [...state.data, action.payload] };
    case 'DELETE_ADDRESS':
      return { ...state, data: state.data.filter((_, index) => index !== action.payload) };
    case 'UPDATE_ADDRESS':
      const newData = [...state.data];
      newData[action.payload.index] = action.payload.data;
      return { ...state, data: newData };
    default:
      return state;
  }
};

export const AddressProvider = ({ children }) => {
  const [state, dispatch] = useReducer(addressReducer, initialState);

  return (
    <AddressContext.Provider value={{ state, dispatch }}>
      {children}
    </AddressContext.Provider>
  );
};

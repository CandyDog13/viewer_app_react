import DataStore from './store'
import React from 'react';

export const stores = {
  dataStore: new DataStore(),
};

export const StoreContext = React.createContext(stores);
export const useStore = () => React.useContext(StoreContext);


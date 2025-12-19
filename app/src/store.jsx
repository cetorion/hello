import React, { createContext, useContext, useState } from "react";

const Store = createContext(null);

export const StoreProvider = ({ children }) => {
  const [name, setName] = React.useState("ruslan");
  const [reload, setReload] = React.useState(false);

  const store = {
    name: [name, setName],
    reload: [reload, setReload],
  };

  return <Store.Provider value={store}>{children}</Store.Provider>;
};

export const useStore = (key) => {
  const {
    [key]: [data, setData],
  } = useContext(Store);

  return [data, setData];
};

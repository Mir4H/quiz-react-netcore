import React, { createContext, useContext, useState } from "react";

export const stateContext = createContext();

const getFreshContext = () => {
  return {
    playerId: 0,
    finishTime: 0,
    selectedOptions: [],
  };
};

export const useStateContext = () => {
  const { context, setContext } = useContext(stateContext);
  return {
    context,
    setContext: (obj) => {
      setContext({ ...context, ...obj });
    },
  };
};

const ContextProvider = ({ children }) => {
  const [context, setContext] = useState(getFreshContext);

  return (
    // eslint-disable-next-line no-sequences
    <stateContext.Provider value={(context, setContext)}>
      {children}
    </stateContext.Provider>
  );
};

export default ContextProvider;

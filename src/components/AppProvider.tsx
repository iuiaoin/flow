import * as React from "react";
import { Application } from "pixi.js";

const AppContext = React.createContext<Application | undefined>(undefined);

export const AppProvider: React.FC<{ value: Application }> = (props) => {
  return (
    <AppContext.Provider value={props.value}>
      {props.children}
    </AppContext.Provider>
  );
};

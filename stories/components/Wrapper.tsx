import * as React from "react";
import classes from "../styles/base.m.scss";

export const Wrapper: React.FunctionComponent = (props) => {
  return <div className={classes.wrapper}>{props.children}</div>;
};

import React from "react";
import Myparagtaph from "./MyParagraph";
const DemoOutput = (props) => {
  console.log("demo");
  return <Myparagtaph>{props.show ? "this is NeW!" : ""}</Myparagtaph>;
};
export default React.memo(DemoOutput);

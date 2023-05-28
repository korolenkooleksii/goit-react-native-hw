import * as React from "react";
import Svg, { Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
export const Remove = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    data-name="Livello 1"
    height="25px"
    width="25px"
    viewBox="0 0 128 128"
    {...props}
  >
    <Path d="M64 0a64 64 0 1 0 64 64A64.07 64.07 0 0 0 64 0Zm0 122a58 58 0 1 1 58-58 58.07 58.07 0 0 1-58 58Z" />
    <Path d="M90 61H67V38a3 3 0 0 0-6 0v23H38a3 3 0 0 0 0 6h23v23a3 3 0 0 0 6 0V67h23a3 3 0 0 0 0-6Z" />
  </Svg>
);


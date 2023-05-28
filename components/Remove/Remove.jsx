import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
export const Remove = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    data-name="Livello 1"
    height="120px"
    width="120px"
    viewBox="0 0 128 128"
    {...props}
  >
    <Circle
      cx="18.5"
      cy="18.5"
      r="12"
      fill="#fff"
      stroke="#E8E8E8"
      transform="rotate(-45 18.5 18.5)"
    />
    <Path
      fill="#BDBDBD"
      fill-rule="evenodd"
      d="m14.257 13.55-.707.707 4.243 4.243-4.243 4.243.707.707 4.243-4.243 4.243 4.243.707-.707-4.243-4.243 4.243-4.243-.707-.707-4.243 4.243-4.243-4.243Z"
      clip-rule="evenodd"
    />
  </Svg>
);

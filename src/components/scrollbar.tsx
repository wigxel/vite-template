import React from "react";
import Scrollbar_ from "react-custom-scrollbars";

export function Scrollbar(props: { children?: React.ReactNode }) {
  return (
    <Scrollbar_ universal hideTracksWhenNotNeeded={true} autoHide={true}>
      {props.children}
    </Scrollbar_>
  );
}

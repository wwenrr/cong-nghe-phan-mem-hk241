import React from "react";
import Nav from "./nav";
import "@styles/home.scss"

interface tuble {
  name: string,
  url: string
}

function Url(arr:Array<tuble>) {
  arr.map(() => {
    return (
      <div className="">hi</div>
    )
  })
}

export default function Home() {
  return (
    <>
      <div className="warp">
          
      </div>
    </>
  );
}

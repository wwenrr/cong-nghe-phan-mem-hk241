import React, { useEffect } from "react";
import Nav from "./nav";
import "@styles/home.scss"
import Link from "next/link";
import { tuble, props, Path} from "@/assessts/components/path";
import Cookies from 'js-cookie';
import {useRouter} from "next/navigation";

const arr: Array<tuble> = [
  {
    name: "Trang Chủ",
    url: "/"
  },
  {
    name: "Thông Tin",
    url: "/thong-tin"
  }
];

export default function Home() {

  return (
    <>
      
    </>
  );
}
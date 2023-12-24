import React from "react";

import Banner from "../Components/Banner";
import Gallery from "./Gallery";
import { useUserInfo } from "../UserInfoContext";

export default function Home() {
  const { userData } = useUserInfo();
  return (
    <>
      {/* <Banner /> */}
      <Gallery />
    </>
  );
}

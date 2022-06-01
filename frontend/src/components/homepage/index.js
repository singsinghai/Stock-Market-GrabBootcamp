import React, { useEffect } from "react";
import { Market } from "./Market";
import TwoChart from "./TwoChart";
import { Loading } from "../Loading";
import { seo } from "../../helper";

export const HomePage = ({ market_data }) => {
  useEffect(() => {
    seo({
      title: "HERCULÉ - Trang chủ",
      metaDescription: "homepage",
    });
  }, []);
  return (
    <div>
      <div className="title">Diễn biến thị trường</div>
      {market_data ? (
        <Market data={market_data} />
      ) : (
        <Loading height={"400px"} />
      )}
      <TwoChart />
    </div>
  );
};

import { Spinner, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { seo } from "../../helper";
import Header from "./Header";
import ValuationCharts from "./ValuationCharts";

function CompanyValuation() {
  const [company, setCompany] = useState({});
  let { company_symbol } = useParams();
  const [info, setInfo] = useState([]);
  const [businessInfo, setBusinessInfo] = useState({});
  const [businessValue, setBusinessValue] = useState([]);
  let d = new Date()
    // 60 * 60 * 1000 * 24 means 1 day
  d.setTime(d.getTime() - 60 * 60 * 1000 * 24 * 15) 
  const fetchCompanyInfo = async () => {
    axios
      .all([
        axios.get(`http://139.180.215.250/api/company/${company_symbol}`),
        axios.get(
          `http://139.180.215.250/api/stock-price/${company_symbol}?start_date=${new Date().toISOString().split("T")[0]
          }`
        ),
        axios.get(
          `http://139.180.215.250/api/stock-price/${company_symbol}?start_date=${d.toISOString().split("T")[0]
          }`
        ),
      ])
      .then(
        axios.spread((...responses) => {
          const data = responses.map((res) => {
            return res.data;
          });
          let info = []
          const sum = data[2].map(item => item.total_volume).reduce((pre, cur) => pre + cur,0);
          info.push(Math.round(data[0].shares_outstanding * data[1][0].price_close/10000000)/100)
          info.push(Math.round(data[0].shares_outstanding/10000)/100)
          info.push(Math.round(sum/data[2].length/1000))

          setInfo(info)
          setCompany(Object.assign({}, ...data));
        })
      );
  };
  useEffect(() => {
    fetchCompanyInfo();
    seo({
      title: `${company_symbol} - Doanh nghiệp | HERCULÉ`,
      metaDescription: "homepage",
    });
  }, []);


  useEffect(() => {
    fetch(`http://139.180.215.250/api/business-valuation/${company_symbol}`)
      .then(result => result.json())
      .then(data => {
        setBusinessInfo(data[data.length-1])
        setBusinessValue(data)
      });
  }, [])
  if (!company) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  } else {
    return (
      <div>
        <Header company={company} info={info} businessInfo={businessInfo}/>
        <ValuationCharts company_symbol={company_symbol} businessValue={businessValue}/>
      </div>
    );
  }
}

export default CompanyValuation;

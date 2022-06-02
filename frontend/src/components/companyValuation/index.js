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
  const fetchCompanyInfo = async () => {
    axios
      .all([
        axios.get(`http://139.180.215.250/api/company/${company_symbol}`),
        axios.get(
          `http://139.180.215.250/api/stock-price/${company_symbol}?start_date=${new Date().toISOString().split("T")[0]
          }`
        ),
      ])
      .then(
        axios.spread((...responses) => {
          const data = responses.map((res) => {
            return res.data;
          });
          console.log(data[1][0].price_close)
          let info = []
          info.push(Math.round(data[0].shares_outstanding * data[1][0].price_close/10000000)/100)
          info.push(Math.round(data[0].shares_outstanding/10000)/100)
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


  // useEffect(() => {
  //   fetch(`http://139.180.215.250/api/business-valuation/${company_symbol}`)
  //     .then(result => result.json())
  //     .then(data => {
  //       console.log(data)
  //     });
  // }, [])
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
        <Header company={company} info={info}/>
        <ValuationCharts company_symbol={company_symbol} company={company}/>
      </div>
    );
  }
}

export default CompanyValuation;

import { Spinner, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { seo } from "../../helper";
import Header from "./Header";
import ValuationCharts from "./ValuationCharts";

function CompanyValuation() {
  const [company, setCompany] = useState({});
  let { company_symbol } = useParams();

  const fetchCompanyInfo = async () => {
    axios
      .all([
        axios.get(`http://139.180.215.250/api/company/${company_symbol}`),
        axios.get(
          `http://139.180.215.250/api/stock-price/${company_symbol}?start_date=${
            new Date().toISOString().split("T")[0]    
          }`
        ),
      ])
      .then(
        axios.spread((...responses) => {
          const data = responses.map((res) => {
            return res.data;
          });
          setCompany(Object.assign({}, ...data));
        })
      );
  };

  useEffect(() => {
    fetchCompanyInfo();
    seo({
      title: `${company_symbol} - Doanh nghiệp | Hẻ Cu Lé`,
      metaDescription: "homepage",
    });
  }, []);


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
        <Header company={company}/>
        <ValuationCharts />
      </div>
    );
  }
}

export default CompanyValuation;

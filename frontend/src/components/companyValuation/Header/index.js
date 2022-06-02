import React, {useState} from "react";
import { Col, Container, Row } from "react-bootstrap";
import {Image, Text } from "@chakra-ui/react";



export default function Header({company, info, businessInfo}) {
  const renderStats = (stats) => {
    return (
      <>
        {stats.map((stat, idx) => {
          return <Col
          xs={8} md={6} lg={4}
          className="flex justify-between w-4/12 px-4 border-start border-secondary"
        ><Row key={idx}>
            <Col xs={7} className='px-0'>
              {stat.title}:
            </Col>
            <Col xs={5} className='px-0 test'>
              {stat.value}
              <span>
                {stat.unit}
              </span>
            </Col>
          </Row></Col>;
        })}
      </>
    );
  };
  return (
    <Container fluid className="p-0 mt-0">
      <Row className="flex justify-between items-center pb-4 ps-1 space-x-10 shadow p-3 mb-5 bg-white">
        <Col xs={5} md={4} xl={3}>
          <Row>
            <Col xs={4} md={3}>
              <Image
                objectFit="contain"
                src={`https://wichart.vn/images/logo-dn/${company.symbol}.jpeg`}
              />
            </Col>
            <Col xs={8} md={9}>
              <Row>
                <Text fontWeight="bold">
                  {company.company_name} ({company.symbol}){" "}
                </Text>
              </Row>
              <Row>
                <Text>{company.floor_code}</Text>
              </Row>
              <Row>
                <Text>{company.industry_name}</Text>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col xs={7} md={8} xl={9}>
          <Row>
          {renderStats([
            {
              title: `Vốn hóa`,
              value: info[0],
              unit: 'tỷ'
            }, 
            {
              title: "KLGD TB15D",
              value: info[2],
              unit: 'ngàn cổ'
            },
            {
              title: `KLCP lưu hành`,
              value: info[1],
              unit: 'triệu'
            },
            {
              title:"EPS (D)",
              value: Math.round(businessInfo.earnings_per_share),
              unit: 'đồng'

            },
            {
              title: "P/E (D)",
              value: Math.round(businessInfo.price_earnings*10)/10,
              unit: 'lần'
            },
            {
              title: "PEG",
              value: 0,
              unit: 'tỷ'
            },
            {
              title: "Book value (D)", 
              value: Math.round(businessInfo.book_value),
              unit: 'đồng'
            },
            {
              title:"P/B (D)",
              value: Math.round(businessInfo.price_to_book*10)/10,
              unit: 'lần'
            },
            {
              title:"Tỷ lệ cổ tức",
              value: 0,
              unit: 'tỷ'
            }
          ])}
          </Row>
        </Col>
      </Row>
      <Row></Row>
    </Container>
  );
}

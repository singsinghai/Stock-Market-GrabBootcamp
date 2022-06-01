import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import {Image, Text } from "@chakra-ui/react";

export default function Header({company}) {
  const renderStats = (stats) => {
    return (
      <Col
        xs={2}
        className="flex justify-between w-4/12 px-4 border-start border-secondary"
      >
        {stats.map((stat, idx) => {
          return <Row key={idx}>{stat}</Row>;
        })}
      </Col>
    );
  };
  return (
    <Container fluid className="p-0 mt-0">
      <Row className="flex justify-between items-center pb-4 ps-1 space-x-10 shadow p-3 mb-5 bg-white">
        <Col xs={1}>
          <Image
            objectFit="contain"
            src={`https://wichart.vn/images/logo-dn/${company.symbol}.jpeg`}
          />
        </Col>
        <Col xs={4}>
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
        {renderStats(["Vốn hóa", "KLGD TB15D", "KLCP lưu hành"])}
        {renderStats(["EPS (D)", "P/E (D)", "PEG"])}
        {renderStats(["Book value (D)", "P/B (D)", "Tỷ lệ cổ tức"])}
      </Row>
      <Row></Row>
    </Container>
  );
}

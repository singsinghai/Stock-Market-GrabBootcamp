// THIS FILE DESIGN THE SEARCH BAR FOR THE HEADER
import axios from "axios";
import { useEffect, useState } from "react";
import {
  FormControl,
  InputGroup,
  ListGroup,
} from "react-bootstrap";
export default function SearchBar() {
  const [state, setState] = useState({
    query: "",
    companies: [],
  });

  useEffect(() => {
    getCompanyList();
  }, []);

  const getCompanyList = async () => {
    const result = await axios.get("http://139.180.215.250/api/company");
    const companies = await result.data;
    setState({
      query: "",
      companies: companies.map((company) => {
        return { company_name: company.company_name, symbol: company.symbol };
      }),
    });
  };

  const onQueryChange = (e) => {
    setState({ ...state, query: e.target.value });
  };

  const renderFilteredCompanies = (query) => {
    const options = state.companies
      .filter(
        (company) =>
          company.company_name.toLowerCase().includes(query) ||
          company.symbol.toLowerCase().includes(query)
      )
      .map((company, idx) => {
        return (
          <ListGroup.Item
            key={idx}
            className="d-flex justify-content-between"
            action
            href={`/company/${company.symbol}`}
          >
            <span className="fw-bold col-3 mx-0">{company.symbol}</span>
            <span className="col-9 mx-0">{company.company_name}</span>
          </ListGroup.Item>
        );
      });

    if (options.length > 7) {
      return options.slice(0, 7);
    }
    return options;
  };

  return (
    // Scale the width to 30% so it won't cover the size of whole header
    <div
      style={{ zIndex: 2, marginTop: "1.25rem", margin: "auto auto auto 50px" }}
      className=""
    >
      <InputGroup style={{ width: "400px", alignItems: "center" }}>
        <FormControl
          type="text"
          placeholder="Tìm kiếm công ty ..."
          value={state.query}
          onChange={onQueryChange}
          style={{ borderRadius: 30, height: 40}}
        />
      </InputGroup>
      {state.query === "" ? (
        <></>
      ) : (
        <ListGroup className="ml-auto" style={{ width: "500px", position:'fixed', }}>
          {renderFilteredCompanies(state.query)}
        </ListGroup>
      )}
    </div>
  );
}

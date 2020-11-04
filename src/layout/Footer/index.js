import React from "react";
import { Col } from "antd";
import { Content, StyledRow } from "./styled";

const Footer = () => {
  return (
    <div>
      <StyledRow>
        <Col>
          <Content>Copyright ©2020 By NhatVu</Content>
        </Col>
      </StyledRow>
    </div>
  );
};

export default Footer;

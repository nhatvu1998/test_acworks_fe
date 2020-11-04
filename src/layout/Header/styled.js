import { Dropdown, Menu } from "antd";
import styled from "styled-components";

const Logo = styled.div`
  font-size: 40px;
  font-weight: bold;
  padding-left: 1em;
  color: #000;
`;

const LoginButton = styled.div`
  text-align: right;
  padding-right: 1em;
  cursor: pointer;
`;

const StyledDropdown = styled(Dropdown)`
  .ant-dropdown {
    padding-top: 20px;
  }
`;

const Nav = styled(Menu)`
  padding: 0 100px
  font-size: 20px
`;

const HeaderContainer = styled.div`
  position: sticky;
  width: 100%;
  height: 60px;
  line-height: 60px;
  z-index: 12;
  top: 0px;
  align-items: center;
  background: rgb(255, 255, 255);
  border-bottom: 1px solid rgb(210, 210, 214);
`;

export { Logo, LoginButton, StyledDropdown, Nav, HeaderContainer };

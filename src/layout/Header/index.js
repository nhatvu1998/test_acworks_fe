import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Row, Col, Menu, Dropdown } from "antd";
import { withRouter } from "react-router-dom";
import { LoginButton, Logo, HeaderContainer } from "./styled";
import { Link } from "react-router-dom";
import { DownOutlined, LogoutOutlined } from "@ant-design/icons";
import logo from "../../assets/images/logo.png";
import userIcon from "../../assets/images/icon-user.png";
import {SIGN_OUT} from "../../constants/types";

const Header = (props) => {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const username = useSelector((state) => state.auth.profile?.username);
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch({type: SIGN_OUT})
    localStorage.removeItem('token')
    props.history.push('/login')
  }
  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={signOut}>
        <LogoutOutlined />
        Sign Out
      </Menu.Item>
    </Menu>
  );

  return (
    <HeaderContainer>
      <Row type="flex" justify="space-around" align="middle">
        <Col span={12}>
          <Logo>
            <Link to="/">
              <img src={logo} height="50px" alt="" />
            </Link>
          </Logo>
        </Col>
        <Col lg={{ span: 2, offset: 10 }} xs={{ span: 6 }}>
          {!isSignedIn ? (
            <LoginButton>
              <Button
                type="primary"
                ghost
                onClick={() => {
                  props.history.push("/login");
                }}
              >
                Sign in
              </Button>
            </LoginButton>
          ) : (
            <>
              <LoginButton>
                <img src={userIcon} style={{ width: 20, height: 20 }} />
                <Dropdown overlay={menu} trigger={["click"]}>
                  <a
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    {username} <DownOutlined />
                  </a>
                </Dropdown>
              </LoginButton>
            </>
          )}
        </Col>
      </Row>
    </HeaderContainer>
  );
};

export default React.memo(withRouter(Header));

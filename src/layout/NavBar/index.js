import React from 'react'
import { withRouter } from 'react-router-dom'
import { Menu } from 'antd'
import { Icon } from 'tabler-react'
import {useSelector} from "react-redux";

const Navbar = (props) => {
  const isAdmin = useSelector(state => state?.auth?.profile?.isAdmin);
  return (
    <div
      style={{
        position: "sticky",
        top: 60,
        zIndex: 10,
        boxShadow: "rgb(240, 241, 242) 0px 2px 8px 0px",
      }}
    >
      <Menu selectedKeys={props.history.location.pathname} mode="horizontal">
        <Menu.Item key="/home" onClick={() => props.history.push("/home")}>
          <Icon name="list" />
          &nbsp; Dashboard
        </Menu.Item>
        {!isAdmin ? (
          <Menu.Item
            key="/users"
            onClick={() => props.history.push("/detail")}
          >
            <Icon name="activity" />
            &nbsp;Detail
          </Menu.Item>
        ): (
          <>
            <Menu.Item
              key="/users"
              onClick={() => props.history.push("/users")}
            >
              <Icon name="activity" />
              &nbsp;Users
            </Menu.Item>
            <Menu.Item
              key="/criterias"
              onClick={() => props.history.push("/criterias")}
            >
              <Icon name="activity" />
              &nbsp;Criterias
            </Menu.Item>
            <Menu.Item
              key="/userCriteria"
              onClick={() => props.history.push("/userCriteria")}
            >
              <Icon name="activity" />
              &nbsp;User Criteria
            </Menu.Item>
          </>
        )}
      </Menu>
    </div>
  );
}

export default withRouter(Navbar)

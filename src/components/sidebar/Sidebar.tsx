import {Menu} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {Layout} from 'antd';
import {NavLink} from "react-router-dom";

const {Sider} = Layout;

const items = [
  {
    key: '1',
    icon: <UserOutlined/>,
    label: <NavLink to="/">Company branch</NavLink>,
  },
  {
    key: '2',
    icon: <UserOutlined/>,
    label: <NavLink to="/users">Users</NavLink>,
  },
]

const Sidebar = ({collapsed}: { collapsed: boolean }) => {
  return (
      <div>
        <Sider className="min-h-screen bg-white" trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical"/>
          <Menu
              mode="inline"
              items={items}
              className="mt-[64px] min-h-screen"
          />
        </Sider>
      </div>
  )
}
export default Sidebar

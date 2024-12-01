import {useState} from 'react';
import {MenuFoldOutlined, MenuUnfoldOutlined,} from '@ant-design/icons';
import {Button, Layout} from 'antd';
import Sidebar from "../../components/sidebar/Sidebar.tsx";
import {Outlet, useNavigate} from "react-router-dom";

const {Header, Content} = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
      <div>
        <Layout className="min-h-screen">
          <Sidebar collapsed={collapsed}/>
          <Layout>
            <Header className="p-0 bg-white w-full min-h-[60px] flex justify-between items-center">
              <Button
                  type="text"
                  icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                  onClick={() => setCollapsed(!collapsed)}
                  className="text-[16px] !w-[64px] !h-[64px]"
              />
              <Button className="mr-8 border-none !bg-[#53dfdb] !text-white font-bold rounded-lg duration-400 active:scale-95" onClick={() => navigate("/")}>Login</Button>
            </Header>
            <Content className="bg-white rounded-xl shadow-xl overflow-hidden m-4 min-h-screen p-4">
              <Outlet/>
            </Content>
          </Layout>
        </Layout>
      </div>
  )
}
export default Dashboard

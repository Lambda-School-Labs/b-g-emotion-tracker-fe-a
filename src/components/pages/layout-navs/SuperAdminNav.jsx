import { Avatar, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { UserOutlined, BookFilled, BookOutlined } from '@ant-design/icons';
import { useOktaAuth } from '@okta/okta-react';
import MemberTable from '../view-memberdash/MemberTable';

const SuperAdminNav = props => {
  const { authService } = useOktaAuth();
  const { Content, Sider } = Layout;
  const [content, setContent] = useState('');
  const role = props.role;

  const renderSwitch = contentType => {
    switch (contentType) {
      case 'members':
        return <MemberTable />;
      case 'programs':
        return <div>Program Table will go here </div>;
      case 'clubs':
        return <div>Club Table will go here </div>;
      case 'qrcodes':
        return <div>QR Code generator will go here</div>;
      default:
        return <div></div>;
    }
  };
  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          breakpoint="lg"
          width="250"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
            <Avatar
              size={120}
              gap="1"
              style={{ margin: '16px 30px', width: '185px' }}
              src="./BGC_logo2.png"
              shape="square"
            />
            <Menu.Item
              key="0"
              icon={<UserOutlined />}
              onClick={() => setContent('')}
            >
              {role} Dashboard
            </Menu.Item>
            <Menu.Item
              key="1"
              icon={<UserOutlined />}
              onClick={() => setContent('programs')}
            >
              Program Management
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<BookOutlined />}
              onClick={() => setContent('members')}
            >
              Member Management
            </Menu.Item>
            <Menu.Item
              key="3"
              icon={<BookFilled />}
              onClick={() => setContent('clubs')}
            >
              Club Management
            </Menu.Item>
            <Menu.Item
              key="4"
              icon={<UserOutlined />}
              onClick={() => setContent('qrcodes')}
            >
              QR Generator
            </Menu.Item>
            <Menu.Item key="5" onClick={() => authService.logout()}>
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            <>{renderSwitch(content)}</>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default SuperAdminNav;

import { Layout, Menu, Dropdown, Modal } from 'antd';
import React, { useEffect } from 'react';
import { history } from 'umi';
import styles from './index.less';
import logo from '@/assets/img/logo.png';
import { useAuth } from 'oidc-react';
import { useDispatch, useSelector } from '@/hooks';
import { SetWatermark } from '@/utils/watermark';
import { useDebounceFn } from 'ahooks';

const { Header, Content, Sider } = Layout;

const Index: React.FC = (props) => {
  const auth = useAuth();
  const dispatch = useDispatch();

  const { avatar, name, selectKeys, navList } = useSelector((state) => state.global);

  const selectMenu = (link: string, selectedKey: string) => {
    dispatch.global.setState({
      selectKeys: [selectedKey],
    });
    history.push(link);
  };

  const signOut = () => {
    Modal.confirm({
      title: '确认退出',
      content: '你确定要退出吗？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        auth.signOutRedirect();
      },
    });
  };

  useEffect(() => {
    if (auth && auth.userData) {
      dispatch.global.setState({
        avatar: auth.userData.profile.avatar,
        name: auth.userData.profile.userName,
        id_token: auth.userData.id_token,
      });
      SetWatermark(auth.userData.profile.userName, auth.userData.profile.sub);
    }
  }, [history.location.pathname]);

  const getData = useDebounceFn(async () => {}, {
    wait: 100,
  }).run;

  useEffect(() => {
    getData();
  }, [auth]);

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={signOut}>
        <span>退出登录</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.mainlayout}>
      {name && (
        <Layout style={{ minHeight: '100vh' }}>
          <Header className={styles.header}>
            <div
              className={styles.logo}
              onClick={() => {
                selectMenu('/', '');
              }}
              style={{ cursor: 'pointer' }}
            >
              <img src={logo} />
              示例
            </div>

            <div className={styles.right}>
              <Dropdown overlay={menu} placement="bottomCenter">
                <div>
                  <img src={avatar} style={{ marginRight: '10px', width: 30, height: 30 }} />
                  {name}
                </div>
              </Dropdown>
            </div>
          </Header>
          <Layout style={{ marginTop: 64, display: 'flex', flexDirection: 'row' }} hasSider>
            <Sider
              style={{
                overflow: 'auto',
                height: 'calc(100vh - 64px)',
                position: 'fixed',
                left: 0,
                userSelect: 'none',
                zIndex: 10,
              }}
            >
              <Menu
                theme="dark"
                mode="inline"
                selectedKeys={selectKeys}
                style={{ height: '100%', borderRight: 0 }}
              >
                {navList.map((nav) => (
                  <Menu.Item
                    key={nav.key}
                    icon={nav.icon}
                    onClick={() => selectMenu(nav.link, nav.key)}
                  >
                    {nav.name}
                  </Menu.Item>
                ))}
              </Menu>
            </Sider>
            <Layout style={{ marginLeft: 200, width: '100%', overflow: 'hidden' }}>
              <Content
                className={styles.siteLayoutBackground}
                style={{
                  minHeight: 280,
                }}
              >
                {props.children}
              </Content>
            </Layout>
          </Layout>
        </Layout>
      )}
    </div>
  );
};

export default Index;

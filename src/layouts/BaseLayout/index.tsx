import { ConfigProvider } from 'antd';
import React from 'react';
import type { User } from 'oidc-react';
import { AuthProvider } from 'oidc-react';
import zhCN from 'antd/es/locale/zh_CN';
import { history } from 'umi';
import { useDispatch } from '@/hooks';
import './index.less';

const Index: React.FC = (props) => {
  const dispatch = useDispatch();
  const oidcConfig = {
    onSignIn: (userData: User | null) => {
      if (userData) {
        dispatch.global.setState({
          avatar: userData.profile.avatar,
          name: userData.profile.userName,
          id_token: userData.id_token,
        });
      }

      history.push(window.location.pathname);
    },
    clientId: 'tl7f8qnsmkrp2k4a',
    redirectUri: `${window.location}`,
    responseType: 'id_token token',
    postLogoutRedirectUri: 'https://sso.yupaopao.com/oidc/logout',
    scope: 'openid profile email',
    authority: 'https://sso.yupaopao.com/oidc',
    silentRedirectUri: `${window.location}`,
    loadUserInfo: true,
  };

  return (
    <ConfigProvider locale={zhCN}>
      <AuthProvider {...oidcConfig}>{props.children}</AuthProvider>
    </ConfigProvider>
  );
};

export default Index;

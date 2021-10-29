import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';

const Index: React.FC = () => {
  return (
    <Result
      status="500"
      title="500"
      subTitle="服务升级中，请稍后"
      extra={
        <Button
          type="primary"
          onClick={() => {
            history.push('/');
          }}
        >
          回到首页
        </Button>
      }
    />
  );
};

export default Index;

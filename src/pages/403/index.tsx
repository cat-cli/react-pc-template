import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';

const Index: React.FC = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="您暂时没有权限访问"
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

import { useSelector } from '@/hooks';
import React from 'react';
import styles from './index.less';

const Index: React.FC = () => {
  const { name } = useSelector((state) => state.global);
  return <div className={styles.wrap}>你好，{name}！欢迎来到示例。</div>;
};

export default Index;

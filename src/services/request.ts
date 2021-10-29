/* eslint-disable*/
import { message } from 'antd';
import axios from 'axios';
import { getDvaApp, history } from 'umi';

const Request = axios.create({
  timeout: 10 * 1000,
});

// 拦截请求
Request.interceptors.request.use(
  async (config) => {
    // 请求过滤
    if (config.params) {
      Object.keys(config.params).forEach((key) => {
        if (config.params[key] === undefined) {
          delete config.params[key];
          if (config.method === 'get' && config.params[key] === null) {
            delete config.params[key];
          }
        }
      });
    }
    const { global } = getDvaApp()._store.getState();
    config.headers.Authorization = `Bearer ${global.id_token}`;

    return config;
  },
  (err) => Promise.reject(err),
);

Request.interceptors.response.use(
  (response) => {
    if (response.headers['content-type'] === 'application/octet-stream') {
      return response;
    }

    const res = response.data;
    if (!res) {
      message.error('网络不可用');
      history.push('/error/500');
    } else {
      if (res.status === 'success') {
        return res;
      }
      if (res.status === 'no permission') {
        const { global } = getDvaApp()._store.getState();
        if (global.id_token !== '') {
          history.push('/error/403');
        }
      }
      if (res.status === 'system error') {
        history.push('/error/500');
      }
      message.error(res.msg);
    }
    return null;
  },
  (err) => Promise.reject(err),
);

export default Request;

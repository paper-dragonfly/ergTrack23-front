import React from 'react';
import { Alert, Space, Spin } from 'antd';

export default function Loading () {
  <Space direction="vertical" className='w-screen h-screen'>
    <Space>   
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    </Space>

    {/* <Spin tip="Loading..."> */}
      <Alert
        message="Extracting your data"
        description="This can take a minute"
        type="info"
      />
    {/* </Spin> */}
  </Space>
}
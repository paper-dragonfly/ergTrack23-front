import React from 'react';
import { Alert, Space, Spin } from 'antd';

export default function Loading () {
  return(
    <div className='flex flex-col items-center'>
  <Space direction="vertical" className='flex flex-col items-center'>
    <Space>   
      <Spin  size="large"  >
        <div className="content " />
      </Spin>
    </Space>

    {/* <Spin tip="Loading..."> */}
      <Alert
        message="Extracting your data"
        description="This can take a minute"
        type="info"
        className='my-4'
      />
    {/* </Spin> */}
  </Space>
  </div>
  )
}
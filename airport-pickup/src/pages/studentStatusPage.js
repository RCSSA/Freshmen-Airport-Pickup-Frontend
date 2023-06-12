// import React, { useState } from "react";
import { Alert, Space, Button } from "antd";

// import { useNavigate } from 'react-router-dom';

export default function StudentStatusPage() {
  return (
    <div className="row justify-content-center p-5">
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
      >
        <div className="col-12 col-md-8">
          <Alert
            message="注册成功"
            description="您的信息已被记录，稍后我们会给您发送一封确认邮件，请注意查收。"
            type="success"
            showIcon
            closable
          />
        </div>

        <div className="col-12 col-md-8">
          <Alert
            message="信息审核中"
            description="您的信息正在审核中，您可以通过姓名邮箱查询审核和匹配进度，谢谢您的参与。"
            type="warning"
            showIcon
          />
        </div>
        <div className="row justify-content-center p-5">
          <div className="col-10 col-md-6">
            <Button href="/"> 返回首页 </Button>
          </div>
        </div>
      </Space>
    </div>
  );
}

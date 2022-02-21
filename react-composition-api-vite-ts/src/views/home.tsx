import Title from "antd/lib/typography/Title";
import React from "react";
import { defineComponent, designPage } from "plain-design-composition";

export default designPage(() => {
  return () => (<div>

    <Title>技术栈：react17 react-router-v6  mobx  mobx-react-lite </Title>

    <Title level={2}>

      全局共享一个store

      抽离crud通用逻辑

    </Title>
  </div>)
})
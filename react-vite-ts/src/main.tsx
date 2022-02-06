import React from 'react'
import ReactDOM from 'react-dom'
import '@/index.css'
import App from '@/App'
import Router from '@/router'
import { Route, Routes, useRoutes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import Test from '@/views/test'
import Antd from '@/views/antd'
import Home from '@/views/home'




ReactDOM.render(

  <BrowserRouter>
    {/* 注意这里如果使用配置化路由，要用一个单独的组件使用useRoute将生成的路由返回，而且它的父级一定是个router对象，不能直接使用Router，而要用BrowserRouter这样的组件 */}
    {/* 配置生成的方式 */}
    <Router></Router>
    {/* 手写组件方式 */}
    {/* <Routes >
      <Route path='/' element={<App />}>

        <Route index element={<Home />}></Route>
        <Route path='antd' element={<Antd />}></Route>
        <Route path='test' element={<Test />}></Route>
      </Route>
    </Routes> */}
  </BrowserRouter>
  ,
  document.getElementById('root')
)

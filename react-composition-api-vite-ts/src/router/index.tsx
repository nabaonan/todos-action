
import { RouteObject, useRoutes } from "react-router-dom";
import App from '@/App'
import React from "react";

const Home = React.lazy(() => import('@/views/home'))
const Test = React.lazy(() => import('@/views/Test'))
const Test2 = React.lazy(() => import('@/views/TestReactivue'))
const Antd = React.lazy(() => import('@/views/antd'))
const Mobx = React.lazy(() => import('@/views/antd/mobx'))
const Hook = React.lazy(() => import('@/views/antd/reacthook'))
import Notfound from '@/views/404'
import { Spin } from "antd";
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,

    children: [
      {
        index: true, element:
          <React.Suspense fallback={<Spin ></Spin>}>
            <Home></Home>
          </React.Suspense>
      },
      {
        path: 'antd', element:
          <React.Suspense fallback={<Spin ></Spin>}>
            <Antd></Antd>
          </React.Suspense>
      },
      {
        path: 'test', element:
          <React.Suspense fallback={<Spin ></Spin>}>
            <Test ></Test>
          </React.Suspense>
      },
      {
        path: 'test2', element:
          <React.Suspense fallback={<Spin ></Spin>}>
            <Test2 ></Test2>
          </React.Suspense>
      },
      {
        path: 'mobx', element:
          <React.Suspense fallback={<Spin ></Spin>}>
            <Mobx ></Mobx>
          </React.Suspense>
      },
      {
        path: 'hook', element:
          <React.Suspense fallback={<Spin ></Spin>}>
            <Hook ></Hook>
          </React.Suspense>
      },
      {
        path: '*',
        element: <Notfound />
      }

    ]
  },

]

function route() {
  return useRoutes(routes)
}
export default route
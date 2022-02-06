
import './App.css'
import { Button, Layout, Menu } from 'antd'
import { Route, Router, Routes, useLocation, useNavigate, } from 'react-router'
import { useRoutes, Outlet, BrowserRouter, HashRouter } from 'react-router-dom'

// import routes from './router'
import Antd from './views/antd/index'
import WrapRoute from './router'
import { useEffect, useLayoutEffect, useState } from 'react'



interface Nav {
  key: string;
  path: string;
  displayName: string;
}

interface MenuState {
  selectedKeys: string[];
}
function App() {


  const navs: Nav[] = [
    {
      key: "antd",
      path: "/antd",
      displayName: "antd",
    },
    {
      key: "test",
      path: "/test",
      displayName: "test",
    },

  ];

  const [selectedKeys, setSelectKeys] = useState<string[]>([]);
  const location = useLocation()
  //等路由变了之后激活
  useEffect(() => {
    setSelectKeys([location.pathname.slice(1)]);
  }, [])
  const navigate = useNavigate()
  const choose = ({
    key,
    item,
    selectedKeys,
  }: {
    item: React.ReactInstance;
    key: string;
    selectedKeys: string[];
  }): void => {
    setSelectKeys([key])

    navigate(`/${key}`)
    // router.push(key);
  };




  return (

    <Layout className="layout" style={{
      minHeight: '100vh'
    }}>
      <Layout.Header>
        <Menu
          theme="dark"
          selectedKeys={selectedKeys}
          mode="horizontal"
          style={{ lineHeight: '64px' }}
          onSelect={choose}
        >

          {
            navs.map(nav => {
              return <Menu.Item key={nav.key}>
                {nav.displayName}
              </Menu.Item>
            })

          }



        </Menu>
      </Layout.Header>
      <Layout.Content style={
        { padding: '0 50px', backgroundColor: 'white' }}>
        <Outlet />
      </Layout.Content>
      <Layout.Footer style={{
        textAlign: 'center'
      }}>
        todo list 实战应用，用于测试react，和组件库新特性
      </Layout.Footer>
    </Layout>









  )
}

export default App

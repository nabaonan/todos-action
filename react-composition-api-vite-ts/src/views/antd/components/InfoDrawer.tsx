import { DataItem } from "@/types/model"
import { Drawer, Typography } from "antd"
import React, { forwardRef, Ref, useImperativeHandle, useState } from "react"

interface IProps {
  // title: string
}



function InfoDrawer(props: IProps, ref: any) {

  const [visible, setVisible] = useState(false)
  const [currentData, setCurrentData] = useState<Partial<DataItem>>({

  })



  useImperativeHandle(ref, () => ({
    show: (data: DataItem): void => {
      setVisible(true)
      if (data) {
        console.log('获取数据', data)
        setCurrentData(data)
      } else {
        setCurrentData({

        })
      }
    },

  }))


  return (

    <Drawer title="查看" placement="right" closable={false}
      onClose={() => {
        setVisible(false)
      }}
      visible={visible}>
      <Typography>
        <Typography.Title>标题：{currentData.title}</Typography.Title>
      </Typography>
    </Drawer>

  )


}


export default forwardRef(InfoDrawer)



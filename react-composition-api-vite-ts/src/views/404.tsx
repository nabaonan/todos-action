import { Result } from "antd";
import { defineComponent, designPage } from "plain-design-composition";

export default designPage(() => {
  return () => <Result
    status="404"
    title="404"
    subTitle="没找到"
  // extra={<Button type="primary">Back Home</Button>}
  />
})
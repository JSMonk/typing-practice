import getColorForName from "name-to-color";
import { Avatar, Space } from "antd";

type NameProps = {
  name: string
}

export default function Name({ name }: NameProps) {
  return (
    <Space>
      <Avatar style={{ backgroundColor: getColorForName(name) }}>
        {name[0]}
      </Avatar>
      {name}
    </Space>
  );
}

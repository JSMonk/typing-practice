import { Tag } from "antd";

type RoleProps = {
  role: string,
}

export default function Role({ role }: RoleProps) {
  const color = getRoleColor(role);
  return (
    <Tag color={color} key={role}>
      {role.toUpperCase()}
    </Tag>
  );
}

function getRoleColor(role: string): string {
  switch(role) {
    case "client": return "green";
    case "moderator": return "volcano";
    case "admin": return "geekblue";
    default: return "";
  }
}

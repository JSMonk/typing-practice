import "./styles.css";
import Page from "../base";
import Name from "./name";
import Role from "./role";
import Actions from "./actions";
import useUsers from "../../hooks/use-users";
import useCurrentUser from "../../hooks/use-current-user";
import { Table, Breadcrumb } from "antd";
import { isPrivilegedUser, User } from "../../entities/user";
import { navigate, RouteComponentProps } from "@reach/router";

export default function Dashboard(_: RouteComponentProps) {
  const currentUser = useCurrentUser();
  const [users, onUserUpdates] = useUsers();

  if (!isPrivilegedUser(currentUser)) {
    if (Boolean(currentUser)) {
      navigate("/not-permission");
      return null;
    }

    navigate("/login");
    return null;
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string) => <Name name={name} />,
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
      render: (role: string) => <Role role={role} />,
    },
    {
      title: "Action",
      key: "action",
      render: (_: undefined, user: User) => (
        <Actions
          user={user}
          currentUser={currentUser}
          onAction={(action) => onUserUpdates(user, action)}
        />
      ),
    },
  ];

  return (
    <Page>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background content-container">
        <Table rowKey="id" columns={columns} dataSource={users} />
      </div>
    </Page>
  );
}

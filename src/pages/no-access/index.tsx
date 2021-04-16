import { Link } from "@reach/router";
import { Result } from "antd";
import type { RouteComponentProps } from "@reach/router";

export default function NoAccess(_: RouteComponentProps) {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you do not have permissions to view this page."
      extra={
        <Link to="/" className="ant-btn ant-btn-primary">
          Back Home
        </Link>
      }
    />
  );
}

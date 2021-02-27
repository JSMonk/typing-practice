import { Link } from "@reach/router";
import { Result } from "antd";
import type { RouteComponentProps } from "@reach/router";

export default function NotFound(_: RouteComponentProps) {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to="/" className="ant-btn ant-btn-primary">
          Back Home
        </Link>
      }
    />
  );
}

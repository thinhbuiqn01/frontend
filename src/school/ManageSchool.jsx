import { Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import PageComponent from "../components/PageComponent";
import TableManage from "../components/TableManage";

const ManageSchool = () => {
  const [roleGetData, setRoleGetData] = useState(1);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axiosClient
      .post(`students/${roleGetData}`)
      .then(({ data, status }) => {
        setStudents(data.users);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Họ tên sinh viên",
      dataIndex: "name",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle" key={record.id}>
          <Link to={"/truong/sinh-vien/xem"} state={{ user: record }}>
            Xem
          </Link>
        </Space>
      ),
    },
  ];
  return (
    <PageComponent title="Quản lý doanh nghiệp">
      <TableManage columns={columns} dataSource={students} />
    </PageComponent>
  );
};

export default ManageSchool;

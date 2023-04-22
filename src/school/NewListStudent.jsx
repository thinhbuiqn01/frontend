import React from "react";
import { AdminNewStudents } from "../Admin";
import PageComponent from "../components/PageComponent";

const NewListStudent = () => {
  return (
    <PageComponent title="Thêm danh sách sinh viên mới">
      <AdminNewStudents route={"/truong/sinh-vien"} />
    </PageComponent>
  );
};

export default NewListStudent;

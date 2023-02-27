import React, { useState } from "react";
import validator from "validator";
import * as XLSX from "xlsx";
import { AdminNewStudents } from "../Admin";
import axiosClient from "../api/axiosClient";
import PageComponent from "../components/PageComponent";

const endEmail = "@sv.ute.udn.vn";
const fileType = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];
const NewListStudent = () => {
  return (
    <PageComponent title="Thêm danh sách sinh viên mới">
      <AdminNewStudents />
    </PageComponent>
  );
};

export default NewListStudent;

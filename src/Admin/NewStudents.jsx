import { Button, Space } from "antd";
import { differenceBy } from "lodash";
import React, { useEffect, useState } from "react";
import { Link, useNavigation } from "react-router-dom";
import validator from "validator";
import * as XLSX from "xlsx";
import axiosClient from "../api/axiosClient";
import TableManage from "../components/TableManage";
const columns = [
  {
    title: "STT",
    dataIndex: "action",
    render: (_, record, index) => (
      <div key={record.id}>
        <p>{index + 1}</p>
      </div>
    ),
  },
  {
    title: "Tên sinh viên",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mật khẩu mặc định",
    dataIndex: "password",
  },
];
const endEmail = "@sv.ute.udn.vn";
const fileType = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];
const NewStudents = ({ route }) => {
  const [excelData, setExcelData] = useState(null);
  const [excelFile, setExcelFile] = useState(null);
  const [responseBackend, setResponseBackend] = useState(null);
  const [nameFile, setNameFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);
  const [students, setStudents] = useState([]);
  const [informs, setInforms] = useState([]);

  const navigate = useNavigation();

  useEffect(() => {
    axiosClient
      .post("users")
      .then((data) => {
        const studentFilter = data.data.users?.filter((i) => {
          return i.role == 1;
        });
        setStudents(studentFilter);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const handleImportFile = (e) => {
    let selectFile = e.target.files[0];
    setNameFile(e.target.files[0].name);
    if (selectFile) {
      if (selectFile && fileType.includes(selectFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectFile);
        reader.onload = (e) => {
          setExcelFileError(null);
          setExcelFile(e.target.result);
        };
        setExcelFile();
      } else {
        setExcelFileError("Vui lòng chọn định dạng file là .xlsx");
        setExcelFile(null);
      }
    } else {
      console.log("Vui lòng chọn file");
    }
  };

  const handleSubmitDataExcel = (e) => {
    e.preventDefault();

    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const workSheetName = workbook.SheetNames[0];
      const workSheet = workbook.Sheets[workSheetName];
      const data = XLSX.utils.sheet_to_json(workSheet);

      const formatData = data?.map((item) => {
        return {
          name: validator.trim(item.name),
          email: `${item.id_sv}${endEmail}`,
          phone: `0${item.sdt}`,
          password: "abc01234",
        };
      });

      /* Way one */
      const formatDataFilter = formatData.filter(
        (item) => !students.some((itemStu) => itemStu.email == item.email)
      );
      /* Way to */
      const differenceData = differenceBy(formatData, students, "email");

      if (differenceData.length !== 0) {
        setExcelData(differenceData);
      } else {
        alert("Dữ liệu đã tồn tại");
      }

      //setExcelData(formatDataFilter);
    } else {
      setExcelData(null);
    }
  };
  const handleAddData = (e) => {
    axiosClient
      .post("/create-list-user", excelData)
      .then(({ data }) => {
        //setInforms()
        setStudents(data.data.users);
        alert("Cập nhật danh sách sinh viên thành công");
        setExcelData([]);
        setExcelFile(null);
      })
      .catch((e) => {
        setResponseBackend("Dữ liệu đã tồn tại");
      });
  };

  return (
    <div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Thêm danh sách sinh viên
        </label>
        <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <form onSubmit={(e) => handleSubmitDataExcel(e)}>
              <span className="text-red-400">{excelFileError}</span>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span> {nameFile ? nameFile : "Chọn file"}</span>
                  <input
                    required
                    onChange={(e) => handleImportFile(e)}
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">hoặc kéo thả</p>
              </div>
              <p className="text-xs text-gray-500">.xlsx dưới 100MP</p>
              {excelFile ? (
                <button
                  style={{
                    border: "1px solid #1677ff",
                    textColor: "#1677ff",
                    padding: "4px 8px",
                    borderRadius: "4px",
                  }}
                >
                  Kiểm tra dữ liệu
                </button>
              ) : (
                ""
              )}
            </form>
          </div>
        </div>
        <div className="mt-10">
          <div style={{ float: "right" }} className="mb-5">
            {excelFile && excelData?.length ? (
              <Button outline danger onClick={(e) => handleAddData(e)}>
                Thêm danh sách
              </Button>
            ) : (
              ""
            )}
          </div>
          {excelData?.length == 0 || excelData == null ? (
            ""
          ) : (
            <TableManage columns={columns} dataSources={excelData} />
          )}
        </div>
      </div>
    </div>
  );
};
export default NewStudents;

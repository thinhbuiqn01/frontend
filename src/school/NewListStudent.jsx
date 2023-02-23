import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import validator from "validator";
import axiosClient from "../api/axiosClient";

const endEmail = "@sv.ute.udn.vn";
const NewListStudent = () => {
  const [excelData, setExcelData] = useState(null);
  /*   useEffect(() => {
    axiosClient
      .post("/create-list-user", excelData)
      .then(({ data }) => {
        console.log(data.status);
        console.log(excelData, "dong 15");

        // navigate("/");
      })
      .catch((e) => {
        console.log(e);
      });
  }, [excelData]); */ 

  const fileType = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];
  const [excelFile, setExcelFile] = useState(null);

  const [excelFileError, setExcelFileError] = useState(null);

  const handleImportFile = (e) => {
    let selectFile = e.target.files[0];
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

      setExcelData(
        data?.map((item) => {
          return {
            name: validator.trim(item.name),
            email: `${item.id_sv}${endEmail}`,
            phone: `0${item.sdt}`,
            password: "abc01234",
          };
        })
      );
    } else {
      setExcelData(null);
    }
  }; /* 
  const validateData = excelData?.map((item) => {
    return {
      name: validator.trim(item.name),
      email: `${item.id_sv}${endEmail}`,
      phone: `0${item.sdt}`,
      password: "@abc0123",
    };
  }); */
  //console.log(validateData);
  const handleAddData = (e) => {
    axiosClient
      .post("/create-list-user", excelData)
      .then(({ data }) => {
        console.log(data.status);
        console.log(excelData, "dong 86");

        // navigate("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      upload file excel
      <form onSubmit={(e) => handleSubmitDataExcel(e)}>
        <input type="file" required onChange={(e) => handleImportFile(e)} />
        <button>submit</button>
      </form>
      <button onClick={(e) => handleAddData(e)}>submit</button>
    </div>
  );
};

export default NewListStudent;

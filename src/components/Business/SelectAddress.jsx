import { Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";

const SelectAddress = ({ setMapWork }) => {
  const [districtStatus, setDistrictStatus] = useState(true);
  const [wardStatus, setWardStatus] = useState(true);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [districtSort, setDistrictSort] = useState([]);
  const [wardSort, setWardSort] = useState([]);

  const [nameProvince, setNameProvince] = useState("");
  const [nameDistrict, setNameDistrict] = useState("");
  const [nameWard, setNameWard] = useState("");

  const handleSelectProvince = (value) => {
    const sortDistrict = districts.filter((item) => {
      return item._province_id == value;
    });

    setNameProvince(() => {
      const name = provinces.find((item) => item.id === value);
      console.log(name);
      return name._name;
    });
    setMapWork(` ${nameWard}, ${nameDistrict}, ${nameProvince}`);

    setDistrictSort(sortDistrict);
    if (sortDistrict.length > 0) {
      setDistrictStatus(false);
    } else {
      setDistrictStatus(true);
      setWardStatus(true);
    }
  };
  const handleSelectDistrict = (value) => {
    const sortWard = wards.filter((item) => {
      return item._district_id == value;
    });

    setNameDistrict(() => {
      const name = districts.find((item) => item.id === value);
      return `${name._prefix} ${name._name}`;
    });
    setMapWork(` ${nameWard}, ${nameDistrict}, ${nameProvince}`);

    if (sortWard.length > 0) {
      setWardSort(sortWard);
      setWardStatus(false);
    } else {
      setWardStatus(true);
    }
  };
  const handleSelectWard = (value) => {
    setNameWard(() => {
      const name = wards.find((item) => item.id === value);
      return `${name._prefix} ${name._name}`;
    });
    setMapWork(` ${nameWard}, ${nameDistrict}, ${nameProvince}`);
  };

  useEffect(() => {
    axiosClient.get("address/local").then((res) => {
      setDistricts(res.data.district);
      setWards(res.data.ward);
      setProvinces(res.data.province);
    });
  }, []);
  return (
    <>
      <Space wrap>
        <Select
          onChange={(value) => handleSelectProvince(value)}
          defaultValue="Tỉnh/ Thành phố"
          style={{
            width: 200,
          }}
          bordered={true}
          options={provinces?.map((item) => {
            return {
              value: item.id,
              label: item._name,
            };
          })}
        />
        <Select
          onChange={(e) => handleSelectDistrict(e)}
          defaultValue="Quận /Huyện"
          style={{
            width: 200,
          }}
          disabled={districtStatus}
          bordered={true}
          options={districtSort?.map((item) => {
            return {
              value: item.id,
              label: item._name,
            };
          })}
        />
        <Select
          onChange={(e) => handleSelectWard(e)}
          defaultValue="Phường Xã"
          style={{
            width: 200,
          }}
          disabled={wardStatus}
          options={wardSort?.map((item) => {
            return {
              value: item.id,
              label: item._name,
            };
          })}
        />
      </Space>
    </>
  );
};

export default SelectAddress;

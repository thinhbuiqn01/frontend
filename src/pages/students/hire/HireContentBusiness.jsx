import React from "react";
import styled from "styled-components";
import { host } from "../../../utils/APIRoutes";

const HireContentBusiness = ({ business }) => {
  return (
    <Wrapper>
      <div className="text">
        <p>
          Nhận thấy các cơ hội đầy hứa hẹn ở Việt Nam trong lĩnh vực fintech,
          Hanwha đã tiến hành M&A Công ty Cổ phần Chứng khoán HFT – Công ty
          chứng khoán online và giá rẻ đầu tiên tại Việt Nam - vào tháng 4/2019,
          đặt dấu chân cho chuyến hành trình công nghệ tài chính của Hanwha tại
          Việt Nam. Sau đó, vào tháng 12/2019, Công ty đã tổ chức lễ đổi tên,
          chính thức ra mắt thương hiệu Chứng khoán Pinetree - Pinetree
          Securities.
        </p>
        <p>
          Trước đó, đơn vị bảo hiểm nhân thọ của Hanwha – Hanwha Life – đã có
          mặt ở thị trường Việt Nam trong 10 năm qua và hiện đang là công ty bảo
          hiểm nhân thọ lớn thứ 8.
        </p>
        <p>
          Trong tháng 8/2018, Hanwha Investment & Securities đã đầu tư 400 triệu
          USD vào Vingroup.
        </p>
        <p>
          Các công ty con khác của Hanwha cũng hoạt động tại Việt Nam là Hanwha
          Techwin, Hanwha Aerospace, Hanwha Energy, Hanwha Corporation/ Trade và
          Hanwha Precision Machinery.
        </p>
      </div>
      <div className="image">
        <img src={`${host}/uploads/${business.image}`} alt="" />
      </div>
    </Wrapper>
  );
};

export default HireContentBusiness;

const Wrapper = styled.div`
  display: flex;

  .text {
    width: 68%;
    margin: 0 1% 0 0;

    p {
      text-align: justify;
      margin: 10px 0;
      text-indent: 20px;
    }
  }
  .image {
    width: 30%;
    margin: 0 0 0 1%;
    img {
      width: 100%;
    }
  }
`;

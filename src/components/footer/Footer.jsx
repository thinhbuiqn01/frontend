import React from "react";
import "./footer.scss";
 
import logo from "../../assets/images/logo.png";
 
const Footer = () => {
  return (
    <footer>
      <div className="content">
        <div className="content__contact">
 
          <h3>ĐÀO TẠO</h3>
          <ul>
            <li> ĐÀO TẠO</li>
            <li> CHƯƠNG TRÌNH ĐÀO TẠO</li>
            <li> QUY CHẾ, QUY ĐỊNH</li>
            <li> WESITE ĐÀO TẠO</li>
            <li> WESITE TUYỂN SINH</li>
          </ul>
        </div>
        <div className="content__education">
          <h3>TÀI NGUYÊN</h3>
          <ul>
            <li>TÀI NGUYÊN SỐ</li>
            <li>THƯ VIỆN SỐ</li>
            <li>E-LEARNING</li>
            <li>HỌC BỔNG - VIỆC LÀM</li>
          </ul>
        </div>
        <div className="content__priority">
          <h3> QUY ĐỊNH CHUNG</h3>
          <ul>
            <li>QUY CHẾ TỔ CHỨC VÀ HOẠT ĐỘNG</li>
            <li>QUY CHẾ BỔ NHIỆM</li>
            <li>QUY ĐỊNH CẤP XÉT HỌC BỔNG</li>
            <li>QUY CHẾ CHI TIÊU NỘI BỘ</li>
            <li>QUY CHẾ DÂN CHỦ</li>
          </ul>
        </div>
        <div className="content__community">
          <h3>KẾT NỐI ĐẾN TRƯỜNG</h3>
          <ul>
            <li>FACEBOOK</li>
            <li>WIKIPEDIA</li>
            <li>YOUTUBE</li>
            <li> LIÊN HỆ</li>
          </ul>
        </div>
        <div className="content__logo">
          <div className="image">
            <img src={logo} alt="" />
          </div>
        </div>
      </div>
      <div className="content">
        <div className="content__details">
          <div className="copyright">
            Copyright 2022 Website University of Technology and Education - The
            University of Danang. All Rights Reserved.
          </div>
          <div className="location">
            Địa chỉ: số 48 Cao Thắng, TP. Đà Nẵng - Điện thoại: (0236) 3822571 -
            Email: dhspktdn@ute.udn.vn
          </div>
        </div>
 
          <h3>Thông tin liên hệ</h3>
          <ul>
            <li>Tầng 3, 48 Cao Thắng, Thanh Bình, Hải Châu, Đà Nẵng</li>
            <li>Email: spkt@gmail.com</li>
            <li>Hotline: 1800 8001 - 0981.552.379</li>
            <li>
              Website: <a href=" https://ute.udn.vn" />{" "}
            </li>
          </ul>
        </div>
        <div className="content__map"></div>
        <div className="content__community"></div>
 
      </div>
    </footer>
  );
};

export default Footer;

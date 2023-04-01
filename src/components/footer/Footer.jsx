import React from "react";
import "./footer.scss";
const Footer = () => {
  return (
    <footer>
      <div className="content">
        <div className="content__contact">
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

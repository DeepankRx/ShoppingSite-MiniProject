import '../CSS/Footer.css';
import { Modal } from "react-bootstrap";
function Footer() {
  return (
    <footer>
      <div className="footer">
        <div className="footer-row">
          <a href="#">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fa fa-instagram"></i>
          </a>
          <a href="#">
            <i className="fa fa-youtube"></i>
          </a>
          <a href="#">
            <i className="fa fa-twitter"></i>
          </a>
        </div>

        <div className="footer-row">
          <ul>
            <li>
              <a href="#">Contact us</a>
            </li>
            <li>
              <a href="#">Our Services</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms & Conditions</a>
            </li>
            <li>
              <a href="#">Career</a>
            </li>
          </ul>
        </div>

        <div className="footer-row">
          My Shopping Site © 2022 All Rights Reserved. | Deepank Pushpad
        </div>
      </div>
    </footer>
  );
}
export default Footer;

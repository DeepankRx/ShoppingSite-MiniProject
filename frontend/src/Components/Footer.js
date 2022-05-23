import '../CSS/Footer.css';
import {Link} from "react-router-dom"
function Footer() {
  return (
    <footer>
      <div className="footer">
        <div className="footer-row">
          <Link to="#">
            <i className="fa fa-facebook"></i>
          </Link>
          <Link to="#">
            <i className="fa fa-instagram"></i>
          </Link>
          <Link to="#">
            <i className="fa fa-youtube"></i>
          </Link>
          <Link to="#">
            <i className="fa fa-twitter"></i>
          </Link>
        </div>

        <div className="footer-row">
          <ul>
            <li>
              <Link to="#">Contact us</Link>
            </li>
            <li>
              <Link to="#">Our Services</Link>
            </li>
            <li>
              <Link to="#">Privacy Policy</Link>
            </li>
            <li>
              <Link to="#">Terms & Conditions</Link>
            </li>
            <li>
              <Link to="#">Career</Link>
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

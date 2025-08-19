import './index.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div>
          <h2>BulkRoots</h2>
          <p>
            Providing fresh, high-quality produce directly from farms to businesses.
            Supporting local farmers and sustainable agriculture.
          </p>
          <div className="social-icons">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
          </div>
        </div>

        <div>
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/Product">Products</a></li>
            <li><a href="#">My Orders</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3>Categories</h3>
          <ul>
            <li>Vegetables</li>
            <li>Fruits</li>
            <li>Herbs</li>
            <li>Organic</li>
            <li>Seasonal</li>
          </ul>
        </div>

        <div>
          <h3>Contact Us</h3>
          <ul>
            <li>📍 123 Farming Road, Fresh Valley, CA 94103</li>
            <li>📞 +1 (555) 123-4567</li>
            <li>📧 contact@freshbulk.com</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">© 2023 FreshBulk. All rights reserved.</div>
    </footer>
  );
};

export default Footer;

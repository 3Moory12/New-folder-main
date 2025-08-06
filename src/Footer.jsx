import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ background: '#f8f8f8', borderTop: '1px solid #eee', padding: '40px 20px', marginTop: '50px' }}>
      <div style={{ maxWidth: '1200px', margin: 'auto', textAlign: 'center' }}>
        <h3 style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '10px' }}>ستايلك</h3>
        <p style={{ color: '#666', marginBottom: '20px' }}>نصنع المستقبل بخيوط ذوقك!</p>
        <div style={{ borderTop: '1px solid #ddd', paddingTop: '20px' }}>
          <p>© 2025 ستايلك. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
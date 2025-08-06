import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 space-x-reverse mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">س</span>
              </div>
              <span className="text-2xl font-bold text-primary">ستايلك</span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              منصة ستايلك هي منصة إلكترونية مبتكرة تمكّن النساء في المملكة العربية السعودية من تصميم عبايات وفساتين حسب ذوقهن باستخدام واجهة تفاعلية تعتمد على الذكاء الاصطناعي.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/custom-design" className="text-muted-foreground hover:text-primary transition-colors">
                  التصميم المخصص
                </Link>
              </li>
              <li>
                <Link to="/designers" className="text-muted-foreground hover:text-primary transition-colors">
                  المصممات
                </Link>
              </li>
              <li>
                <Link to="/seamstresses" className="text-muted-foreground hover:text-primary transition-colors">
                  الخياطات
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 space-x-reverse">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">info@stylk.sa</span>
              </li>
              <li className="flex items-center space-x-3 space-x-reverse">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">+966 50 123 4567</span>
              </li>
              <li className="flex items-center space-x-3 space-x-reverse">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">الرياض، المملكة العربية السعودية</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2025 ستايلك. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


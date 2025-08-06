import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/supabaseClient.js';
import { Menu, X } from 'lucide-react'; // استيراد أيقونات القائمة

const Header = ({ session }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const navigation = [
    { name: 'الرئيسية', href: '/' },
    { name: 'التصميم المخصص', href: '/custom-design' },
    { name: 'المصممات', href: '/designers' },
    { name: 'الخياطات', href: '/seamstresses' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            ستايلك
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            {navigation.map((item) => (
              <Link key={item.name} to={item.href} className="text-gray-600 hover:text-gray-900">
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {session ? (
              <>
                <Link to="/dashboard"><button className="btn">لوحة التحكم</button></Link>
                <button onClick={handleLogout} className="btn-secondary">تسجيل الخروج</button>
              </>
            ) : (
              <Link to="/login"><button className="btn">تسجيل الدخول</button></Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg">
          <nav className="flex flex-col p-4 gap-4">
            {navigation.map((item) => (
              <Link key={item.name} to={item.href} className="text-gray-600 hover:text-gray-900 py-2" onClick={() => setIsMenuOpen(false)}>
                {item.name}
              </Link>
            ))}
            <hr />
            {session ? (
              <>
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}><button className="btn w-full">لوحة التحكم</button></Link>
                <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="btn-secondary w-full">تسجيل الخروج</button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)}><button className="btn w-full">تسجيل الدخول</button></Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
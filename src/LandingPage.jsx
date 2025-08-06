// src/LandingPage.jsx
import React from 'react';

const LandingPage = () => {
  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center', padding: '40px 20px' }}>

      {/* Main Title Section */}
      <section style={{ marginBottom: '60px' }}>
        <h1 style={{ fontSize: '48px', color: '#333' }}>أنتِ مصممة أو خياطة موهوبة؟</h1>
        <p style={{ fontSize: '20px', color: '#555' }}>
          "ستايلك" هي فرصتك للوصول لآلاف العميلات وتحويل موهبتك إلى مصدر دخل إضافي.
        </p>
      </section>

      {/* The Problem Section */}
      <section style={{ marginBottom: '60px', background: '#f9f9f9', padding: '40px 20px', borderRadius: '8px' }}>
        <h2 style={{ fontSize: '36px', marginBottom: '30px' }}>هل تواجهين هذه الصعوبات؟</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
          <div style={{ maxWidth: '300px' }}>
            <h3>صعوبة الوصول للعملاء</h3>
            <p>تفتقرين لطريقة سهلة لعرض تصاميمك أو خدماتك لجمهور كبير.</p>
          </div>
          <div style={{ maxWidth: '300px' }}>
            <h3>حماية حقوق التصميم</h3>
            <p>تخافين من سرقة أفكار وتصاميم عباياتك عند عرضها أونلاين.</p>
          </div>
          <div style={{ maxWidth: '300px' }}>
            <h3>التسويق الاحترافي</h3>
            <p>تجدين صعوبة في التسويق لخدمات الخياطة الخاصة بك بشكل يثبت جودة عملك.</p>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '36px', marginBottom: '30px' }}>"ستايلك" هو الحل!</h2>
        <p style={{ color: '#555', marginBottom: '40px' }}>نحن نوفر لكِ بيئة رقمية متكاملة تضمن لكِ النجاح:</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
            <p>✅ وصول مباشر لعميلات يبحثن عن تصاميم فريدة.</p>
            <p>✅ حماية لخصوصية تصاميمك بعلامات مائية ومنع الحفظ.</p>
            <p>✅ نظام تقييمات ومراجعات حقيقية لبناء سمعتك.</p>
        </div>
      </section>

      {/* Call to Action Section */}
      <section style={{ background: '#333', color: 'white', padding: '50px 20px', borderRadius: '8px' }}>
        <h2 style={{ fontSize: '36px' }}>كوني من الأوائل وانضمي إلينا!</h2>
        <p style={{ marginBottom: '30px' }}>
          التسجيل في مرحلة الإطلاق مجاني ومحدود لأول 10 مصممات و 10 خياطات. لا تفوتي الفرصة!
        </p>
        <a 
          href="https://docs.google.com/forms/d/e/1FAIpQLSeSMIe2lb_tEy42J2NDoUc5SbHIk_4U3pRyZVPm44q2NZsYZQ/viewform?usp=sf_link"
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            display: 'inline-block', 
            padding: '15px 40px', 
            fontSize: '18px', 
            cursor: 'pointer', 
            background: '#FFD700', // لون ذهبي
            color: '#333', 
            border: 'none', 
            borderRadius: '5px',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          سجلي اهتمامك الآن
        </a>
      </section>

    </div>
  );
};

export default LandingPage;
import React, { useState } from 'react';

/**
 * CustomDesignComponent
 *
 * This React component implements a simplified interactive interface for
 * designing an abaya. Users can select a base colour, choose from a set of
 * predefined patterns, and pick a silhouette style (open front or closed).
 * A preview panel updates in real time to reflect the chosen options. This
 * serves as a starting point and can be extended with more options such as
 * fabric types, embroidery placement, AI‑generated suggestions, or drag‑and‑drop
 * pattern positioning.
 */
export default function CustomDesignComponent() {
  // Available colours for the abaya. You can extend this palette or fetch it
  // from a configuration file or API.
  const colours = [
    { name: 'أسود', value: '#1e1e1e' },
    { name: 'بيج', value: '#c5a57a' },
    { name: 'كحلي', value: '#0f3057' },
    { name: 'وردي فاتح', value: '#f6ced8' },
  ];

  // Predefined pattern images. To keep the example self‑contained, we
  // reference placeholder images hosted on the internet. Replace these URLs
  // with your own pattern assets or upload them to your project.
  const patterns = [
    {
      name: 'بدون نقشة',
      value: '',
    },
    {
      name: 'نقشة ورود',
      value:
        'https://images.pexels.com/photos/12886681/pexels-photo-12886681.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150',
    },
    {
      name: 'نقشة هندسية',
      value:
        'https://images.pexels.com/photos/6683063/pexels-photo-6683063.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150',
    },
  ];

  // Styles: open front vs closed.
  const styles = [
    { name: 'مفتوحة من الأمام', value: 'open' },
    { name: 'مغلقة بالكامل', value: 'closed' },
  ];

  const [selectedColour, setSelectedColour] = useState(colours[0].value);
  const [selectedPattern, setSelectedPattern] = useState(patterns[0].value);
  const [selectedStyle, setSelectedStyle] = useState(styles[0].value);

  // Helper to generate inline styles for the preview panel. It overlays the
  // pattern on the chosen colour. The background size is fixed here but can
  // be customised via user input.
  const previewStyle = {
    backgroundColor: selectedColour,
    backgroundImage: selectedPattern ? `url(${selectedPattern})` : 'none',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '300px',
    borderRadius: '0.75rem',
    position: 'relative',
    overflow: 'hidden',
  };

  return (
    <div className="flex flex-col gap-6 py-8 px-4">
      <h2 className="text-2xl font-bold text-center">
        صممي عبايتك حسب ذوقك
      </h2>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Control panel */}
        <div className="md:w-1/2 space-y-6">
          {/* Colour selection */}
          <div>
            <h3 className="text-lg font-semibold mb-2">اختاري اللون</h3>
            <div className="grid grid-cols-4 gap-4">
              {colours.map((c) => (
                <button
                  key={c.value}
                  className={`h-10 w-10 rounded-full border-2 focus:ring-2 focus:ring-offset-2 ${selectedColour === c.value ? 'ring-2 ring-blue-500' : ''}`}
                  style={{ backgroundColor: c.value }}
                  title={c.name}
                  onClick={() => setSelectedColour(c.value)}
                ></button>
              ))}
            </div>
          </div>
          {/* Pattern selection */}
          <div>
            <h3 className="text-lg font-semibold mb-2">اختاري النقشة</h3>
            <div className="grid grid-cols-3 gap-4">
              {patterns.map((p) => (
                <div
                  key={p.name}
                  className={`p-2 border rounded-lg cursor-pointer ${
                    selectedPattern === p.value ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedPattern(p.value)}
                >
                  {p.value ? (
                    <img
                      src={p.value}
                      alt={p.name}
                      className="w-full h-20 object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-full h-20 flex items-center justify-center rounded-md bg-gray-100 text-sm">
                      {p.name}
                    </div>
                  )}
                  <p className="text-center text-xs mt-1">{p.name}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Style selection */}
          <div>
            <h3 className="text-lg font-semibold mb-2">اختاري القصّة</h3>
            <div className="flex gap-4">
              {styles.map((s) => (
                <button
                  key={s.value}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium focus:outline-none ${
                    selectedStyle === s.value ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'
                  }`}
                  onClick={() => setSelectedStyle(s.value)}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Preview panel */}
        <div className="md:w-1/2">
          <h3 className="text-lg font-semibold mb-2">معاينة التصميم</h3>
          <div style={previewStyle} className="shadow-lg" />
          {/* Display style description */}
          <p className="mt-4 text-sm text-gray-700">
            القصّة المختارة: {selectedStyle === 'open' ? 'مفتوحة من الأمام' : 'مغلقة بالكامل'}
          </p>
        </div>
      </div>
      {/* Placeholder for future features */}
      <div className="mt-8 border-t pt-6">
        <h3 className="text-lg font-semibold mb-2">أفكار لتوسيع الميزة</h3>
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
          <li>
            إضافة منتقي قماش يغيّر ملمس الخامة (بدعم تحريك أو صور عالية الدقة).
          </li>
          <li>إدخال مقاسات المستخدم لتحسين استعراض النموذج.</li>
          <li>
            ربط واجهة الذكاء الاصطناعي لتوليد اقتراحات تلقائية بناءً على
            المدخلات.
          </li>
          <li>إمكانية مشاركة التصميم أو حفظه واستكماله لاحقًا.</li>
        </ul>
      </div>
    </div>
  );
}
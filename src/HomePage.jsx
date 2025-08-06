import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HomePage = () => {
  const featuredDesigns = [
    { id: 1, title: 'فستان سهرة أنيق', designer: 'المصممة سارة' },
    { id: 2, title: 'عباية مطرزة فاخرة', designer: 'المصممة نورا' },
    { id: 3, title: 'فستان كاجوال عصري', designer: 'المصممة ريم' },
  ];

  const howItWorks = [
    { title: '1. اختاري التصميم', description: 'تصفحي التصاميم أو ابدئي تصميمك' },
    { title: '2. اختاري المصممة والخياطة', description: 'اختاري من أفضل المواهب' },
    { title: '3. استلمي تصميمك', description: 'احصلي على تصميمك الفريد' },
  ];

  return (
    <div className="space-y-12 md:space-y-20">
      {/* Hero Section */}
      <section className="text-center py-20 px-4 bg-gray-50">
        <h1 className="text-5xl font-bold mb-4">اكتشفي أناقتك مع ستايلك</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          منصة تصميم وطلب أزياء نسائية مخصصة تربطك بأفضل المصممات والخياطات في المملكة
        </p>
        <Link to="/custom-design">
          <Button size="lg">ابدئي التصميم الآن</Button>
        </Link>
      </section>

      {/* Featured Designs */}
      <section className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">أحدث التصاميم</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {featuredDesigns.map((design) => (
            <Card key={design.id} className="overflow-hidden">
              <div className="bg-gray-200 h-80 flex items-center justify-center">
                <span className="text-muted-foreground">صورة التصميم</span>
              </div>
              <CardHeader>
                <CardTitle>{design.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">من {design.designer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gray-50">
        <h2 className="text-4xl font-bold text-center mb-12">كيف يعمل ستايلك؟</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {howItWorks.map((step) => (
            <div key={step.title}>
              <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Star, Users, Palette, Scissors } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import heroImage from '../assets/hero-abaya.jpg';
import featuredDress1 from '../assets/featured-dress1.jpg';
import featuredDress2 from '../assets/featured-dress2.jpg';
import featuredDress3 from '../assets/featured-dress3.jpg';

const HomePage = () => {
  const featuredDesigns = [
    {
      id: 1,
      image: featuredDress1,
      title: 'فستان سهرة أنيق',
      designer: 'المصممة سارة',
      price: '1,200 ريال',
      rating: 4.8,
    },
    {
      id: 2,
      image: featuredDress2,
      title: 'عباية مطرزة فاخرة',
      designer: 'المصممة نورا',
      price: '800 ريال',
      rating: 4.9,
    },
    {
      id: 3,
      image: featuredDress3,
      title: 'فستان كاجوال عصري',
      designer: 'المصممة ريم',
      price: '650 ريال',
      rating: 4.7,
    },
  ];

  const howItWorks = [
    {
      icon: <Palette className="h-8 w-8" />,
      title: 'اختاري التصميم',
      description: 'تصفحي التصاميم الجاهزة أو ابدئي تصميمك المخصص',
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'اختاري المصممة والخياطة',
      description: 'اختاري من بين أفضل المصممات والخياطات المعتمدات',
    },
    {
      icon: <Scissors className="h-8 w-8" />,
      title: 'استلمي تصميمك',
      description: 'احصلي على تصميمك الفريد بأعلى جودة وفي الوقت المحدد',
    },
  ];

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="عباية أنيقة"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            اكتشفي أناقتك مع <span className="text-secondary">ستايلك</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            منصة تصميم وطلب أزياء نسائية مخصصة تربطك بأفضل المصممات والخياطات في المملكة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/custom-design">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-3">
                ابدئي التصميم الآن
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/designers">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black px-8 py-3">
                تصفحي التصاميم الجاهزة
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Designs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">أحدث التصاميم</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              اكتشفي مجموعة مختارة من أجمل التصاميم من أفضل المصممات
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDesigns.map((design) => (
              <Card key={design.id} className="card-shadow hover-scale overflow-hidden">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={design.image}
                    alt={design.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{design.title}</h3>
                  <p className="text-muted-foreground mb-2">{design.designer}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{design.price}</span>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-muted-foreground">{design.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/designers">
              <Button variant="outline" size="lg">
                عرض جميع التصاميم
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">كيف يعمل ستايلك؟</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              ثلاث خطوات بسيطة للحصول على تصميمك المثالي
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-primary text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            هل أنت مصممة أو خياطة موهوبة؟
          </h2>
          <p className="text-xl mb-8">
            انضمي إلى منصة ستايلك وابدئي في عرض تصاميمك وخدماتك لآلاف العميلات
          </p>
          <Link to="/login">
            <Button size="lg" variant="secondary" className="px-8 py-3">
              انضمي إلينا الآن
              <ArrowLeft className="mr-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;


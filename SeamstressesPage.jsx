import React, { useState } from 'react';
import { Search, Star, MapPin, Clock, Award, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';

const SeamstressesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [filterByCity, setFilterByCity] = useState('all');

  const seamstresses = [
    {
      id: 1,
      name: 'أم محمد الحربي',
      specialty: ['عبايات', 'فساتين سهرة'],
      location: 'الرياض - حي النرجس',
      rating: 4.9,
      reviewsCount: 234,
      completedOrders: 156,
      experience: '12 سنة',
      deliveryTime: '5-7 أيام',
      priceRange: '200 - 800 ريال',
      verified: true,
      available: true,
      bio: 'خياطة محترفة متخصصة في العبايات والفساتين الفاخرة مع خبرة واسعة في التطريز اليدوي',
      services: ['خياطة', 'تطريز', 'تعديل المقاسات', 'إصلاح'],
    },
    {
      id: 2,
      name: 'فاطمة العنزي',
      specialty: ['أزياء كاجوال', 'ملابس أطفال'],
      location: 'جدة - حي الزهراء',
      rating: 4.8,
      reviewsCount: 189,
      completedOrders: 203,
      experience: '8 سنوات',
      deliveryTime: '3-5 أيام',
      priceRange: '150 - 600 ريال',
      verified: true,
      available: true,
      bio: 'متخصصة في الأزياء العصرية وملابس الأطفال بجودة عالية وأسعار مناسبة',
      services: ['خياطة', 'تعديل المقاسات', 'تصميم أنماط'],
    },
    {
      id: 3,
      name: 'خديجة المطيري',
      specialty: ['أزياء تراثية', 'عبايات مطرزة'],
      location: 'الدمام - حي الفيصلية',
      rating: 4.9,
      reviewsCount: 167,
      completedOrders: 134,
      experience: '15 سنة',
      deliveryTime: '7-10 أيام',
      priceRange: '300 - 1,200 ريال',
      verified: true,
      available: false,
      bio: 'خبيرة في الأزياء التراثية والتطريز السعودي الأصيل مع إتقان فنون الخياطة التقليدية',
      services: ['خياطة تراثية', 'تطريز يدوي', 'ترميم الأزياء التراثية'],
    },
    {
      id: 4,
      name: 'نورا الشمري',
      specialty: ['فساتين زفاف', 'فساتين سهرة'],
      location: 'الرياض - حي العليا',
      rating: 4.7,
      reviewsCount: 98,
      completedOrders: 87,
      experience: '6 سنوات',
      deliveryTime: '10-14 يوم',
      priceRange: '500 - 2,000 ريال',
      verified: true,
      available: true,
      bio: 'متخصصة في فساتين الزفاف والسهرة الفاخرة مع اهتمام بالتفاصيل الدقيقة',
      services: ['خياطة فاخرة', 'تطريز بالخرز', 'تصميم مخصص'],
    },
  ];

  const cities = ['الرياض', 'جدة', 'الدمام', 'مكة', 'المدينة'];

  const filteredSeamstresses = seamstresses.filter(seamstress => {
    const matchesSearch = seamstress.name.includes(searchTerm) ||
      seamstress.specialty.some(spec => spec.includes(searchTerm)) ||
      seamstress.location.includes(searchTerm);
    
    const matchesCity = filterByCity === 'all' || seamstress.location.includes(filterByCity);
    
    return matchesSearch && matchesCity;
  });

  const sortedSeamstresses = [...filteredSeamstresses].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'reviews':
        return b.reviewsCount - a.reviewsCount;
      case 'orders':
        return b.completedOrders - a.completedOrders;
      case 'experience':
        return parseInt(b.experience) - parseInt(a.experience);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">الخياطات</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            اختاري من بين أفضل الخياطات المعتمدات في المملكة لتنفيذ تصميمك بأعلى جودة
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="ابحثي عن خياطة أو تخصص أو منطقة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
          <Select value={filterByCity} onValueChange={setFilterByCity}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="المدينة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع المدن</SelectItem>
              {cities.map(city => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="ترتيب حسب" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">التقييم</SelectItem>
              <SelectItem value="reviews">عدد المراجعات</SelectItem>
              <SelectItem value="orders">الطلبات المكتملة</SelectItem>
              <SelectItem value="experience">سنوات الخبرة</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Seamstresses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sortedSeamstresses.map((seamstress) => (
            <Card key={seamstress.id} className="card-shadow hover-scale overflow-hidden">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">
                        {seamstress.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <h3 className="text-xl font-semibold">{seamstress.name}</h3>
                        {seamstress.verified && (
                          <Award className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div className="flex items-center space-x-1 space-x-reverse mt-1">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{seamstress.location}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant={seamstress.available ? "default" : "secondary"}>
                    {seamstress.available ? 'متاحة' : 'مشغولة'}
                  </Badge>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">التخصصات:</p>
                  <div className="flex flex-wrap gap-2">
                    {seamstress.specialty.map((spec, index) => (
                      <Badge key={index} variant="outline">{spec}</Badge>
                    ))}
                  </div>
                </div>

                {/* Bio */}
                <p className="text-muted-foreground text-sm mb-4">{seamstress.bio}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-center">
                  <div>
                    <div className="flex items-center justify-center space-x-1 space-x-reverse">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{seamstress.rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">التقييم</p>
                  </div>
                  <div>
                    <p className="font-semibold">{seamstress.reviewsCount}</p>
                    <p className="text-xs text-muted-foreground">مراجعة</p>
                  </div>
                  <div>
                    <p className="font-semibold">{seamstress.completedOrders}</p>
                    <p className="text-xs text-muted-foreground">طلب مكتمل</p>
                  </div>
                  <div>
                    <p className="font-semibold">{seamstress.experience}</p>
                    <p className="text-xs text-muted-foreground">خبرة</p>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">وقت التسليم:</span>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{seamstress.deliveryTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">نطاق الأسعار:</span>
                    <span className="text-sm font-medium text-primary">{seamstress.priceRange}</span>
                  </div>
                </div>

                {/* Services */}
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">الخدمات:</p>
                  <div className="flex flex-wrap gap-1">
                    {seamstress.services.map((service, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button 
                    className="flex-1" 
                    disabled={!seamstress.available}
                  >
                    {seamstress.available ? 'طلب خياطة' : 'غير متاحة حالياً'}
                  </Button>
                  <Button variant="outline" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {sortedSeamstresses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">لم يتم العثور على خياطات تطابق البحث</p>
          </div>
        )}

        {/* Load More */}
        {sortedSeamstresses.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              عرض المزيد من الخياطات
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeamstressesPage;


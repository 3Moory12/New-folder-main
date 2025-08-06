import React, { useState } from 'react';
import { Search, Star, MapPin, Eye, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import featuredDress1 from '../assets/featured-dress1.jpg';
import featuredDress2 from '../assets/featured-dress2.jpg';
import featuredDress3 from '../assets/featured-dress3.jpg';

const DesignersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const designers = [
    {
      id: 1,
      name: 'سارة أحمد',
      specialty: 'فساتين السهرة',
      location: 'الرياض',
      rating: 4.9,
      reviewsCount: 127,
      designsCount: 45,
      image: '/api/placeholder/150/150',
      portfolio: [featuredDress1, featuredDress2, featuredDress3],
      bio: 'مصممة أزياء متخصصة في فساتين السهرة الفاخرة مع خبرة 8 سنوات',
      priceRange: '800 - 2,500 ريال',
    },
    {
      id: 2,
      name: 'نورا الخالد',
      specialty: 'العبايات المطرزة',
      location: 'جدة',
      rating: 4.8,
      reviewsCount: 89,
      designsCount: 32,
      image: '/api/placeholder/150/150',
      portfolio: [featuredDress2, featuredDress3, featuredDress1],
      bio: 'متخصصة في تصميم العبايات التراثية والعصرية بلمسة فنية مميزة',
      priceRange: '600 - 1,800 ريال',
    },
    {
      id: 3,
      name: 'ريم السعد',
      specialty: 'الأزياء الكاجوال',
      location: 'الدمام',
      rating: 4.7,
      reviewsCount: 156,
      designsCount: 67,
      image: '/api/placeholder/150/150',
      portfolio: [featuredDress3, featuredDress1, featuredDress2],
      bio: 'مصممة شابة متخصصة في الأزياء العصرية والكاجوال للمرأة العاملة',
      priceRange: '400 - 1,200 ريال',
    },
    {
      id: 4,
      name: 'فاطمة العتيبي',
      specialty: 'الأزياء التراثية',
      location: 'الرياض',
      rating: 4.9,
      reviewsCount: 203,
      designsCount: 78,
      image: '/api/placeholder/150/150',
      portfolio: [featuredDress1, featuredDress3, featuredDress2],
      bio: 'خبيرة في تصميم الأزياء التراثية السعودية بلمسة عصرية',
      priceRange: '700 - 2,000 ريال',
    },
  ];

  const filteredDesigners = designers.filter(designer =>
    designer.name.includes(searchTerm) ||
    designer.specialty.includes(searchTerm) ||
    designer.location.includes(searchTerm)
  );

  const sortedDesigners = [...filteredDesigners].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'reviews':
        return b.reviewsCount - a.reviewsCount;
      case 'designs':
        return b.designsCount - a.designsCount;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">المصممات</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            اكتشفي أفضل المصممات في المملكة واختاري من يناسب ذوقك وميزانيتك
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="ابحثي عن مصممة أو تخصص أو مدينة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="ترتيب حسب" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">التقييم</SelectItem>
              <SelectItem value="reviews">عدد المراجعات</SelectItem>
              <SelectItem value="designs">عدد التصاميم</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Designers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedDesigners.map((designer) => (
            <Card key={designer.id} className="card-shadow hover-scale overflow-hidden">
              <CardContent className="p-0">
                {/* Designer Info */}
                <div className="p-6">
                  <div className="flex items-center space-x-4 space-x-reverse mb-4">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">
                        {designer.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">{designer.name}</h3>
                      <p className="text-muted-foreground">{designer.specialty}</p>
                      <div className="flex items-center space-x-1 space-x-reverse mt-1">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{designer.location}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4">{designer.bio}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                    <div>
                      <div className="flex items-center justify-center space-x-1 space-x-reverse">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{designer.rating}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">التقييم</p>
                    </div>
                    <div>
                      <p className="font-semibold">{designer.reviewsCount}</p>
                      <p className="text-xs text-muted-foreground">مراجعة</p>
                    </div>
                    <div>
                      <p className="font-semibold">{designer.designsCount}</p>
                      <p className="text-xs text-muted-foreground">تصميم</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground">نطاق الأسعار:</p>
                    <p className="font-semibold text-primary">{designer.priceRange}</p>
                  </div>
                </div>

                {/* Portfolio Preview */}
                <div className="px-6 pb-4">
                  <h4 className="text-sm font-semibold mb-2">معرض الأعمال</h4>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {designer.portfolio.slice(0, 3).map((image, index) => (
                      <div key={index} className="aspect-square overflow-hidden rounded-lg">
                        <img
                          src={image}
                          alt={`تصميم ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="p-6 pt-0 flex gap-2">
                  <Button className="flex-1">
                    <Eye className="ml-2 h-4 w-4" />
                    عرض الملف الشخصي
                  </Button>
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {sortedDesigners.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">لم يتم العثور على مصممات تطابق البحث</p>
          </div>
        )}

        {/* Load More */}
        {sortedDesigners.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              عرض المزيد من المصممات
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesignersPage;


import React, { useState } from 'react';
import { Upload, Palette, Ruler, FileText, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

const CustomDesignPage = () => {
  const [formData, setFormData] = useState({
    garmentType: '',
    color: '',
    fabric: '',
    size: '',
    details: '',
    notes: '',
  });

  const [uploadedImages, setUploadedImages] = useState([]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedImages(prev => [...prev, ...files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    alert('تم إرسال طلب التصميم بنجاح! سيتم التواصل معك قريباً.');
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 fade-in">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">صممي عبايتك أو فستانك المثالي</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            املئي النموذج أدناه بتفاصيل التصميم المطلوب وسنقوم بربطك بأفضل المصممات والخياطات
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Garment Type */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 space-x-reverse">
                <Palette className="h-6 w-6 text-primary" />
                <span>نوع الملبس</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={formData.garmentType}
                onValueChange={(value) => handleInputChange('garmentType', value)}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div className="flex items-center space-x-2 space-x-reverse p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="abaya" id="abaya" />
                  <Label htmlFor="abaya" className="cursor-pointer">عباية</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="dress" id="dress" />
                  <Label htmlFor="dress" className="cursor-pointer">فستان</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="set" id="set" />
                  <Label htmlFor="set" className="cursor-pointer">طقم</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Design Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Color and Fabric */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle>اللون والقماش</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="color">اللون المفضل</Label>
                  <Select onValueChange={(value) => handleInputChange('color', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختاري اللون" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="black">أسود</SelectItem>
                      <SelectItem value="navy">كحلي</SelectItem>
                      <SelectItem value="brown">بني</SelectItem>
                      <SelectItem value="gray">رمادي</SelectItem>
                      <SelectItem value="beige">بيج</SelectItem>
                      <SelectItem value="white">أبيض</SelectItem>
                      <SelectItem value="pink">وردي</SelectItem>
                      <SelectItem value="blue">أزرق</SelectItem>
                      <SelectItem value="green">أخضر</SelectItem>
                      <SelectItem value="other">لون آخر</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="fabric">نوع القماش</Label>
                  <Select onValueChange={(value) => handleInputChange('fabric', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختاري نوع القماش" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="crepe">كريب</SelectItem>
                      <SelectItem value="chiffon">شيفون</SelectItem>
                      <SelectItem value="silk">حرير</SelectItem>
                      <SelectItem value="cotton">قطن</SelectItem>
                      <SelectItem value="linen">كتان</SelectItem>
                      <SelectItem value="satin">ساتان</SelectItem>
                      <SelectItem value="jersey">جيرسي</SelectItem>
                      <SelectItem value="other">نوع آخر</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Size */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 space-x-reverse">
                  <Ruler className="h-6 w-6 text-primary" />
                  <span>المقاسات</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="size">المقاس</Label>
                  <Select onValueChange={(value) => handleInputChange('size', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختاري المقاس" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xs">XS</SelectItem>
                      <SelectItem value="s">S</SelectItem>
                      <SelectItem value="m">M</SelectItem>
                      <SelectItem value="l">L</SelectItem>
                      <SelectItem value="xl">XL</SelectItem>
                      <SelectItem value="xxl">XXL</SelectItem>
                      <SelectItem value="custom">مقاس مخصص</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="measurements">مقاسات مخصصة (اختياري)</Label>
                  <Textarea
                    id="measurements"
                    placeholder="مثال: الطول 160 سم، محيط الصدر 90 سم، محيط الخصر 70 سم..."
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Design Details */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle>تفاصيل التصميم</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="details">التفاصيل والزخارف المطلوبة</Label>
                <Textarea
                  id="details"
                  value={formData.details}
                  onChange={(e) => handleInputChange('details', e.target.value)}
                  placeholder="مثال: تطريز ذهبي على الأكمام، أزرار لؤلؤية، قصة واسعة..."
                  className="min-h-[120px]"
                />
              </div>

              <div>
                <Label htmlFor="notes">ملاحظات إضافية</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="أي ملاحظات أو طلبات خاصة..."
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Image Upload */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 space-x-reverse">
                <Upload className="h-6 w-6 text-primary" />
                <span>صور مرجعية</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  ارفعي صور مرجعية للتصميم المطلوب (اختياري)
                </p>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <Label htmlFor="image-upload">
                  <Button variant="outline" className="cursor-pointer">
                    اختاري الصور
                  </Button>
                </Label>
              </div>

              {uploadedImages.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    الصور المرفوعة: {uploadedImages.length}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {uploadedImages.map((file, index) => (
                      <div key={index} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                        <FileText className="h-8 w-8 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="text-center">
            <Button type="submit" size="lg" className="px-12 py-3">
              <Send className="ml-2 h-5 w-5" />
              إرسال طلب التصميم
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomDesignPage;


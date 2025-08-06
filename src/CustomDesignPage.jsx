import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/supabaseClient.js';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const CustomDesignPage = () => {
  const navigate = useNavigate();
  const [designRequest, setDesignRequest] = useState({
    garment_type: 'abaya',
    color: '',
    fabric: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDesignRequest(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setDesignRequest(prev => ({ ...prev, garment_type: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        alert('يجب عليك تسجيل الدخول أولاً لتقديم طلب.');
        navigate('/login');
        return;
      }

      const { error } = await supabase
        .from('orders')
        .insert([{ customer_id: user.id, ...designRequest }]);

      if (error) throw error;

      alert('تم إرسال طلبك بنجاح!');
      navigate('/');
    } catch (error) {
      alert('حدث خطأ أثناء إرسال الطلب: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">تصميم مخصص</CardTitle>
          <CardDescription>صممي قطعتك الفريدة خطوة بخطوة</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="garment_type">نوع القطعة:</Label>
              <Select onValueChange={handleSelectChange} defaultValue={designRequest.garment_type}>
                <SelectTrigger id="garment_type">
                  <SelectValue placeholder="اختاري نوع القطعة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="abaya">عباية</SelectItem>
                  <SelectItem value="dress">فستان</SelectItem>
                  <SelectItem value="set">طقم</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">اللون المفضل:</Label>
              <Input id="color" name="color" value={designRequest.color} onChange={handleChange} placeholder="مثال: أسود، بيج، كحلي" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fabric">نوع القماش:</Label>
              <Input id="fabric" name="fabric" value={designRequest.fabric} onChange={handleChange} placeholder="مثال: كريب، حرير، كتان" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">ملاحظات إضافية (وصف التصميم):</Label>
              <Textarea id="notes" name="notes" value={designRequest.notes} onChange={handleChange} placeholder="صفي لنا التصميم الذي في مخيلتك..." />
            </div>
            
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'جاري الإرسال...' : 'إرسال طلب التصميم'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomDesignPage;
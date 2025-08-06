import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/supabaseClient.js';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SeamstressesPage = () => {
  const [seamstresses, setSeamstresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeamstresses = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_type', 'seamstress');

        if (error) throw error;
        setSeamstresses(data);
      } catch (error) {
        console.error('Error fetching seamstresses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeamstresses();
  }, []);

  if (loading) {
    return <div className="text-center p-12">جاري تحميل بيانات الخياطات...</div>;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">الخياطات</h1>
        <p className="text-muted-foreground mt-2">اختاري من بين أفضل الخياطات المعتمدات في المملكة</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {seamstresses.map((seamstress) => (
          <Card key={seamstress.id}>
            <CardHeader>
              <CardTitle>{seamstress.full_name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">رقم التواصل: {seamstress.phone || 'غير متوفر'}</p>
            </CardContent>
            <CardFooter>
              <Link to={`/seamstresses/${seamstress.id}`} className="w-full">
                <Button className="w-full">طلب خياطة</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {seamstresses.length === 0 && !loading && (
        <p className="text-center">لا يوجد خياطات مسجلات حالياً.</p>
      )}
    </div>
  );
};

export default SeamstressesPage;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/supabaseClient.js';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DesignersPage = () => {
  const [designers, setDesigners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDesigners = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_type', 'designer');

        if (error) throw error;
        setDesigners(data);
      } catch (error) {
        console.error('Error fetching designers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDesigners();
  }, []);

  if (loading) {
    return <div className="text-center p-12">جاري تحميل بيانات المصممات...</div>;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">المصممات</h1>
        <p className="text-muted-foreground mt-2">اكتشفي مجموعة من المصممات الموهوبات في المملكة</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {designers.map((designer) => (
          <Card key={designer.id}>
            <CardHeader>
              <CardTitle>{designer.full_name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">رقم التواصل: {designer.phone || 'غير متوفر'}</p>
            </CardContent>
            <CardFooter>
              <Link to={`/designers/${designer.id}`} className="w-full">
                <Button className="w-full">عرض الملف الشخصي</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {designers.length === 0 && !loading && (
        <p className="text-center">لا يوجد مصممات مسجلات حالياً.</p>
      )}
    </div>
  );
};

export default DesignersPage;
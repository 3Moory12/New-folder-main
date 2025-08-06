import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/supabaseClient.js';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const DesignerProfilePage = () => {
  const { id } = useParams();
  const [designer, setDesigner] = useState(null);
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDesignerData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        // جلب بيانات المصممة
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', id)
          .single();
        if (profileError) throw profileError;
        setDesigner(profileData);

        // جلب تصاميم المصممة
        const { data: designsData, error: designsError } = await supabase
          .from('designs')
          .select('*')
          .eq('designer_id', id);
        if (designsError) throw designsError;
        setDesigns(designsData);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDesignerData();
  }, [id]);

  if (loading) {
    return <div className="text-center p-12">جاري تحميل البيانات...</div>;
  }

  if (!designer) {
    return <div className="text-center p-12">لم يتم العثور على المصممة.</div>;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{designer.full_name}</CardTitle>
          <CardDescription>ملف شخصي - {designer.user_type}</CardDescription>
        </CardHeader>
        <CardContent>
          <p><strong>رقم التواصل:</strong> {designer.phone}</p>
          <hr className="my-6" />
          <h2 className="text-2xl font-bold mb-4">معرض الأعمال</h2>
          
          {designs.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {designs.map((design) => (
                <div key={design.id} className="border rounded-lg overflow-hidden">
                  <img src={design.image_url} alt={design.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold">{design.title}</h3>
                    <p className="text-sm text-muted-foreground">{design.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">لا توجد تصاميم لعرضها حالياً.</p>
          )}
          
        </CardContent>
      </Card>
    </div>
  );
};

export default DesignerProfilePage;
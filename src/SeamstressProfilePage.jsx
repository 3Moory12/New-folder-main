import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/supabaseClient.js';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const SeamstressProfilePage = () => {
  const { id } = useParams();
  const [seamstress, setSeamstress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeamstressProfile = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setSeamstress(data);
      } catch (error) {
        console.error('Error fetching seamstress profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeamstressProfile();
  }, [id]);

  if (loading) {
    return <div className="text-center p-12">جاري تحميل ملف الخياطة...</div>;
  }

  if (!seamstress) {
    return <div className="text-center p-12">لم يتم العثور على الخياطة.</div>;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{seamstress.full_name}</CardTitle>
          <CardDescription>ملف شخصي - {seamstress.user_type}</CardDescription>
        </CardHeader>
        <CardContent>
          <p><strong>رقم التواصل:</strong> {seamstress.phone}</p>
          <hr className="my-6" />
          <h2 className="text-2xl font-bold mb-4">الأعمال السابقة</h2>
          <p className="text-muted-foreground">(هنا سيتم عرض صور لأعمال الخياطة في المستقبل)</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SeamstressProfilePage;
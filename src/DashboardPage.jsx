import React, { useState, useEffect } from 'react';
import { supabase } from '@/supabaseClient.js';
import toast from 'react-hot-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const UploadDesignForm = ({ onUploadSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return toast.error('الرجاء اختيار صورة أولاً.');

    const toastId = toast.loading('جاري رفع التصميم...');
    setUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not found");

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage.from('designs').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage.from('designs').getPublicUrl(filePath);
      const imageUrl = publicUrlData.publicUrl;

      const { error: insertError } = await supabase.from('designs').insert({
        title,
        description,
        image_url: imageUrl,
        designer_id: user.id,
      });
      if (insertError) throw insertError;
      
      toast.success('تم رفع التصميم بنجاح!', { id: toastId });
      setTitle('');
      setDescription('');
      setFile(null);
      if(onUploadSuccess) onUploadSuccess();
    } catch (error) {
      toast.error('خطأ في رفع التصميم: ' + error.message, { id: toastId });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>إضافة تصميم جديد</CardTitle>
        <CardDescription>اكتبي تفاصيل تصميمك وارفعي صورته.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">عنوان التصميم</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">وصف التصميم</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">صورة التصميم</Label>
            <Input id="image" type="file" onChange={handleFileChange} accept="image/*" required />
          </div>
          <Button type="submit" disabled={uploading}>
            {uploading ? 'جاري الرفع...' : 'رفع التصميم'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

const DashboardPage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data: profileData, error: profileError } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        if (profileError) throw profileError;
        setUserProfile(profileData);

        let ordersQuery;
        if (profileData.user_type === 'customer') {
          ordersQuery = supabase.from('orders').select('*').eq('customer_id', user.id);
        } else if (profileData.user_type === 'designer') {
          ordersQuery = supabase.from('orders').select('*');
        }

        if (ordersQuery) {
          const { data: ordersData, error: ordersError } = await ordersQuery;
          if (ordersError) throw ordersError;
          setOrders(ordersData);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    const toastId = toast.loading('جاري تحديث حالة الطلب...');
    try {
      await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);
      toast.success('تم تحديث الحالة بنجاح!', { id: toastId });
      fetchData(); 
    } catch (error) {
      toast.error('خطأ في تحديث الحالة.', { id: toastId });
      console.error('Error updating order status:', error);
    }
  };

  const assignToDesigner = async (orderId) => {
    const toastId = toast.loading('جاري تعيين الطلب...');
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if(!user) return;
        await supabase.from('orders').update({ designer_id: user.id, status: 'in progress' }).eq('id', orderId);
        toast.success('تم تعيين الطلب لك بنجاح!', { id: toastId });
        fetchData();
    } catch (error) {
        toast.error('خطأ في تعيين الطلب.', { id: toastId });
        console.error('Error assigning order:', error);
    }
  }

  const renderOrdersList = (ordersToRender, isDesigner) => (
      <Card>
        <CardContent className="p-0">
          <ul className="divide-y">
            {ordersToRender.length > 0 ? (
              ordersToRender.map(order => (
                <li key={order.id} className="p-4 space-y-2">
                  <p><strong>نوع القطعة:</strong> {order.garment_type}</p>
                  <p><strong>اللون:</strong> {order.color}</p>
                  <p><strong>حالة الطلب:</strong> <span className="font-semibold">{order.status}</span></p>
                  {isDesigner && order.status === 'pending' && (
                    <Button onClick={() => assignToDesigner(order.id)}>قبول وتعيين الطلب لنفسي</Button>
                  )}
                  {isDesigner && order.designer_id === userProfile.id && order.status === 'in progress' && (
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" onClick={() => updateOrderStatus(order.id, 'completed')}>إكمال الطلب</Button>
                      <Button variant="destructive" onClick={() => updateOrderStatus(order.id, 'cancelled')}>إلغاء الطلب</Button>
                    </div>
                  )}
                </li>
              ))
            ) : (
              <p className="p-4 text-muted-foreground">لا يوجد طلبات حالياً.</p>
            )}
          </ul>
        </CardContent>
      </Card>
  );
  
  const renderDashboardContent = () => {
    if (!userProfile) return <p>لا يمكن عرض لوحة التحكم. قد تحتاج لتسجيل الدخول.</p>;

    switch (userProfile.user_type) {
      case 'customer':
        return (
          <Card>
            <CardHeader><CardTitle>طلباتي</CardTitle></CardHeader>
            <CardContent>{renderOrdersList(orders, false)}</CardContent>
          </Card>
        );
      case 'designer':
        const pendingOrders = orders.filter(o => o.status === 'pending');
        const myOrders = orders.filter(o => o.designer_id === userProfile.id);
        return (
          <div className="space-y-6">
            <UploadDesignForm onUploadSuccess={fetchData} />
            <Card>
              <CardHeader><CardTitle>الطلبات الجديدة (المتاحة)</CardTitle></CardHeader>
              <CardContent>{renderOrdersList(pendingOrders, true)}</CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>طلباتي الحالية</CardTitle></CardHeader>
              <CardContent>{renderOrdersList(myOrders, true)}</CardContent>
            </Card>
          </div>
        );
      case 'seamstress':
        return <Card><CardHeader><CardTitle>الأعمال الحالية</CardTitle></CardHeader><CardContent><p>هنا ستظهر قائمة بالأعمال المسندة للخياطة.</p></CardContent></Card>;
      default:
        return <p>مرحباً بك!</p>;
    }
  };

  if (loading) return <div className="text-center p-12">جاري تحميل البيانات...</div>;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">لوحة التحكم</h1>
        <p className="text-muted-foreground">مرحباً بك، {userProfile?.full_name || 'زائر'}.</p>
      </div>
      {renderDashboardContent()}
    </div>
  );
};

export default DashboardPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/supabaseClient.js';
import toast from 'react-hot-toast'; // <-- استيراد toast
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    userType: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };
  
  const handleSelectChange = (value) => {
    setRegisterData({ ...registerData, userType: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading('جاري تسجيل الدخول...');
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });
      if (error) throw error;
      toast.success('تم تسجيل الدخول بنجاح!', { id: toastId });
      navigate('/');
    } catch (error) {
      toast.error(error.message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      toast.error('كلمات المرور غير متطابقة');
      return;
    }
    setLoading(true);
    const toastId = toast.loading('جاري إنشاء الحساب...');
    try {
      const { error } = await supabase.auth.signUp({
        email: registerData.email,
        password: registerData.password,
        options: {
          data: {
            full_name: registerData.fullName,
            user_type: registerData.userType,
            phone: registerData.phone,
          },
        },
      });
      if (error) throw error;
      toast.success('تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.');
    } catch (error) {
      toast.error(error.message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-12">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">تسجيل الدخول</TabsTrigger>
          <TabsTrigger value="register">حساب جديد</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <form onSubmit={handleLogin}>
            <Card>
              <CardHeader>
                <CardTitle>تسجيل الدخول</CardTitle>
                <CardDescription>
                  أدخل بياناتك للوصول إلى حسابك.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">البريد الإلكتروني</Label>
                  <Input id="login-email" name="email" type="email" placeholder="m@example.com" value={loginData.email} onChange={handleLoginChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">كلمة المرور</Label>
                  <Input id="login-password" name="password" type="password" value={loginData.password} onChange={handleLoginChange} required />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'جاري الدخول...' : 'تسجيل الدخول'}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>

        <TabsContent value="register">
          <form onSubmit={handleRegister}>
            <Card>
              <CardHeader>
                <CardTitle>إنشاء حساب</CardTitle>
                <CardDescription>
                  املأ البيانات التالية للبدء معنا.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="userType">نوع الحساب</Label>
                   <Select onValueChange={handleSelectChange} name="userType" required>
                    <SelectTrigger>
                      <SelectValue placeholder="اختاري نوع الحساب" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer">عميلة</SelectItem>
                      <SelectItem value="designer">مصممة</SelectItem>
                      <SelectItem value="seamstress">خياطة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fullName">الاسم الكامل</Label>
                  <Input id="fullName" name="fullName" placeholder="عمر محمد عمر" value={registerData.fullName} onChange={handleRegisterChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input id="email" name="email" type="email" placeholder="m@example.com" value={registerData.email} onChange={handleRegisterChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="05xxxxxxxx" value={registerData.phone} onChange={handleRegisterChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">كلمة المرور</Label>
                  <Input id="password" name="password" type="password" value={registerData.password} onChange={handleRegisterChange} required />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                  <Input id="confirmPassword" name="confirmPassword" type="password" value={registerData.confirmPassword} onChange={handleRegisterChange} required />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'جاري الإنشاء...' : 'إنشاء الحساب'}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoginPage;
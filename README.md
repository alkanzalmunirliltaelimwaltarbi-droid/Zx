# إعداد Supabase — الإصدار 3.0

1. نفّذ `schema.sql`.
2. أنشئ 3 حسابات مشرف من Supabase Auth أو استخدم Edge Function للتحقق من رمز الدخول.
3. لا تضع `service_role` في GitHub.
4. ضع فقط `SUPABASE_URL` و`SUPABASE_ANON_KEY` في `config.js`.
5. إذا أردت نظام الدخول برمز موحد، انشر `functions/login-code` واضبط الأسرار في Supabase:
   - `DEMO_USER_CODE`
   - `DEMO_ADMIN_CODE`

> النموذج الموجود في Edge Function تعليمي/تمهيدي. قبل الاستخدام العام يفضّل استبدال المقارنة النصية بآلية hash + rate limiting + جلسة موقعة قصيرة العمر.

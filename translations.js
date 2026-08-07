// ===== LIFE SPORT — Full System Translation =====
const DICT = {
// MISSING TERMS — كلمات ناقصة
'تقارير أطباء العظام':'Orthopedic Doctors Reports','👑 تقارير أطباء العظام VIP':'👑 Orthopedic Doctors Reports VIP','تقارير أطباء العظام VIP':'Orthopedic Doctors Reports VIP','كشف الإنستاباي — المدفوعات والمصروفات بالأسماء':'Instapay Report — Payments & Expenses by Name','كشف الإنستاباي':'Instapay Report','المدفوعات والمصروفات بالأسماء':'Payments & Expenses by Name','طباعة الكشف':'Print Report','طباعة كشف الطبيب':'Print Doctor Report','عرض أطباء جميع الفروع':'Showing Doctors — All Branches','عرض أطباء فرع':'Showing Branch Doctors','جميع الفروع':'All Branches','عرض أطباء':'Showing Doctors','الشهر:':'Month:','اختر شهر التقرير':'Select Report Month',
'إرسال الدكتور':'Send to Doctor','إرسال للدكتور':'Send to Doctor','إرسال واتساب للدكتور':'Send WhatsApp to Doctor','طباعة حجوزات اليوم':'Print Today Bookings','حجوزات اليوم':'Today Bookings','إجمالي الحجوزات':'Total Bookings','حضروا':'Attended','في الانتظار':'Waiting','لم يحضر':'No Show','أحمال الدكاترة اليوم':'Today Doctors Load','دكتور':'Doctor','مواعيد الحجز المتاحة':'Available Booking Times','فاضي':'Free','متوسط':'Medium','ممتلئ':'Full','مزدحم':'Busy','الساعات المتاحة للحجز':'Available Booking Hours','ملخص بالساعات':'Hourly Summary',

// NEW FEATURES — تأهيل / تحديث / دكاترة العظام
'تأهيل':'Rehabilitation','🏃 تأهيل':'🏃 Rehabilitation','حالات التأهيل':'Rehab Cases','حالات التأهيل المحجوزة اليوم':'Today Booked Rehab Cases','حالات التأهيل اليوم':'Today Rehab Cases','تأهيل عادي':'Regular Rehab','تأهيل بعد عملية':'Post-Op Rehab','إجمالي حالات التأهيل اليوم':'Total Rehab Cases Today','لا توجد حالات تأهيل محجوزة اليوم':'No rehab cases booked today',
'تحديث الآن':'Update Now','فيه تحديث جديد!':'New update available!','اضغط للتحديث لآخر نسخة':'Tap to update to latest version','حالة التأهيل':'Rehab Status',
'أطباء العظام VIP':'Orthopedic Doctors VIP','أطباء العظام':'Orthopedic Doctors','إحصائيات الأطباء المحولين (العظام / المخ والأعصاب)':'Referring Doctors Stats (Ortho / Neuro)','عدد الأطباء المحوّلين':'Referring Doctors','المُكتسب الفعلي':'Actual Earned','إجمالي المُكتسب الفعلي':'Total Actual Earned','حالات اليوم':'Today Cases','حالات الشهر':'Month Cases','القيمة الإجمالية':'Total Value','القيمة الإجمالية للحالات':'Total Cases Value','عدد الحالات المحولة':'Referred Cases','عدد الحالات (الشهر)':'Cases (Month)','المُكتسب الفعلي (بالحضور)':'Actual Earned (Attendance)','كشف حالات الطبيب':'Doctor Cases Report','دفتر حالات الطبيب':'Doctor Cases Log','إرسال واتساب':'Send WhatsApp','عرض وطباعة':'View & Print','عرض وطباعة كشف الحالات':'View & Print Cases','الشهر المختار لم يبدأ بعد':'Selected month not started yet','اختر شهر التقرير:':'Select report month:','رجوع للتحليل':'Back to Analytics','رجوع للتحليل الشهري':'Back to Monthly Analytics',
'ملخص بالساعات':'Hourly Summary','أنسب ساعة للحجز':'Best Booking Hour','مواعيد الحجز المتاحة':'Available Booking Times','أحمال الدكاترة اليوم':'Today Doctors Load','ساعة فاضية':'free hour','حجز':'booking','ممتلئ':'Full','فاضي':'Free','متوسط':'Medium','تذكير بالمواعيد الفاضية':'Free Slots Reminder','تأهيل بعد عملية':'Post-Op Rehab',

// PAGE NAMES + LOCK SCREEN
'ملفات المرضى الشاملة':'Comprehensive Patient Files','الحركة المالية اليومية':'Daily Financial Activity','أدخل الرقم السري للدخول':'Enter PIN to access','دخول':'Login','رجوع للوحة القيادة':'Back to Dashboard','الرقم السري غير صحيح':'Incorrect PIN','أدخل الرقم السري':'Enter PIN',
// BACKUP REMINDER + ASSISTANT
'نسخة احتياطية فورية':'Instant Backup','آخر نسخة احتياطية من':'Last backup since','لسه معملتش نسخة احتياطية':'No backup yet','احفظ بياناتك دلوقتي بضغطة':'Save your data now with one click','نسخة دلوقتي':'Backup Now','بعدين':'Later','يوم':'days','المساعد الذكي':'Smart Assistant','اكتب سؤالك...':'Type your question...','اسألني عن':'Ask me about','تشغيل/إيقاف الصوت':'Toggle Sound','مساعد Life Sport':'Life Sport Assistant',
// ADMIN PATIENTS PAGE - missing words
'— إدارة المرضى':'— Patient Management',' إدارة المرضى':' Patient Management','إدارة المرضى':'Patient Management',
'الشركة':'Company','مغلق':'Closed','الاسم كامل':'Full Name','تأمين / شركة':'Insurance / Company','حضر النهاردة؟':'Attended today?',
// ADMIN PATIENTS PAGE
'إدارة المرضى':'Patient Management','إدارة المرضى (أدمن)':'Patient Management (Admin)','LIFE SPORT — إدارة المرضى':'LIFE SPORT — Patient Management','إجمالي المرضى':'Total Patients','مرضى التأمين':'Insurance Patients','مرضى الكاش':'Cash Patients','محتاج تجديد':'Needs Renewal','بحث متقدم':'Advanced Search','تسجيل مريض جديد':'Register New Patient','المديونية':'Debt','الموافقات / التجديد':'Approvals / Renewal','الموافقات':'Approvals','شركة التأمين':'Insurance Company','رقم التليفون':'Phone Number','ابحث بالاسم...':'Search by name...','ابحث بالشركة...':'Search by company...','ابحث بالتليفون...':'Search by phone...','تأمين':'Insurance','كاش (كورس)':'Cash (Course)','نظام الدفع':'Payment System','بالجلسة':'Per Session','كورس (مبلغ إجمالي)':'Course (Total)','قيمة الكورس الكلية':'Total Course Value','إجمالي الجلسات':'Total Sessions','الفئة':'Category','إجمالي التحمل':'Total Co-pay','المدفوع من التحمل':'Co-pay Paid','المدفوع (كاش)':'Paid (Cash)','نوع الجلسة':'Session Type','المريض حضر جلسة النهاردة؟':'Did patient attend today?','نعم — سجّل في اليومية':'Yes — Record in Ledger','لا — بيانات فقط':'No — Data Only','تعديل ملف المريض':'Edit Patient File','تسجيل دفعة جديدة (لو نسيت تسجلها)':'Record New Payment','قيمة الدفعة':'Payment Amount','تاريخ الدفعة':'Payment Date','الطبيب المحوّل':'Referring Doctor','التشخيص / الإصابة':'Diagnosis / Injury','سعر الجلسة':'Session Price','الناقص إيه؟':'What is missing?','حالة الأوراق':'Papers Status','كامل':'Complete','ناقص':'Missing','لا يوجد مرضى':'No patients','حضر':'Attended','متبقي':'Remaining','مسح':'Delete','إلغاء جلسة':'Cancel Session','كرت':'Card','علاج طبيعي عادي':'Regular Physiotherapy','يدوي (عضو واحد)':'Manual (One Area)','يدوي (عضوين)':'Manual (Two Areas)','تأهيل بعد عملية':'Post-Op Rehab','تصادمي (عضو واحد)':'Shockwave (One Area)','تصادمي (عضوين)':'Shockwave (Two Areas)','إدارة الأرقام السرية للصفحات':'Manage Page Passwords','حفظ الأرقام السرية':'Save Passwords','ملفات وصور المريض (تأمين، تقارير، إلخ)':'Patient Files & Photos',
// SIDEBAR & NAV
'لوحة القيادة':'Dashboard','الاستقبال':'Reception','الأجندة والحجوزات':'Agenda & Reservations','أرشيف المرضى':'Patient Archive','دفتر اليومية':'Daily Ledger','الكول سنتر والغياب':'Call Center & Absence','الكوادر والرواتب':'Staff & Salaries','الجلسات المنزلية':'Home Visits','التحليل الشهري':'Monthly Analytics','التحليل الشهري (VIP)':'Monthly Analytics (VIP)','الدعم وسجل المراقبة':'Support & Logs','الدعم':'Support','القائمة الرئيسية':'Main Menu','استقبال':'Reception',
// PAGE TITLES
'Life Sport - أرشيف المرضى':'Life Sport - Patient Archive','Life Sport - الاستقبال الشامل':'Life Sport - Reception','Life Sport - التحليل الشهري':'Life Sport - Monthly Analytics','Life Sport - الجلسات المنزلية':'Life Sport - Home Visits','Life Sport - الدعم وسجل المراقبة':'Life Sport - Support & Logs','Life Sport - الكوادر والرواتب':'Life Sport - Staff & Salaries','Life Sport - الكول سنتر والغياب الذكي':'Life Sport - Smart Call Center','Life Sport - دفتر اليومية':'Life Sport - Daily Ledger','Life Sport - قائمة الحجوزات':'Life Sport - Reservations','Life Sport - لوحة القيادة التحليلية':'Life Sport - Analytics Dashboard',
// BRANCHES
'المهندسين':'Al-Mohandessin','أكتوبر':'October','الهرم':'Al-Haram','العبور':'Al-Obour','مدينة نصر':'Nasr City','مستشفى الشروق':'El Shorouk Hospital','بني سويف':'Beni Suef','الإدارة المركزية':'Central Admin','الإدارة المركزية (الأدمن)':'Central Admin','كل الفروع':'All Branches','الكل (جميع الفروع)':'All (All Branches)','🏢 كل الفروع':'🏢 All Branches','الفرع':'Branch','الفرع:':'Branch:','الفرع الحالي':'Current Branch','تصفية حسب الفرع':'Filter by Branch','الكل':'All','ملخص اليوم':'Daily Summary','📱 ملخص اليوم':'📱 Daily Summary','أبعت للجميع':'Send to All','تذكير جماعي':'Bulk Reminder',
// STATUS
'جاري التحميل...':'Loading...','جاري الاتصال...':'Connecting...','متصل':'Connected','متصل ومحدث':'Connected & Updated','كاش':'Cash','شركة':'Company','شركة تأمين':'Insurance Company','نشطة':'Active','نشط':'Active','مغلقة':'Closed','مغلق:':'Closed:','مغلق للتقفيل:':'Closed:','الأرشيف':'Archive','أرشيف':'Archive','معطل':'Disabled','يظهر':'Shown',
// BUTTONS - COMMON
'إلغاء':'Cancel','إغلاق':'Close','حفظ':'Save','حذف':'Delete','تأكيد':'Confirm','بحث':'Search','تعديل':'Edit','إضافة':'Add','حسناً':'OK','تراجع':'Back','إجراء':'Action','إجراءات':'Actions','تحديث':'Refresh','اختر':'Select','فقط':'Only','تصدير لإكسيل':'Export to Excel',
// BUTTONS - SPECIFIC
'إضافة موظف جديد':'Add New Employee','إضافة دكتور':'Add Doctor','إضافة دكتور جلسات منزلية':'Add Home Visit Doctor','إضافة الحالة':'Add Case','إضافة البونص':'Add Bonus','إضافة بونص / علاوة':'Add Bonus / Allowance','إضافة وإنشاء الكود':'Add & Generate Code','إضافة مصروف':'Add Expense','تسجيل جلسة':'Register Session','تسجيل الجلسة':'Register Session','نعم، سجّل الجلسة':'Yes, Register','تأكيد الحضور':'Confirm Attendance','تقفيل الجلسات':'Close Sessions','كارت المتابعة':'Follow-up Card','كارت متابعة جلسات':'Sessions Follow-up Card','بحث سريع':'Quick Search','حفظ الخصم':'Save Deduction','تأكيد الخصم':'Confirm Deduction','حفظ النسبة':'Save Ratio','حفظ وإغلاق':'Save & Close','حفظ وتسجيل المريض':'Save & Register Patient','تفعيل النسبة':'Enable Ratio','تأكيد المسح':'Confirm Delete','تأكيد وحفظ':'Confirm & Save','تأكيد وتحديث الملف':'Confirm & Update','تأكيد الحجز':'Confirm Booking','تسجيل المريض':'Register Patient','تسجيل حجز جديد':'New Booking','تسجيل غياب / خصم':'Record Absence','تسجيل المصروفات':'Record Expenses','رفع الأوراق واستكمال الملف':'Upload Papers','مسح السجل':'Clear Log','مسح المريض نهائياً':'Delete Patient','إعادة للانتظار':'Return to Waiting','عرض النشاط':'Show Activity','فتح التقرير':'Open Report','فتح الدفتر':'Open Ledger','فتح لوحة التحكم':'Open Control Panel','فتح ملف تأمين جديد':'Open New Insurance File','ملف كاش جديد':'New Cash File','استعادة البيانات':'Restore Data','استعادة السيرفر':'Restore Server','تحميل نسخة السيرفر':'Download Server Backup','إنشاء الحساب على السيرفر':'Create Account','رفض (نواقص)':'Reject (Missing)','اعتماد الصرف':'Approve Payment','تطبيق خصم د. قاسم':'Apply Dr. Qasim Discount','تجديد كورس':'Renew Course','تجديد موافقة':'Renew Approval',
// PRINT BUTTONS
'طباعة التقرير':'Print Report','طباعة التقرير اليومي':'Print Daily Report','طباعة الشهر':'Print Month','طباعة شاشة الاستقبال':'Print Reception','طباعة كشف الأرشيف':'Print Archive','طباعة كشف الرواتب':'Print Salary Sheet','تحميل شيت إكسيل':'Download Excel','تصدير لإكسيل':'Export to Excel',
// TABLE HEADERS
'المريض':'Patient','الدكتور':'Doctor','الطبيب المحول':'Referring Doctor','الطبيب المعالج':'Treating Doctor','النوع':'Type','السعر':'Price','السعر الأساسي':'Base Price','العنوان':'Address','العنوان / المنطقة':'Address / Area','التشخيص':'Diagnosis','التشخيص / الإصابة':'Diagnosis / Injury','ملاحظات':'Notes','المبلغ':'Amount','المبلغ (ج.م)':'Amount (EGP)','البيان':'Statement','الموظف':'Employee','الوظيفة':'Position','المستخدم':'User','اسم المريض':'Patient Name','اسم المريض الرباعي':'Full Patient Name','اسم الموظف':'Employee Name','اسم الدكتور':'Doctor Name','اسم المستخدم':'Username','اسم الشركة':'Company Name','اسم شركة التأمين':'Insurance Company Name','رقم التليفون':'Phone Number','رقم التليفون (للواتساب)':'Phone (WhatsApp)','تليفون':'Phone','الاسم ورقم التليفون':'Name & Phone','الاسم الكامل':'Full Name','الاسم بالكامل':'Full Name','طريقة الدفع':'Payment Method','طريقة الدفع / الورق':'Payment / Papers','اليوم:':'Day:','اليوم':'Day','جلسة رقم':'Session No.','الماليات':'Financials','حالة الأوراق':'Papers Status','موقف الجلسات':'Sessions Status','النظام':'System','التاريخ والوقت':'Date & Time','التاريخ:':'Date:','التفاصيل':'Details','الجلسات':'Sessions','الحالة':'Status','الموقف':'Status','الصلاحية':'Permission','الصور':'Photos','السبب':'Reason','المتبقي':'Remaining','الباقي (مديونية)':'Remaining (Debt)','الشركة / التأمين':'Company / Insurance','الشركة والسعر':'Company & Price','الشركة والفئة':'Company & Category','النظام والسعر':'System & Price','نوع الحركة':'Transaction Type',
// STATS / CARDS
'إجمالي التحمل':'Total Co-pay','إجمالي التحمل المحصل':'Total Co-pay Collected','إجمالي التكلفة':'Total Cost','إجمالي الجلسات بالروشتة':'Total Prescribed Sessions','إجمالي الحالات':'Total Cases','إجمالي الحضور':'Total Attendance','إجمالي الخصومات':'Total Deductions','إجمالي الرواتب':'Total Salaries','إجمالي الغياب':'Total Absence','إجمالي الكاش':'Total Cash','إجمالي الكاش المحصل':'Total Cash Collected','إجمالي المتابعة':'Total Follow-up','إجمالي المديونيات':'Total Debts','إجمالي المرضى النشطين':'Total Active Patients','إجمالي المستحقات':'Total Earnings','إجمالي المصروفات النقدية':'Total Cash Expenses','إجمالي الموظفين':'Total Employees','إجمالي باقي التحمل':'Remaining Co-pay','إجمالي نسب التحمل المحصلة':'Total Co-pay Collected','جلسات الشهر':'Month Sessions','عدد المرضى':'Patients Count','المصروفات':'Expenses','مصروفات':'Expenses','مصروفات اليوم':'Today Expenses','مستحقاتك':'Your Earnings','مستحقات الدكتور':'Doctor Earnings','حجوزات فائتة':'Missed Appointments','منقطعون عن الجلسات':'Session Dropouts','تم التواصل اليوم':'Contacted Today','سعر الجلسة':'Session Price','سعر الجلسة (ج.م)':'Session Price (EGP)','سعر الجلسة الثابت':'Fixed Session Price','المدفوع اليوم':'Paid Today','المدفوع مقدماً':'Prepaid','المدفوع مقدماً الآن':'Prepaid Now','مدفوع الآن':'Paid Now','مدفوع التحمل':'Co-pay Paid','كاش اليوم':'Today Cash','صافي الكاش بعد المصروفات':'Net Cash After Expenses','الصافي':'Net','الصافي المستحق':'Net Due','الصافي النهائي للشهر':'Monthly Net Total','الحالات النشطة':'Active Cases','الدكاترة':'Doctors','حالاتك':'Your Cases','حالاتك النشطة':'Your Active Cases','رواتب الطاقم المستحقة':'Staff Salaries Due','نسب التحمل':'Co-payments','مطالبات الشركات':'Company Claims','مطالبات شركات التأمين':'Insurance Claims','عدد الجلسات الإجمالي':'Total Sessions','عدد بنود المصروفات':'Expense Items','التحمل المتبقي':'Remaining Co-pay','باقي التحمل':'Remaining Co-pay',
// ROLES
'استشاري':'Consultant','أخصائي':'Specialist','طبيب امتياز':'Intern','كابتن تأهيل':'Rehab Captain','سكرتاريا':'Secretary','عمال / خدمات':'Staff / Services','مدير فرع':'Branch Manager','إدارة عليا':'Top Management','الإدارة':'Management','طبيب':'Doctor','د.':'Dr.',
// SESSION TYPES
'علاج طبيعي عادي':'Regular Physiotherapy','تأهيل بعد عملية':'Post-Surgery Rehab','نوع الجلسة':'Session Type','نوع الحالة':'Case Type','نوع الإجراء':'Procedure Type','نوع الإضافة':'Addition Type','فئة الجلسة':'Session Category','فئة الحالة':'Case Category','كشف طبيب':'Doctor Consultation','جلسة علاج طبيعي (عضو واحد)':'Physiotherapy (1 limb)','جلسة علاج طبيعي (عضوين)':'Physiotherapy (2 limbs)','جلسة علاج طبيعي يدوي (عضو واحد)':'Manual Physiotherapy (1 limb)','جلسة علاج طبيعي يدوي (عضوين)':'Manual Physiotherapy (2 limbs)','جلسة تصادمي (عضو واحد)':'Shockwave (1 limb)','جلسة تصادمي (عضوين)':'Shockwave (2 limbs)','طبيعي (عضو واحد)':'Physio (1 limb)','طبيعي (عضوين)':'Physio (2 limbs)','يدوي (عضو واحد)':'Manual (1 limb)','يدوي (عضوين)':'Manual (2 limbs)','تصادمي (عضو واحد)':'Shockwave (1 limb)','تصادمي (عضوين)':'Shockwave (2 limbs)','تجديد كورس':'Renew Course','كورس':'Course','روشتة':'Prescription','التجديد':'Renewal',
// PAPERS / CATEGORIES
'الورق كامل':'Complete Papers','الورق ناقص':'Missing Papers','فئة A':'Category A','فئة B':'Category B','فئة C':'Category C','أوراق':'Papers','حالة الأوراق':'Papers Status',
// MONTH
'عرض شهر:':'Show Month:','الشهر الحالي':'Current Month','الشهر السابق':'Previous Month','الشهر التالي':'Next Month','السابق':'Previous','التالي':'Next','الشهر':'Month','اليوم':'Today',
// HR
'تسوية نهاية الخدمة':'End of Service','عدد أيام الغياب هذا الشهر':'Absence Days This Month','تاريخ آخر يوم عمل':'Last Working Day','بونص شهري':'Monthly Bonus','علاوة خاصة':'Special Allowance','أوفرتايم':'Overtime','أيام العمل/أسبوع':'Work Days/Week','الراتب (ج.م)':'Salary (EGP)','الراتب الأساسي':'Base Salary','خصومات / بونص':'Deductions / Bonus','مستندات':'Documents','مستندات:':'Documents:','صورة':'Photo','قيمة الخصم بالجنيه':'Deduction Amount (EGP)','أسباب الغياب':'Absence Reasons','سبب الغياب / التأخير:':'Absence/Delay Reason:','تعب مفاجئ / ظروف صحية':'Sudden Illness','مشكلة في المواصلات':'Transport Issue','ظروف العمل / سفر':'Work/Travel','نسيان الموعد':'Forgot Appointment','عدم الرضا عن الخدمة':'Service Dissatisfaction','اعتراض على السعر':'Price Objection','أخرى (اكتب في الملاحظات)':'Other (write in notes)',
// PATIENTS / ARCHIVE
'مرضى التأمين والشركات':'Insurance Patients','مرضى الكاش':'Cash Patients','قيد الانتظار':'Pending','تمت المراجعة':'Reviewed','تمت المراجعة (سليم)':'Reviewed (OK)','نواقص':'Missing','متأخرة +7 أيام':'Late +7 Days','مراجعة ملفات المرضى':'Patient Files Review','الأرشيف الإلكتروني لـ:':'Electronic Archive for:','ملف المريض':'Patient File','عدد الملفات المتأخرة:':'Late Files Count:','مراجعة':'Review','أرشيف ملفات المرضى':'Patient Files Archive',
// RECEPTION
'مريض تأمين حالي':'Current Insurance Patient','مريض كاش متابعة':'Cash Follow-up Patient','إنستاباي':'InstaPay','تحويل إنستاباي':'InstaPay Transfer','سماح إداري':'Admin Permission','الجلسات السابقة المستهلكة (إن وجد)':'Previous Sessions (if any)','المدفوع اليوم':'Paid Today','حجوزات':'Reservations','المتابعة':'Follow-up','تأمين':'Insurance','تأمين (مرضى)':'Insurance (Patients)','كاش (مرضى)':'Cash (Patients)','تحمل (تأمين)':'Co-pay (Insurance)','جهة':'Entity','جهة التأمين':'Insurance Entity','الشركة / التأمين':'Company / Insurance','مقدم':'Advance','بعد الدفع':'After Payment','بالجلسة':'Per Session','رقم':'No.','أوراق':'Papers',
// HOME VISITS
'LIFE SPORT — بوابة الدكتور':'LIFE SPORT — Doctor Portal','أهلاً د.':'Hello Dr.','عدد الجلسات الموافقة':'Approved Sessions','نسبة تحمل الشركة (%)':'Company Coverage (%)','نسبة الدكتور من كل جلسة (%)':'Doctor Rate per Session (%)','نسبته من كل جلسة (%)':'Rate per Session (%)','تاريخ الجلسة':'Session Date','ملاحظات (اختياري)':'Notes (Optional)','الجلسات المنزلية — بوابة الدكاترة':'Home Visits — Doctors Portal','إضافة دكتور من الرواتب':'Add Doctor from Payroll','سجل الحالات':'Cases Log','حالات د.':'Dr. Cases','أو اكتب اسم دكتور جديد':'Or enter new doctor name','اختر من الموظفين المسجلين':'Select from registered staff','-- اختر موظف --':'-- Select Employee --','كل الدكاترة':'All Doctors','لا يوجد دكاترة جلسات منزلية':'No home visit doctors','صور الموافقة / الأوراق':'Approval Photos / Papers','إرفاق صور الموافقة':'Attach Approval Photos','إرفاق':'Attach','إضافة حالة مريض':'Add Patient Case','سيتم توليد كود سري تلقائياً للدكتور':'A secret code will be generated','شوف حالاتك وسجل جلساتك المنزلية بسهولة':'View your cases and register sessions easily','هنا تقدر تشوف حالاتك وتسجل الجلسات المنزلية':'View and register your home visits here','رقم التليفون (للواتساب)':'Phone (WhatsApp)',
// ANALYTICS
'تحليل الحالات الطبية':'Medical Cases Analysis','موقف ملفات المرضى':'Patient Files Status','حالات العلاج اليدوي':'Manual Therapy Cases','حالات العمليات والتأهيل':'Surgery & Rehab Cases','إجمالي المرضى النشطين':'Total Active Patients','مرضى أكملوا الجلسات':'Completed Patients','مرضى قيد العلاج':'In-Treatment Patients','التحليل المالي والطبي الشهري':'Monthly Financial Analysis','التحليل المالي الشهري':'Monthly Financial Analysis','التحليل الشهري — VIP':'Monthly Analytics — VIP','تقرير التحليل المالي الشهري — LIFE SPORT':'Monthly Financial Report — LIFE SPORT','أدخل الرقم السري للإدارة':'Enter admin PIN','حالات جديدة (First Time)':'New Cases (First Time)',
// REPORTS
'سجل المراقبة (Audit Trail)':'Audit Trail','سجل النشاط اليومي للموظفين':'Daily Staff Activity Log','تسجيل نتيجة التواصل':'Record Contact Result','نسيان الموعد':'Forgot Appointment','لا توجد حجوزات فائتة':'No missed appointments','لا يوجد منقطعون':'No dropouts','3+ أيام انقطاع':'3+ days absent','آخر نشاط':'Last Activity','نوع الحركة':'Action Type','تسجيل نواقص الأوراق':'Record Missing Papers',
// SUPPORT
'إدارة صلاحيات الدخول للمنظومة':'System Access Management','إدارة عليا':'Top Management','بوابة الإدارة والأمان':'Admin & Security Portal','مركز الإدارة والأمان (CPanel)':'Admin & Security Center','النسخ الاحتياطي وحفظ البيانات السحابية':'Backup & Cloud Save','إعدادات النظام العامة':'General System Settings','صلاحية الدخول':'Access Permission','الرقم السري':'Secret Code','الباسورد':'Password','إظهار ماليات الكاش':'Show Cash Financials','تفعيل النسبة':'Enable Ratio','حفظ النسبة':'Save Ratio','نسبة الكاش الظاهرة في Dashboard واليومية':'Cash ratio shown in Dashboard & Ledger','يرجى إدخال رمز التحقق الخاص بالدعم الفني':'Enter technical support code','إدخال الجلسات القديمة في الاستقبال':'Allow old sessions in Reception','أسعار الكاش في الاستقبال':'Cash prices in Reception','قسم الكاش والتحويلات':'Cash & Transfers Section','قسم شركات التأمين':'Insurance Companies Section',
// MISC
'ج.م':'EGP','سعر':'Price','نظام':'System','حجوزات':'Reservations','أجندة المركز':'Center Agenda','ميعاد الجلسة':'Session Time','تاريخ الحجز':'Booking Date','تاريخ التقرير':'Report Date','كثافة الحجوزات بالساعة':'Bookings per Hour','عدد الجلسات الإضافية / الكورس':'Extra Sessions / Course','الجلسات السابقة المستهلكة (إن وجد)':'Previous Used Sessions',
// REMAINING
'(كاش + تحمل - مصروفات الكاش)':'(Cash + Co-pay - Cash Expenses)','إجمالي التكلفة / التحمل الجديد':'Total Cost / New Co-pay','إدارة الكوادر الطبية والرواتب':'Medical Staff & Salaries Management','إدارة متابعة المرضى (CRM)':'Patient Follow-up (CRM)','إضافة حالة للدكتور:':'Add Case for Dr:','إضافة حالة —':'Add Case —','إلغاء الجلسة':'Cancel Session','إلغاء جلسة المريض':'Cancel Patient Session','اختر التاريخ واضغط "عرض النشاط"':'Select date and click "Show Activity"','اختر الفئة...':'Select Category...','اختر تاريخ اليومية':'Select Ledger Date','ارفع ملف JSON لاستبدال بيانات السيرفر.':'Upload JSON to replace server data.','اكتب الأوراق الناقصة لتنبيه الاستقبال.':'Write missing papers to alert Reception.','الأرقام بتتصفر تلقائياً كل شهر جديد':'Numbers reset automatically each month','المريض عليه مديونية ومغلق. يرجى الرجوع للإدارة.':'Patient has debt and is closed. Refer to management.','المستندات الجديدة':'New Documents','برجاء إدخال الرقم السري للإدارة لفتح الدفتر':'Enter admin PIN to open the ledger','بيان المنصرف':'Expense Statement','تاريخ اليومية النشط':'Active Ledger Date','تحذير:':'Warning:','تحليل تفصيلي للفئات وأنواع الجلسات':'Detailed analysis of categories & session types','تحميل كافة بيانات السيرفر في شيت إكسيل.':'Download all server data to Excel.','تحميل نسخة كود احتياطية من السيرفر.':'Download code backup from server.','تسجيل':'Register','تشخيص':'Diagnosis','تفعيل أو تعطيل ظهور المبالغ المالية للموظفين في شاشة الاستقبال (قسم الكاش).':'Enable/disable showing financial amounts to staff in Reception (Cash section).','تفعيل أو تعطيل ظهور خانة (الجلسات المستهلكة السابقة) عند فتح ملف مريض جديد.':'Enable/disable (Previous Used Sessions) field when opening new patient file.','تقرير الجلسات المنزلية':'Home Visits Report','تقرير لوحة القيادة والمؤشرات اليومية':'Dashboard & Daily Indicators Report','تمت العملية بنجاح':'Operation successful','تنبيه:':'Notice:','تنزيل كل الأوراق (ZIP)':'Download All Papers (ZIP)','دفتر اليومية محمي':'Ledger is protected','رسالة إغلاق':'Closing Message','صافي إيرادات اليوم (كاش + تحمل) - مصروفات الكاش':'Net Daily Revenue (Cash + Co-pay) - Cash Expenses','طباعة كشف اليومية (كل قسم في صفحة — 50 اسم/صفحة)':'Print Ledger (each section on a page — 50 names/page)','طريقة الصرف':'Payment Method','عدد مرات التسجيل اليوم:':'Times registered today:','كل الوظائف':'All Positions','لا يمكن التراجع. أدخل الرقم السري للتأكيد.':'Cannot undo. Enter PIN to confirm.','ملاحظات إضافية:':'Additional Notes:','ملاحظات الاستقبال':'Reception Notes','من إجمالي الكاش':'of total cash','من الكاش (درج)':'from Cash (drawer)','نسخة (JSON)':'Backup (JSON)','هذا المريض سجّل حضور اليوم بالفعل.':'This patient already registered today.','هل أنت متأكد من تسجيل جلسة إضافية له اليوم؟':'Register an extra session today?','يومية التأمين':'Insurance Ledger','يومية الكاش':'Cash Ledger','— هل تريد التسجيل مرة أخرى؟':'— Register again?','— يرجى المراجعة فوراً':'— Please review immediately','⚕️ البرنامج العلاجي الموصى به — TREATMENT PLAN':'⚕️ Recommended Treatment Plan','⚠️ تحذير: تسجيل مكرر!':'⚠️ Warning: Duplicate registration!','⚠️ تحذير: هذا المريض سجّل اليوم بالفعل!':'⚠️ Warning: Patient already registered today!','⚠️ مرضى لم تُراجع أوراقهم منذ أكثر من 7 أيام!':'⚠️ Patients with papers unreviewed for 7+ days!','🏢 الشركة / نوع':'🏢 Company / Type','👤 اسم المريض':'👤 Patient Name','💰 الماليات والملاحظات — FINANCIAL NOTES':'💰 Financial Notes','💰 سعر الجلسة الثابت':'💰 Fixed Session Price','📅 سجل الحضور والجلسات — 24 جلسة':'📅 Attendance & Sessions Log — 24 sessions','📊 موقف الجلسات':'📊 Sessions Status','📋 فئة الحالة':'📋 Case Category','📞 التليفون':'📞 Phone','🔬 التشخيص / الإصابة':'🔬 Diagnosis / Injury','🩺 طبيب العظام':'🩺 Orthopedic Doctor','تطبيق خصم د. قاسم':'Apply Dr. Qasim Discount','صافي السيولة النقدية (في الدرج فقط):':'Net Cash (drawer only):',
// DYNAMIC TEXTS FROM JS
'صافي إيرادات اليوم (كاش + تحمل) - مصروفات الكاش':'Net Daily Revenue (Cash + Co-pay) - Cash Expenses','صافي السيولة النقدية (في الدرج فقط)':'Net Cash (drawer only)','تاريخ اليومية النشط':'Active Ledger Date','الأحد':'Sunday','الإثنين':'Monday','الثلاثاء':'Tuesday','الأربعاء':'Wednesday','الخميس':'Thursday','الجمعة':'Friday','السبت':'Saturday','يناير':'January','فبراير':'February','مارس':'March','أبريل':'April','مايو':'May','يونيو':'June','يوليو':'July','أغسطس':'August','سبتمبر':'September','أكتوبر':'October','نوفمبر':'November','ديسمبر':'December','آخر جلسة':'Last Session','منذ':'Since','يوم':'day','أيام':'days','حضر':'Attended','من':'of','جلسة':'session','لا توجد حجوزات فائتة في هذا اليوم':'No missed appointments today','لا توجد حجوزات فائتة':'No missed appointments','نكست كير':'Next Care','اكسا':'AXA','جلوب ميد':'GlobeMed','عربي':'العربية','يومية التأمين':'Insurance Ledger','يومية الكاش':'Cash Ledger','اختر تاريخ اليومية':'Select Ledger Date','أهلاً':'Welcome','مستخدم':'User','كامل':'Complete','ناقص':'Missing','حضر 8 من 12':'Attended 8 of 12','حضر 1 من 12':'Attended 1 of 12',
// NEW BUTTONS & ALERTS
'إرسال ملخص اليوم واتساب':'Send Daily Summary via WhatsApp','تحميل ملخص اليوم PDF':'Download Daily Summary PDF','تنبيهات ذكية':'Smart Alerts','صافي السيولة النقدية (في الدرج فقط): 0 ج.م':'Net Cash (drawer only): 0 EGP','محتاج مراجعة':'needs review','فرصة تجديد':'renewal opportunity','رواتب الطاقم المستحقة هذا الشهر':'Staff salaries due this month','ملخص اليومية المالية':'Daily Financial Summary','صافي اليوم (كاش + تحمل - مصروفات الكاش)':'Net Today (Cash + Co-pay - Cash Expenses)','طباعة / حفظ PDF':'Print / Save PDF','إرسال ملخص اليوم':'Send Daily Summary','تحميل ملخص اليوم':'Download Daily Summary',
// EDIT PATIENT & RESERVATIONS & DOCTORS
'تعديل ملف المريض':'Edit Patient File','تعديل الملف':'Edit File','تحديث الحجز':'Update Booking','تعديل الحجز':'Edit Booking','تعديل':'Edit','حضور الدكاترة اليوم':'Doctors Attendance Today','حفظ التعديلات':'Save Changes','النوع':'Type','تأمين / شركة':'Insurance / Company','الطبيب المحول':'Referring Doctor','التشخيص / الإصابة':'Diagnosis / Injury','سعر الجلسة':'Session Price','إجمالي الجلسات':'Total Sessions','الجلسات الحاضرة':'Attended Sessions','المدفوع (كاش)':'Paid (Cash)','إجمالي التحمل':'Total Co-pay','المدفوع من التحمل':'Co-pay Paid','إجمالي إنستاباي':'Total InstaPay','تذكير':'Reminder','تأخر؟':'Late?',
};

// New screens and financial/service actions added after the original dictionary.
Object.assign(DICT, {
    'حالات الدكاترة اليوم': 'Doctors\' Cases Today',
    'اضغط لعرض أسماء الحالات الحاضرة': 'Click to view attended cases',
    'التغذية': 'Nutrition', 'الريكفري': 'Recovery', 'فرق جلسة': 'Session Difference',
    'إضافة كاش': 'Cash Addition', 'إضافة شركات': 'Insurance Company Addition',
    'تحويل من كاش إلى إنستاباي': 'Cash to InstaPay Transfer',
    'تحويل من إنستاباي إلى كاش': 'InstaPay to Cash Transfer',
    'مصروف إنستاباي': 'InstaPay Expense', 'سجل الحركات المالية': 'Financial Transactions Log',
    'التحليل الشهري': 'Monthly Analysis', 'إجمالي التحليل الشهري': 'Monthly Analysis Summary',
    'تنزيل إجمالي التحليل الشهري': 'Download Monthly Analysis Summary',
    'تقارير أطباء العظام': 'Orthopedic Doctors Reports', 'الاستقبال': 'Reception',
    'دفتر اليومية': 'Daily Ledger', 'الحجوزات': 'Reservations', 'حضر': 'Attended',
    'لم يحضر': 'Did Not Attend', 'منتظر': 'Waiting', 'طريقة الدفع': 'Payment Method',
    'الملاحظات': 'Notes', 'الفرع': 'Branch', 'التاريخ': 'Date',
    'الطبيب المعالج': 'Treating Doctor', 'طبيب العظام': 'Orthopedic Doctor',
    'المكتسب الفعلي': 'Actual Earned', 'المتبقي': 'Remaining', 'إجمالي المصروفات': 'Total Expenses'
});

let curLang = localStorage.getItem('ls_lang') || 'ar';
const saved = new Map();

function walkText(root, fn) {
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: n => {
            const p = n.parentElement;
            if (!p || ['SCRIPT','STYLE','TEXTAREA'].includes(p.tagName)) return NodeFilter.FILTER_REJECT;
            return n.textContent.trim().length > 1 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
    });
    const nodes = []; while (w.nextNode()) nodes.push(w.currentNode);
    nodes.forEach(fn);
}

function translate(lang) {
    curLang = lang;
    localStorage.setItem('ls_lang', lang);
    if (lang === 'en') {
        document.documentElement.dir = 'ltr'; document.documentElement.lang = 'en';
        walkText(document.body, node => {
            const txt = node.textContent.trim();
            if (DICT[txt]) { if (!saved.has(node)) saved.set(node, node.textContent); node.textContent = node.textContent.replace(txt, DICT[txt]); }
            // ترجمة جزئية للنصوص اللي فيها أرقام متغيرة
            else if (txt.includes('صافي السيولة النقدية')) {
                if (!saved.has(node)) saved.set(node, node.textContent);
                node.textContent = node.textContent.replace('صافي السيولة النقدية (في الدرج فقط):', 'Net Cash (drawer only):').replace('ج.م', 'EGP');
            }
            else if (txt.includes('محتاج') && txt.includes('مراجعة')) {
                if (!saved.has(node)) saved.set(node, node.textContent);
                node.textContent = node.textContent.replace(/ملف تأمين ناقص أوراق/,'insurance files missing papers').replace('محتاج','need').replace('مراجعة','review');
            }
            else if (txt.includes('باقي له') && txt.includes('تجديد')) {
                if (!saved.has(node)) saved.set(node, node.textContent);
                node.textContent = node.textContent
                    .replace('مريض باقي له جلستين أو أقل','patient(s) with 2 or fewer sessions left')
                    .replace('— فرصة تجديد','— renewal opportunity')
                    .replace('فرصة تجديد','renewal opportunity');
            }
            else if (txt.includes('مديونية غير محصلة')) {
                if (!saved.has(node)) saved.set(node, node.textContent);
                node.textContent = node.textContent
                    .replace('مريض كاش عليه مديونية غير محصلة','cash patient(s) with uncollected debt');
            }
            else if (txt.includes('رواتب الطاقم المستحقة')) {
                if (!saved.has(node)) saved.set(node, node.textContent);
                node.textContent = node.textContent
                    .replace('رواتب الطاقم المستحقة هذا الشهر','Staff salaries due this month')
                    .replace('ج','EGP');
            }
        });
        document.querySelectorAll('[placeholder]').forEach(el => { const ph=el.placeholder.trim(); if(DICT[ph]){if(!el.dataset.oph)el.dataset.oph=ph; el.placeholder=DICT[ph];} });
        document.querySelectorAll('option').forEach(el => { const t=el.textContent.trim(); if(DICT[t]){if(!el.dataset.ot)el.dataset.ot=t; el.textContent=DICT[t];} });
    } else {
        document.documentElement.dir = 'rtl'; document.documentElement.lang = 'ar';
        saved.forEach((orig, node) => { if (node.parentElement) node.textContent = orig; }); saved.clear();
        document.querySelectorAll('[data-oph]').forEach(el => el.placeholder = el.dataset.oph);
        document.querySelectorAll('option[data-ot]').forEach(el => el.textContent = el.dataset.ot);
    }
    updateBtn();
}

function updateBtn() {
    const b = document.getElementById('ls-lang-btn'); if (!b) return;
    b.innerHTML = curLang === 'ar'
        ? '<span style="font-size:1.05rem;font-weight:900;letter-spacing:1px;">EN</span><span style="font-size:0.68rem;opacity:0.65;">English</span>'
        : '<span style="font-size:1.05rem;font-weight:900;">ع</span><span style="font-size:0.68rem;opacity:0.65;">عربي</span>';
}

function toggleLang() { translate(curLang === 'ar' ? 'en' : 'ar'); }

function makeBtn() {
    if (document.getElementById('ls-lang-btn')) return;
    const b = document.createElement('button'); b.id='ls-lang-btn'; b.onclick=toggleLang;
    Object.assign(b.style, { position:'fixed', bottom:'28px', left:'28px', zIndex:'99999', background:'linear-gradient(135deg,#0b132b,#1a2a5e)', color:'#d4af37', border:'2px solid rgba(212,175,55,0.35)', borderRadius:'50px', padding:'10px 18px', fontFamily:"'Tajawal',sans-serif", fontWeight:'900', cursor:'pointer', display:'flex', alignItems:'center', gap:'7px', boxShadow:'0 6px 20px rgba(11,19,43,0.4)', lineHeight:'1', transition:'all 0.28s cubic-bezier(0.34,1.2,0.64,1)' });
    b.onmouseover = () => { b.style.transform='translateY(-3px) scale(1.06)'; b.style.background='linear-gradient(135deg,#d4af37,#c49a2a)'; b.style.color='#0b132b'; };
    b.onmouseout  = () => { b.style.transform=''; b.style.background='linear-gradient(135deg,#0b132b,#1a2a5e)'; b.style.color='#d4af37'; };
    document.body.appendChild(b); updateBtn();
}

function init() {
    makeBtn();
    if (curLang === 'en') setTimeout(() => translate('en'), 700);
    // راقب أي محتوى جديد يتضاف (بيانات Firebase) وترجمه
    const obs = new MutationObserver(() => {
        if (curLang === 'en') {
            clearTimeout(window._trTimer);
            window._trTimer = setTimeout(() => {
                walkText(document.body, node => {
                    const txt = node.textContent.trim();
                    if (DICT[txt] && !saved.has(node)) {
                        saved.set(node, node.textContent);
                        node.textContent = node.textContent.replace(txt, DICT[txt]);
                    }
                    // ترجمة جزئية للتنبيهات اللي فيها أرقام
                    else if (!saved.has(node)) {
                        if (txt.includes('صافي السيولة النقدية')) {
                            saved.set(node, node.textContent);
                            node.textContent = node.textContent.replace('صافي السيولة النقدية (في الدرج فقط):','Net Cash (drawer only):').replace('ج.م','EGP');
                        } else if (txt.includes('محتاج') && txt.includes('مراجعة')) {
                            saved.set(node, node.textContent);
                            node.textContent = node.textContent.replace(/ملف تأمين ناقص أوراق/,'insurance files missing papers').replace('محتاج','need').replace('مراجعة','review');
                        } else if (txt.includes('باقي له') && txt.includes('تجديد')) {
                            saved.set(node, node.textContent);
                            node.textContent = node.textContent.replace('مريض باقي له جلستين أو أقل','patient(s) with 2 or fewer sessions left').replace('— فرصة تجديد','— renewal opportunity').replace('فرصة تجديد','renewal opportunity');
                        } else if (txt.includes('مديونية غير محصلة')) {
                            saved.set(node, node.textContent);
                            node.textContent = node.textContent.replace('مريض كاش عليه مديونية غير محصلة','cash patient(s) with uncollected debt');
                        } else if (txt.includes('رواتب الطاقم المستحقة')) {
                            saved.set(node, node.textContent);
                            node.textContent = node.textContent.replace('رواتب الطاقم المستحقة هذا الشهر','Staff salaries due this month').replace('ج','EGP');
                        }
                    }
                });
            }, 400);
        }
    });
    obs.observe(document.body, { childList: true, subtree: true });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else setTimeout(init, 200);

// إتاحة الدوال عالمياً
try { window.translate = translate; window.toggleLang = toggleLang; } catch(e){}

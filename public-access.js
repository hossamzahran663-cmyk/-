(function () {
  'use strict';

  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('userRole', 'owner');
  localStorage.setItem('userName', 'Obsidian User');
  localStorage.setItem('userBranch', 'Main');

  const path = location.pathname.toLowerCase();
  if (/\/login\.html$/.test(path)) {
    location.replace('dashboard.html');
    return;
  }

  const unlock = () => {
    document.querySelectorAll('#pinOverlay, #authOverlay, #customModalOverlay, .auth-overlay-unified').forEach(el => {
      el.classList.add('hidden', 'ls-hidden');
      el.style.setProperty('display', 'none', 'important');
    });
    document.querySelectorAll('.main-content').forEach(el => el.classList.add('unlocked'));
  };

  const addHelp = () => {
    if (document.getElementById('obsidianHelpButton')) return;

    const pageName = location.pathname.split('/').pop().toLowerCase() || 'index.html';
    const guides = {
      'index.html': ['بدء الاستخدام', 'ادخل إلى لوحة التحكم لمتابعة أقسام المنظومة.', ['استخدم زر دخول المنظومة للانتقال للوحة التحكم.', 'إدارة المستخدمين والصلاحيات تتم من صفحة الدعم.']],
      'dashboard.html': ['لوحة التحكم', 'ملخص سريع لحالة العمل اليومي.', ['راجع الأرقام والمؤشرات في البطاقات.', 'استخدم القائمة الجانبية للانتقال إلى أي قسم.']],
      'reception.html': ['الاستقبال', 'تسجيل المريض والحجز ومتابعة الحضور.', ['أضف مريضاً أو ابحث عن سجل موجود.', 'سجّل الحضور أو عدّل الحجز من قائمة المواعيد.']],
      'reservations.html': ['الحجوزات', 'إدارة مواعيد المرضى وحالات الحجز.', ['اختر التاريخ والفرع لمراجعة المواعيد.', 'حدّث حالة الحجز بعد التواصل أو الحضور.']],
      'patients.html': ['مراجعة ملفات المرضى', 'عرض الملفات والبحث فيها دون تعديل البيانات.', ['اكتب الاسم أو رقم الهاتف للبحث.', 'استخدم فلتر النوع للتمييز بين التأمين والنقدي.']],
      'admin_patients.html': ['ملفات المرضى الشاملة', 'إضافة وتعديل ومتابعة ملفات المرضى.', ['استخدم البحث للوصول إلى الملف المطلوب.', 'من أزرار الملف يمكنك التعديل أو مراجعة الجلسات.']],
      'ledger.html': ['الحسابات', 'متابعة الإيرادات والحركات المالية.', ['اختر الفترة أو الفرع قبل مراجعة الأرقام.', 'سجّل أي حركة جديدة من أزرار الإجراءات.']],
      'analytics.html': ['التحليلات', 'قراءة مؤشرات الأداء والإحصاءات.', ['غيّر الفترة للحصول على النتائج المطلوبة.', 'استخدم المؤشرات لتحديد الحالات أو الفروع التي تحتاج متابعة.']],
      'reports.html': ['التقارير', 'متابعة التقارير وسجل التواصل.', ['استخدم الفلاتر للوصول للحالات المطلوبة.', 'حدّث حالة المتابعة بعد التواصل.']],
      'hr.html': ['الموارد البشرية', 'إدارة بيانات الفريق والرواتب.', ['اختر الشهر قبل مراجعة الأجور.', 'سجّل الحضور أو التعديلات من ملف الموظف.']],
      'home_visits.html': ['الزيارات المنزلية', 'متابعة الحالات والجلسات المنزلية.', ['اختر الطبيب أو الحالة من القوائم.', 'أضف الجلسة بعد تنفيذ الزيارة.']],
      'ortho_vip.html': ['العظام وVIP', 'متابعة حالات العظام والخدمات المميزة.', ['استخدم البحث للوصول إلى الحالة.', 'راجع الجلسات والملاحظات من ملف الحالة.']],
      'support.html': ['الدعم والإعدادات', 'إدارة إعدادات المنظومة والمستخدمين.', ['أنشئ حساباً وحدد دوره والفرع المسموح له.', 'استخدم النسخ الاحتياطي قبل أي تعديل كبير.']],
      'audit_trail.html': ['سجل المراقبة', 'مراجعة العمليات المسجلة داخل المنظومة.', ['استخدم الفلاتر لتحديد المستخدم أو التاريخ.', 'راجع السجل عند الحاجة لمعرفة أي تعديل.']]
    };
    const guide = guides[pageName] || ['شرح الصفحة', 'استخدم القائمة الجانبية للوصول إلى أقسام المنظومة.', ['راجع البيانات الظاهرة في هذه الصفحة.', 'إدارة المستخدمين والصلاحيات تتم من صفحة الدعم.']];

    const style = document.createElement('style');
    style.textContent = `
      #obsidianHelpButton{position:fixed;left:18px;top:88px;min-width:76px;height:42px;border:0;border-radius:6px;background:#1c1f24;color:#d8dbe0;font:700 14px Arial;cursor:pointer;box-shadow:0 8px 22px rgba(0,0,0,.28);z-index:999999}
      #obsidianHelpButton:hover{background:#30343a}
      #obsidianHelpDialog{position:fixed;inset:0;background:rgba(0,0,0,.55);display:none;align-items:center;justify-content:center;padding:20px;z-index:8001}
      #obsidianHelpDialog.is-open{display:flex}
      .obsidian-help-panel{width:min(460px,100%);background:#fff;color:#202328;border-radius:8px;padding:24px;box-shadow:0 20px 50px rgba(0,0,0,.35);font-family:Arial,sans-serif;direction:rtl;text-align:right}
      .obsidian-help-panel h2{margin:0 0 10px;font-size:20px;color:#111}.obsidian-help-panel h3{font-size:15px;margin:16px 0 7px;color:#1c1f24}
      .obsidian-help-panel p{margin:0 0 16px;color:#555;line-height:1.7}
      .obsidian-help-panel ul{margin:0;padding-right:20px;color:#333;line-height:2}
      .obsidian-help-close{margin-top:20px;background:#1c1f24;color:#fff;border:0;border-radius:6px;padding:10px 18px;font-weight:700;cursor:pointer}
      #ls-update-btn{display:none !important}
    `;
    document.head.appendChild(style);

    const button = document.createElement('button');
    button.id = 'obsidianHelpButton';
    button.type = 'button';
    button.title = 'شرح الصفحة';
    button.setAttribute('aria-label', 'شرح الصفحة');
    button.textContent = 'شرح';

    const extraSteps = {
      'dashboard.html': ['لإضافة مريض أو تسجيل حضور، انتقل إلى الاستقبال.', 'راجع البيانات حسب الفرع والتاريخ قبل اتخاذ قرار.'],
      'reception.html': ['بعد حفظ الملف، تأكد من رقم الهاتف ونوع الملف.', 'لا تسجل حضوراً مكرراً لنفس المريض في اليوم نفسه.'],
      'reservations.html': ['سجل نتيجة التواصل حتى لا يبقى الحجز بلا حالة.', 'استخدم بيانات الاتصال المسجلة قبل تعديل الموعد.'],
      'patients.html': ['راجع المستندات قبل اعتماد الملف.', 'عند الحاجة لتعديل البيانات انتقل إلى ملفات المرضى الشاملة.'],
      'admin_patients.html': ['تحقق من نوع الملف والجلسات قبل الحفظ.', 'لا تحذف ملفاً إلا بعد مراجعة حركاته المالية.'],
      'ledger.html': ['اكتب سبب الحركة بوضوح لتظهر في التقرير.', 'راجع الرصيد بعد الحفظ وقبل طباعة كشف اليومية.'],
      'analytics.html': ['قارن النتائج بين الفروع والفترات.', 'استخدم التقرير للتخطيط وليس لتعديل البيانات مباشرة.'],
      'reports.html': ['سجّل نتيجة كل متابعة فور حدوثها.', 'ارجع للاستقبال أو ملف المريض عند الحاجة لتعديل البيانات.'],
      'hr.html': ['راجع الشهر المحدد قبل إدخال خصم أو إضافة.', 'احتفظ بنسخة احتياطية قبل استيراد أو تصدير البيانات.'],
      'home_visits.html': ['أكد بيانات العنوان والتواصل قبل الزيارة.', 'أضف ملاحظة الجلسة فور الانتهاء منها.'],
      'ortho_vip.html': ['راجع بيانات الحالة والطبيب قبل حفظ الجلسة.', 'استخدم التقارير لمتابعة الحالات المفتوحة.'],
      'support.html': ['حدد دور كل مستخدم والفرع المسموح له بدقة.', 'لا تشارك بيانات الدخول في النسخة العامة.'],
      'audit_trail.html': ['استخدم التاريخ واسم المستخدم لتضييق نتائج البحث.', 'احتفظ بالسجل لأغراض المراجعة.']
    };
    guide[2].push(...(extraSteps[pageName] || ['استخدم القائمة الجانبية للانتقال إلى القسم المطلوب.', 'راجع البيانات قبل الحفظ أو التصدير.']));

    const dialog = document.createElement('div');
    dialog.id = 'obsidianHelpDialog';
    dialog.innerHTML = `<div class="obsidian-help-panel" role="dialog" aria-modal="true" aria-labelledby="obsidianHelpTitle">
      <h2 id="obsidianHelpTitle">${guide[0]}</h2>
      <p>${guide[1]}</p>
      <h3>خطوات العمل</h3><ul>${guide[2].map(item => `<li>${item}</li>`).join('')}</ul>
      <button class="obsidian-help-close" type="button">إغلاق</button>
    </div>`;
    button.addEventListener('click', () => dialog.classList.add('is-open'));
    dialog.addEventListener('click', event => { if (event.target === dialog || event.target.closest('.obsidian-help-close')) dialog.classList.remove('is-open'); });
    document.body.append(button, dialog);
  };

  const seedDemoData = async () => {
    if (window.__obsidianSeedAttempted || !window.firebase || !firebase.apps.length) return;
    window.__obsidianSeedAttempted = true;
    try {
      const db = firebase.firestore();
      const existing = await db.collection('patients_cash').limit(1).get();
      if (!existing.empty) return;

      const now = firebase.firestore.Timestamp.fromDate(new Date());
      const rows = [
        ['settings', 'system_settings', { appName: 'Obsidian System', cashRatio: 0.5 }],
        ['patients_cash', 'أحمد محمود', { phone: '01012345678', branch: 'المهندسين', totalSess: 12, attended: 5, cost: 3600, paid: 1500, createdAt: now }],
        ['patients_cash', 'مريم علي', { phone: '01023456789', branch: 'أكتوبر', totalSess: 8, attended: 3, cost: 2400, paid: 900, createdAt: now }],
        ['patients_cash', 'يوسف حسن', { phone: '01034567890', branch: 'الهرم', totalSess: 10, attended: 7, cost: 3000, paid: 2100, createdAt: now }],
        ['patients_insu', 'سارة خالد', { phone: '01045678901', branch: 'المهندسين', comp: 'تأمين النخبة', totalSess: 12, attended: 6, copay: 100, copayPaid: 600, createdAt: now }],
        ['patients_insu', 'عمر سامح', { phone: '01056789012', branch: 'مدينة نصر', comp: 'تأمين المستقبل', totalSess: 10, attended: 4, copay: 120, copayPaid: 480, createdAt: now }],
        ['reservations', 'demo_res_1', { patientName: 'أحمد محمود', phone: '01012345678', branch: 'المهندسين', date: '2026-08-08', time: '05:00 PM', status: 'منتظر', createdAt: now }],
        ['reservations', 'demo_res_2', { patientName: 'سارة خالد', phone: '01045678901', branch: 'المهندسين', date: '2026-08-08', time: '06:00 PM', status: 'تم التأكيد', createdAt: now }],
        ['reservations', 'demo_res_3', { patientName: 'مريم علي', phone: '01023456789', branch: 'أكتوبر', date: '2026-08-09', time: '04:30 PM', status: 'منتظر', createdAt: now }],
        ['daily_ledger', 'demo_ledger_1', { patientName: 'أحمد محمود', amount: 300, type: 'كاش', method: 'كاش', date: '08/08/2026', branch: 'المهندسين', timestamp: now }],
        ['daily_ledger', 'demo_ledger_2', { patientName: 'سارة خالد', amount: 100, type: 'تحمل', method: 'كاش', date: '08/08/2026', branch: 'المهندسين', timestamp: now }],
        ['daily_transactions', 'demo_expense_1', { type: 'expense', amount: 450, reason: 'مستلزمات تشغيل تجريبية', date: '08/08/2026', branch: 'المهندسين', timestamp: now }],
        ['daily_transactions', 'demo_income_1', { type: 'income', amount: 700, reason: 'إيراد خدمات تجريبي', date: '08/08/2026', branch: 'أكتوبر', timestamp: now }],
        ['follow_up_reports', 'demo_follow_1', { patientName: 'يوسف حسن', phone: '01034567890', status: 'بانتظار التواصل', branch: 'الهرم', createdAt: now }],
        ['employees', 'demo_emp_1', { name: 'هند أحمد', phone: '01067890123', role: 'استقبال', branch: 'المهندسين', salary: 6500, createdAt: now }],
        ['employees', 'demo_emp_2', { name: 'كريم محمد', phone: '01078901234', role: 'أخصائي', branch: 'أكتوبر', salary: 8000, createdAt: now }],
        ['hv_doctors', 'demo_doc_1', { name: 'د. محمد إبراهيم', phone: '01089012345', percent: 35, code: 'DEMO1', createdAt: now }],
        ['hv_cases', 'demo_case_1', { docId: 'demo_doc_1', patientName: 'نورا جمال', phone: '01090123456', address: 'المهندسين', sessionPrice: 500, sessionsCount: 2, status: 'نشطة', createdAt: now }],
        ['hv_sessions', 'demo_session_1', { docId: 'demo_doc_1', docName: 'د. محمد إبراهيم', caseId: 'demo_case_1', patientName: 'نورا جمال', sessionPrice: 500, docShare: 175, date: '08/08/2026', notes: 'جلسة تجريبية', timestamp: now }]
      ];
      const batch = db.batch();
      rows.forEach(([collection, id, data]) => batch.set(db.collection(collection).doc(id), data, { merge: true }));
      await batch.commit();
      console.info('Obsidian demo data seeded');
    } catch (error) {
      console.warn('Obsidian demo data was not seeded:', error.code || error.message);
    }
  };

  window.prompt = () => null;
  document.addEventListener('DOMContentLoaded', () => { unlock(); addHelp(); setTimeout(seedDemoData, 800); });
})();

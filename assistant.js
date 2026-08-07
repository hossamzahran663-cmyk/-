// ===== LIFE SPORT — المساعد الذكي =====
// بيقرأ بيانات Firebase ويرد على الأسئلة + دعم الصوت

(function() {
    let db = null;
    let data = { insu:[], cash:[], ledger:[], trans:[], employees:[], reservations:[], hvCases:[], hvSessions:[], hvDoctors:[], reports:[] };
    let loaded = false;
    let voiceEnabled = true;

    // انتظر Firebase يجهز
    function waitForDB() {
        if (typeof firebase !== 'undefined' && firebase.apps.length) {
            db = firebase.firestore();
            loadData();
        } else {
            setTimeout(waitForDB, 500);
        }
    }

    function loadData() {
        db.collection("patients_insu").onSnapshot(s => { data.insu=[]; s.forEach(d=>{let x=d.data();x.id=d.id;data.insu.push(x);}); loaded=true; });
        db.collection("patients_cash").onSnapshot(s => { data.cash=[]; s.forEach(d=>{let x=d.data();x.id=d.id;data.cash.push(x);}); });
        db.collection("daily_ledger").onSnapshot(s => { data.ledger=[]; s.forEach(d=>data.ledger.push(d.data())); });
        db.collection("daily_transactions").onSnapshot(s => { data.trans=[]; s.forEach(d=>data.trans.push(d.data())); });
        db.collection("employees").onSnapshot(s => { data.employees=[]; s.forEach(d=>{let x=d.data();x.id=d.id;data.employees.push(x);}); });
        db.collection("reservations").onSnapshot(s => { data.reservations=[]; s.forEach(d=>data.reservations.push(d.data())); });
        db.collection("hv_cases").onSnapshot(s => { data.hvCases=[]; s.forEach(d=>{let x=d.data();x.id=d.id;data.hvCases.push(x);}); });
        db.collection("hv_sessions").onSnapshot(s => { data.hvSessions=[]; s.forEach(d=>data.hvSessions.push(d.data())); });
        db.collection("hv_doctors").onSnapshot(s => { data.hvDoctors=[]; s.forEach(d=>{let x=d.data();x.id=d.id;data.hvDoctors.push(x);}); });
        db.collection("follow_up_reports").onSnapshot(s => { data.reports=[]; s.forEach(d=>data.reports.push(d.data())); });
    }

    // ===== محرك الأسئلة =====
    // تطبيع النص: يشيل التشكيل ويوحّد الحروف عشان يفهم أي كتابة
    function normalize(s) {
        return s
            .replace(/[\u064B-\u065F\u0670]/g, '')  // شيل التشكيل
            .replace(/[أإآا]/g, 'ا')   // كل أشكال الألف
            .replace(/ى/g, 'ي')
            .replace(/ة/g, 'ه')
            .replace(/ؤ/g, 'و')
            .replace(/ئ/g, 'ي')
            .replace(/ء/g, '')         // شيل الهمزة المفردة
            .replace(/ـ/g, '')         // شيل التطويل
            .replace(/[؟?.,!،:؛"'()]/g, ' ')  // شيل علامات الترقيم
            .replace(/\s+/g, ' ')
            .trim();
    }

    // دالة مساعدة: هل السؤال فيه أي كلمة من اللي بندوّر عليها؟
    function hasAny(q, words) {
        return words.some(w => q.includes(normalize(w)));
    }

    function answer(qRaw) {
        const qOrig = qRaw.trim();
        const q = normalize(qOrig);  // النسخة المطبّعة للبحث
        const today = new Date().toLocaleDateString('en-GB').replace(/\//g,'/'); // dd/mm/yyyy
        const branches = ['المهندسين','أكتوبر','الهرم','العبور'];
        let branch = branches.find(b => q.includes(normalize(b)));

        // ===== معلومات الإدارة (ثابتة) =====
        if ((q.includes('مدير') || q.includes('اداره') || q.includes('مسءول') || q.includes('مسئول') || q.includes('مين في') || q.includes('مين ال')) && (q.includes('مركز') || q.includes('لايف') || q.includes('سبورت') || q.includes('اداره'))) {
            return `🏢 <b>إدارة مركز Life Sport:</b><br>━━━━━━━━━━━<br>• الإدارة: <b>مدام هبة</b><br>• الطبيب المسؤول: <b>دكتور قاسم</b><br>• محاسب الفروع: <b>كابتن ياسين</b>`;
        }

        // ===== تحيات =====
        if (/^(مرحبا|اهلا|هاي|hi|hello|السلام|صباح|مساء|ازيك|عامل ايه|اخبارك|هلا|hey)/.test(q)) {
            const userName = localStorage.getItem('userName') || 'Hossam Zahran';
            return `أهلاً <b>${userName}</b> 👋<br>إزيك؟ أنا مساعدك في نظام لايف سبورت.<br>اسألني عن أي حاجة: اليومية، مريض، دكتور، حجوزات، فلوس... 😊`;
        }

        // ===== ملخص شامل / كل حاجة =====
        if (hasAny(q, ['ملخص شامل','كل حاجه','كل حاجة','نظره عامه','تقرير شامل','اعرض كل','وريني كل','الوضع العام','نظرة عامة','شامل','overview','كل البيانات'])) {
            const today = new Date().toLocaleDateString('en-GB');
            const todayLedger = data.ledger.filter(e => e.date === today && (!branch || normalize(e.branch||'')===normalize(branch)));
            const cash = todayLedger.filter(e=>(e.type||'').includes('كاش')).reduce((a,e)=>a+parseFloat(e.amount||0),0);
            const copay = todayLedger.filter(e=>(e.type||'').includes('تحمل')).reduce((a,e)=>a+parseFloat(e.amount||0),0);
            const insta = todayLedger.filter(e=>e.method==='instapay').reduce((a,e)=>a+parseFloat(e.amount||0),0);
            const todayExp = data.trans.filter(e => e.date === today && (!branch || normalize(e.branch||'')===normalize(branch))).reduce((a,e)=>a+parseFloat(e.amount||0),0);
            const todayRes = data.reservations.filter(r => { const rd = r.date; const td = new Date().toISOString().split('T')[0]; return (rd === td || rd === today) && (!branch || normalize(r.branch||'')===normalize(branch)); });
            const insuN = (branch ? data.insu.filter(p=>normalize(p.branch||'')===normalize(branch)) : data.insu).length;
            const cashN = (branch ? data.cash.filter(p=>normalize(p.branch||'')===normalize(branch)) : data.cash).length;
            const net = cash + copay + insta - todayExp;
            return `📊 <b>ملخص شامل${branch?' — '+branch:' (كل الفروع)'}</b><br>━━━━━━━━━━━<br>
💰 <b>مالية النهاردة:</b><br>• كاش: ${cash.toLocaleString()} ج<br>• تحمل: ${copay.toLocaleString()} ج<br>• إنستاباي: ${insta.toLocaleString()} ج<br>• مصروفات: ${todayExp.toLocaleString()} ج<br>• <b>الصافي: ${net.toLocaleString()} ج</b><br>━━━━━━━━━━━<br>
👥 <b>المرضى:</b> ${insuN+cashN} (تأمين ${insuN} + كاش ${cashN})<br>
📅 <b>حجوزات النهاردة:</b> ${todayRes.length}<br>
👨‍⚕️ <b>الموظفين:</b> ${data.employees.length}<br>
🏠 <b>حالات منزلية:</b> ${data.hvCases.filter(c=>!c.isArchived).length}<br>━━━━━━━━━━━<br>
<i>اسألني عن أي تفصيلة أكتر 😊</i>`;
        }

        // ===== دكاترة العظام المحوّلين =====
        if (hasAny(q, ['دكاتر','اطباء','أطباء','عظام','محول','محوّل','الطبيب المحول','دكاترة العظام','اطباء العظام','حول','حوّل','حولهم','محولين'])) {
            // اجمع كل المرضى من التأمين والكاش مع حساب المكتسب
            const allInsu = (data.insu||[]);
            const allCash = (data.cash||[]);
            const docMap = {};
            const cleanName = (rd) => rd.replace(/^(د\.|د\s|دكتور\s|دكتورة\s|دكتور|دكتورة)/,'').trim();

            allInsu.forEach(p => {
                if (!p.refDoctor || !p.refDoctor.trim()) return;
                if (branch && normalize(p.branch||'') !== normalize(branch)) return;
                let dn = cleanName(p.refDoctor);
                if (!dn || dn === '-' || dn === 'لم يحدد') return;
                if (!docMap[dn]) docMap[dn] = { count:0, earned:0, patients:[] };
                const earned = ((p.price||0) * (p.attended||0)) + (p.copayPaid||0);
                docMap[dn].count++;
                docMap[dn].earned += earned;
                docMap[dn].patients.push({ name:p.id, comp:p.comp||'تأمين', sess:`${p.attended||0}/${p.totalSess||0}`, earned });
            });
            allCash.forEach(p => {
                if (!p.refDoctor || !p.refDoctor.trim()) return;
                if (branch && normalize(p.branch||'') !== normalize(branch)) return;
                let dn = cleanName(p.refDoctor);
                if (!dn || dn === '-' || dn === 'لم يحدد') return;
                if (!docMap[dn]) docMap[dn] = { count:0, earned:0, patients:[] };
                let earned = p.mode === 'course' ? (p.paid||0) : ((p.sessPrice||0) * (p.attended||0));
                docMap[dn].count++;
                docMap[dn].earned += earned;
                docMap[dn].patients.push({ name:p.id, comp:'كاش', sess:`${p.attended||0}/${p.totalSess||0}`, earned });
            });

            const docArr = Object.entries(docMap).sort((a,b) => b[1].count - a[1].count);
            if (!docArr.length) return `🦴 مفيش دكاترة عظام محوّلين مسجّلين${branch?' في '+branch:''}.`;

            // هل سأل عن دكتور معيّن بالاسم؟
            let askedDoc = null;
            for (const [name, info] of docArr) {
                if (q.includes(normalize(name)) || normalize(q).includes(normalize(name))) { askedDoc = [name, info]; break; }
            }

            if (askedDoc) {
                // تفاصيل دكتور معيّن
                const [name, info] = askedDoc;
                let result = `🦴 <b>د. ${name}</b>${branch?' — '+branch:''}<br>━━━━━━━━━━━<br>`;
                result += `📊 عدد الحالات: <b>${info.count}</b> حالة<br>`;
                result += `💰 إجمالي المكتسب الفعلي: <b>${info.earned.toLocaleString()}</b> ج<br>`;
                result += `━━━━━━━━━━━<br>👥 <b>الحالات:</b><br>`;
                info.patients.slice(0, 15).forEach((pt, i) => {
                    result += `${i+1}. ${pt.name} (${pt.comp}) — ${pt.sess} جلسة — ${pt.earned.toLocaleString()} ج<br>`;
                });
                if (info.patients.length > 15) result += `... و${info.patients.length - 15} حالة أخرى<br>`;
                return result;
            }

            // قائمة كل الدكاترة
            let result = `🦴 <b>دكاترة العظام المحوّلين${branch?' — '+branch:''}:</b><br>━━━━━━━━━━━<br>`;
            docArr.slice(0, 12).forEach(([name, info], i) => {
                const medal = i===0?'🥇':(i===1?'🥈':(i===2?'🥉':`${i+1}.`));
                result += `${medal} <b>د. ${name}</b>: ${info.count} حالة — ${info.earned.toLocaleString()} ج<br>`;
            });
            const total = docArr.reduce((a,d) => a + d[1].count, 0);
            const totalEarned = docArr.reduce((a,d) => a + d[1].earned, 0);
            result += `━━━━━━━━━━━<br>إجمالي: <b>${docArr.length}</b> دكتور، <b>${total}</b> حالة، <b>${totalEarned.toLocaleString()}</b> ج<br>`;
            result += `<br>💡 اكتب اسم دكتور معيّن عشان أقولك تفاصيله`;
            return result;
        }

        // ===== دكتور معين (جلسات منزلية) =====
        if (q.includes('دكتور') || q.includes('د.') || q.includes('الدكتور')) {
            // دور على الدكتور بالاسم
            let doc = data.hvDoctors?.find(d => d.name && q.includes(normalize(d.name)));
            if (doc) {
                let cases = data.hvCases.filter(c => c.docId === doc.id);
                let sessions = data.hvSessions.filter(s => s.docId === doc.id);
                // فلتر بالشهر لو مذكور
                let monthMatch = q.match(/شهر\s*(\d{1,2})|(\d{1,2})\/\d{4}/);
                if (monthMatch) {
                    let m = parseInt(monthMatch[1] || monthMatch[2]);
                    sessions = sessions.filter(s => s.date && new Date(s.date).getMonth()+1 === m);
                }
                let earnings = sessions.reduce((a,s)=>a+(s.docShare||0),0);
                return `🩺 <b>د. ${doc.name}</b><br>━━━━━━━━━━━<br>• نسبته: <b>${doc.percent}%</b><br>• عدد الحالات: <b>${cases.filter(c=>!c.isArchived).length}</b><br>• الجلسات: <b>${sessions.length}</b><br>• مستحقاته: <b>${earnings.toLocaleString()} ج</b>`;
            }
        }

        // ===== حجوزات ساعة معينة =====
        if ((q.includes('حجز') || q.includes('حجوزات')) && (q.match(/\d{1,2}/) || q.includes('ساعة'))) {
            // استخرج الساعة
            let timeMatch = q.match(/(\d{1,2})/);
            if (timeMatch) {
                let hour = timeMatch[1];
                let res = data.reservations.filter(r => {
                    if (r.date !== today) return false;
                    if (branch && r.branch !== branch) return false;
                    return r.time && r.time.includes(hour);
                });
                if (res.length) {
                    let list = res.map(r => `• ${r.patientName||'-'} (${r.time}) ${r.doctor?'- د.'+r.doctor:''}`).join('<br>');
                    return `📅 <b>حجوزات الساعة ${hour}${branch?' — '+branch:''}:</b><br>━━━━━━━━━━━<br>${list}<br>━━━━━━━━━━━<br>الإجمالي: <b>${res.length}</b> حجز`;
                }
                return `📅 مفيش حجوزات الساعة ${hour}${branch?' في '+branch:''} النهاردة.`;
            }
        }

        // ===== اليومية الكاملة لفرع =====
        if ((hasAny(q, ['يوميه','عامله ايه','عامل ايه','ملخص','اجمالي اليوم','الموقف','الوضع','احوال','الشغل','اخبار','حالة اليوم','عملنا ايه','ايه الاخبار']) || (q.includes('اليوم') && q.includes('عامل'))) && !q.includes('مريض')) {
            let ledger = data.ledger.filter(e => e.date === today && (!branch || normalize(e.branch||'') === normalize(branch)));
            let cash = ledger.filter(e=>(e.type||'').includes('كاش')).reduce((a,e)=>a+parseFloat(e.amount||0),0);
            let copay = ledger.filter(e=>(e.type||'').includes('تحمل')).reduce((a,e)=>a+parseFloat(e.amount||0),0);
            let trans = data.trans.filter(e => e.date === today && (!branch || normalize(e.branch||'') === normalize(branch)));
            let exp = trans.reduce((a,e)=>a+parseFloat(e.amount||0),0);
            let net = cash + copay - exp;
            let patientsCount = new Set(ledger.map(e=>e.patientName)).size;
            return `📊 <b>يومية النهاردة${branch?' — فرع '+branch:''}</b><br>
                ━━━━━━━━━━━<br>
                💰 الكاش: <b>${cash.toLocaleString()} ج</b><br>
                🏥 التحمل: <b>${copay.toLocaleString()} ج</b><br>
                💸 المصروفات: <b>${exp.toLocaleString()} ج</b><br>
                👥 عدد المرضى: <b>${patientsCount}</b><br>
                ━━━━━━━━━━━<br>
                ✅ الصافي: <b style="color:#27ae60;">${net.toLocaleString()} ج</b>`;
        }

        // ===== مريض معين =====
        let patientName = null;
        {
            const allPatients = [...data.insu, ...data.cash];
            // دور بالاسم الكامل الأول، وبعدين بأجزاء الاسم
            patientName = allPatients.find(p => {
                const name = normalize(p.id || p.name || '');
                return name && q.includes(name);
            });
            // لو ملقاش، دور بأجزاء (لو كتب جزء من الاسم)
            if (!patientName) {
                const qWords = q.split(' ').filter(w => w.length > 2);
                patientName = allPatients.find(p => {
                    const name = normalize(p.id || p.name || '');
                    const nameWords = name.split(' ').filter(w => w.length > 2);
                    if (nameWords.length < 2) return false;
                    // لازم يطابق كلمتين على الأقل من الاسم
                    const matches = nameWords.filter(nw => qWords.includes(nw)).length;
                    return matches >= 2;
                });
            }

            if (patientName) {
                const p = patientName;
                const att = parseInt(p.attended||0);
                const total = parseInt(p.totalSess||0);
                const remaining = Math.max(0, total - att);
                const isCash = data.cash.includes(p);
                const company = p.comp || (isCash ? 'كاش' : '-');
                const price = parseFloat(p.price || p.sessPrice || 0);
                const paid = parseFloat(p.paid || 0);
                const copayTotal = parseFloat(p.copayTotal || 0);
                const copayPaid = parseFloat(p.copayPaid || 0);
                const debt = isCash ? (price * total - paid) : (copayTotal - copayPaid);

                let result = `👤 <b>${p.id || p.name}</b><br>━━━━━━━━━━━<br>`;
                result += `🏥 النوع: <b>${company}</b><br>`;
                result += `📅 الجلسات: <b>${att}</b> من <b>${total}</b>`;
                if (remaining > 0) result += ` (متبقي <b>${remaining}</b>)`;
                result += `<br>`;
                if (p.branch) result += `📍 الفرع: <b>${p.branch}</b><br>`;
                if (p.refDoctor) result += `🩺 الطبيب: <b>${p.refDoctor}</b><br>`;
                if (p.injury) result += `🔬 التشخيص: <b>${p.injury}</b><br>`;
                result += `💰 سعر الجلسة: <b>${price.toLocaleString()} ج</b><br>`;
                if (isCash) {
                    result += `💵 المدفوع: <b>${paid.toLocaleString()} ج</b><br>`;
                    if (debt > 0) result += `⚠️ متبقي عليه: <b style="color:#e74c3c;">${debt.toLocaleString()} ج</b><br>`;
                } else {
                    result += `🏥 التحمل الكلي: <b>${copayTotal.toLocaleString()} ج</b><br>`;
                    result += `💵 المدفوع من التحمل: <b>${copayPaid.toLocaleString()} ج</b><br>`;
                    if (debt > 0) result += `⚠️ باقي التحمل: <b style="color:#e74c3c;">${debt.toLocaleString()} ج</b><br>`;
                }
                if (p.isClosed) result += `🔒 <b style="color:#e74c3c;">الملف مغلق</b><br>`;
                if (p.paperStatus) result += `📋 الأوراق: <b>${p.paperStatus}</b><br>`;
                return result;
            } else if (q.includes('مريض') || q.includes('المريض')) {
                return `🔍 مش لاقي المريض ده. تأكد من كتابة الاسم زي ما هو مسجل.<br>مثال: "المريض أحمد محمد حضر كام جلسة"`;
            }
        }

        // كاش / فلوس النهاردة
        if (hasAny(q, ['كاش','فلوس','نقدي','دخل','ايراد','فلوس','مكسب','حصلنا','جمعنا','حصّلنا','دخلنا']) && hasAny(q, ['النهارد','اليوم','انهارد','دلوقتي','دلوقت','حاليا','النهاردة'])) {
            let todayLedger = data.ledger.filter(e => e.date === today && (!branch || normalize(e.branch||'') === normalize(branch)));
            let cash = todayLedger.filter(e=>(e.type||'').includes('كاش')).reduce((a,e)=>a+parseFloat(e.amount||0),0);
            return `💰 إجمالي الكاش النهاردة${branch?' في فرع '+branch:''}: <b>${cash.toLocaleString()} ج.م</b>`;
        }

        // إجمالي الكاش (كل الأيام)
        if (hasAny(q, ['كاش','فلوس','نقدي','دخل','ايراد','مكسب','حصيله','حصلنا','جمعنا','دخلنا','كسبنا'])) {
            let ledger = branch ? data.ledger.filter(e=>normalize(e.branch||'')===normalize(branch)) : data.ledger;
            let cash = ledger.filter(e=>(e.type||'').includes('كاش')).reduce((a,e)=>a+parseFloat(e.amount||0),0);
            return `💰 إجمالي الكاش${branch?' في فرع '+branch:' (كل الفروع)'}: <b>${cash.toLocaleString()} ج.م</b>`;
        }

        // عدد المرضى
        if (hasAny(q, ['كام مريض','عدد المرضي','عدد مرضي','كام عيان','عدد العيانين','احصاء','احصائيه']) || (hasAny(q,['مرضي','عيان','عيانين','مرضى']) && hasAny(q,['كام','عدد','اجمالي'])) || (q.includes('عدد') && hasAny(q,['مريض','عيان']))) {
            let insu = branch ? data.insu.filter(p=>normalize(p.branch||'')===normalize(branch)) : data.insu;
            let cash = branch ? data.cash.filter(p=>normalize(p.branch||'')===normalize(branch)) : data.cash;
            return `👥 عدد المرضى${branch?' في فرع '+branch:''}:<br>• تأمين: <b>${insu.length}</b><br>• كاش: <b>${cash.length}</b><br>• الإجمالي: <b>${insu.length+cash.length}</b>`;
        }

        // الحجوزات
        if (hasAny(q, ['حجز','حجوزات','حجوزه','مواعيد','بوكينج','معاد','ميعاد','بوكنج','appointments'])) {
            let res = data.reservations.filter(r => r.date === today && (!branch || normalize(r.branch||'') === normalize(branch)));
            return `📅 حجوزات النهاردة${branch?' في فرع '+branch:''}: <b>${res.length}</b> حجز`;
        }

        // المصروفات
        if (hasAny(q, ['مصروف','مصاريف','منصرف','صرفنا','طالع','مدفوعات','نفقات','صرف'])) {
            let trans = data.trans.filter(e => e.date === today && (!branch || normalize(e.branch||'') === normalize(branch)));
            let exp = trans.reduce((a,e)=>a+parseFloat(e.amount||0),0);
            return `💸 مصروفات النهاردة${branch?' في فرع '+branch:''}: <b>${exp.toLocaleString()} ج.م</b>`;
        }

        // الموظفين / الرواتب
        if (hasAny(q, ['موظف','راتب','مرتب','رواتب','كادر','طاقم','مرتبات','الموظفين','عامل','عمال','فريق'])) {
            let emps = branch ? data.employees.filter(e=>normalize(e.branch||'')===normalize(branch)) : data.employees;
            let total = emps.reduce((a,e)=>a+parseFloat(e.salary||0),0);
            let emp = data.employees.find(e => e.name && q.includes(normalize(e.name)));
            if (emp) {
                return `👤 <b>${emp.name}</b>:<br>• الوظيفة: ${emp.role||'-'}<br>• الراتب: <b>${parseFloat(emp.salary||0).toLocaleString()} ج.م</b><br>• الفرع: ${emp.branch||'-'}`;
            }
            return `👥 الموظفين${branch?' في فرع '+branch:''}: <b>${emps.length}</b><br>💰 إجمالي الرواتب: <b>${total.toLocaleString()} ج.م</b>`;
        }

        // الجلسات المنزلية
        if (hasAny(q, ['منزلي','منزليه','جلسات منزل','بيت','زيارات','زياره','منازل','هوم','home'])) {
            let cases = data.hvCases.filter(c=>!c.isArchived);
            let sessions = data.hvSessions.length;
            return `🏠 الجلسات المنزلية:<br>• الحالات النشطة: <b>${cases.length}</b><br>• إجمالي الجلسات المسجلة: <b>${sessions}</b>`;
        }

        // التحمل / التأمين
        if (hasAny(q, ['تحمل','تامين','كوباي','copay','شركه تامين','التحمل','التامين'])) {
            let ledger = branch ? data.ledger.filter(e=>normalize(e.branch||'')===normalize(branch)) : data.ledger;
            let copay = ledger.filter(e=>(e.type||'').includes('تحمل')).reduce((a,e)=>a+parseFloat(e.amount||0),0);
            return `🏥 إجمالي التحمل${branch?' في فرع '+branch:''}: <b>${copay.toLocaleString()} ج.م</b>`;
        }

        // خدمات التغذية والريكفري وفرق الجلسة: من اليومية فقط حتى لا تتكرر الحالة.
        if (hasAny(q, ['تغذية','تغذيه','nutrition','ريكفري','recovery','فرق جلسة','فرق جلسه'])) {
            const isNutrition = hasAny(q, ['تغذية','تغذيه','nutrition']);
            const isRecovery = hasAny(q, ['ريكفري','recovery']);
            const isDifference = hasAny(q, ['فرق جلسة','فرق جلسه']);
            const todayEntries = data.ledger.filter(e => {
                if (e.date !== today || (branch && normalize(e.branch||'') !== normalize(branch))) return false;
                const type = normalize(e.type || '');
                return (isNutrition && type.includes(normalize('تغذية'))) ||
                    (isRecovery && type.includes(normalize('ريكفري'))) ||
                    (isDifference && type.includes(normalize('فرق جلسة')));
            });
            const label = isNutrition ? 'التغذية' : (isRecovery ? 'الريكفري' : 'فرق الجلسة');
            const total = todayEntries.reduce((sum,e) => sum + parseFloat(e.amount||0), 0);
            if (!todayEntries.length) return `لا توجد عمليات ${label} مسجلة اليوم${branch ? ' في فرع '+branch : ''}.`;
            return `📋 <b>${label} اليوم${branch ? ' — '+branch : ''}</b><br>────────────<br>${todayEntries.map(e => `• ${e.patientName||'-'} — <b>${parseFloat(e.amount||0).toLocaleString()} ج</b>${e.method ? ' ('+e.method+')' : ''}${e.notes ? ' — '+e.notes : ''}`).join('<br>')}<br>────────────<br>الإجمالي: <b>${total.toLocaleString()} ج</b>`;
        }

        // الإنستاباي
        if (hasAny(q, ['انستاباي','انستا','instapay','تحويل','محفظه','محفظة','فودافون كاش','فوري'])) {
            let ledger = branch ? data.ledger.filter(e=>normalize(e.branch||'')===normalize(branch)) : data.ledger;
            let instaIn = ledger.filter(e=>e.method==='instapay').reduce((a,e)=>a+parseFloat(e.amount||0),0);
            let instaOut = (branch ? data.trans.filter(t=>normalize(t.branch||'')===normalize(branch)) : data.trans)
                .filter(t=>t.type==='instapay').reduce((a,t)=>a+parseFloat(t.amount||0),0);
            return `📱 <b>الإنستاباي${branch?' — '+branch:''}:</b><br>• داخل: <b style="color:#27ae60;">${instaIn.toLocaleString()} ج</b><br>• مصروفات: <b style="color:#c62828;">${instaOut.toLocaleString()} ج</b><br>• الصافي: <b style="color:#6a1b9a;">${(instaIn-instaOut).toLocaleString()} ج</b>`;
        }

        // الغياب
        if (hasAny(q, ['غياب','غابوا','اتغيبوا','مجوش','منقطعين','انقطاع','مش جايين','غايبين'])) {
            let reports = branch ? (data.reports||[]).filter(r=>normalize(r.branch||'')===normalize(branch)) : (data.reports||[]);
            if (!reports.length) return `✅ لا يوجد غياب مسجّل${branch?' في '+branch:''}.`;
            let recent = reports.slice(-10).reverse();
            return `🚫 <b>آخر حالات الغياب${branch?' — '+branch:''}:</b> (${reports.length})<br>${recent.map(r=>`• 👤 ${r.patientName} — ${r.reason||'-'} <span style="color:#999;font-size:0.8rem;">${r.date||''}</span>`).join('<br>')}`;
        }

        // ===== بحث عام في أي اسم =====
        if (q.length > 3) {
            const allPats = [...data.insu, ...data.cash];
            const words = q.split(/\s+/).filter(w => w.length > 2);
            let matched = allPats.find(p => {
                const name = normalize(p.id || p.name || '');
                const nameWords = name.split(' ').filter(w=>w.length>2);
                return nameWords.length && nameWords.filter(nw => words.includes(nw)).length >= 1;
            });
            if (matched) {
                const p = matched;
                const att = parseInt(p.attended||0), total = parseInt(p.totalSess||0);
                const isCash = data.cash.includes(p);
                const price = parseFloat(p.price || p.sessPrice || 0);
                let r = `👤 <b>${p.id||p.name}</b><br>━━━━━━━━━━━<br>`;
                r += `🏥 ${p.comp || (isCash?'كاش':'-')}<br>`;
                r += `📅 حضر <b>${att}</b> من <b>${total}</b> جلسة<br>`;
                if (p.branch) r += `📍 ${p.branch}<br>`;
                if (price) r += `💰 سعر الجلسة: <b>${price} ج</b><br>`;
                return r;
            }
        }

        // صافي اليوم / إجمالي
        if (q.includes('صافي') || q.includes('اجمالي اليوم') || q.includes('ربح') || q.includes('دخل اليوم')) {
            let ledger = data.ledger.filter(e => e.date === today && (!branch || normalize(e.branch||'') === normalize(branch)));
            let cash = ledger.filter(e=>(e.type||'').includes('كاش')).reduce((a,e)=>a+parseFloat(e.amount||0),0);
            let copay = ledger.filter(e=>(e.type||'').includes('تحمل')).reduce((a,e)=>a+parseFloat(e.amount||0),0);
            let trans = data.trans.filter(e => e.date === today && (!branch || normalize(e.branch||'') === normalize(branch)));
            let exp = trans.reduce((a,e)=>a+parseFloat(e.amount||0),0);
            let net = cash + copay - exp;
            return `✅ <b>صافي النهاردة${branch?' — '+branch:''}:</b> ${net.toLocaleString()} ج<br><span style="font-size:0.85rem;color:#888;">(كاش ${cash.toLocaleString()} + تحمل ${copay.toLocaleString()} - مصروفات ${exp.toLocaleString()})</span>`;
        }

        // مساعدة
        if (q.includes('مساعد') || q.includes('ايه اللي') || q.includes('تقدر') || q.includes('help') || q.includes('?') || q.includes('؟') || q.includes('اوامر') || q.includes('عامل ايه')) {
            return `أقدر أساعدك في:<br>
                • 📊 "اليومية عاملة ايه النهاردة؟"<br>
                • 👤 "المريض [الاسم] حضر كام جلسة؟"<br>
                • 🩺 "د. [الاسم] شهر 5 كام حالة؟"<br>
                • 📅 "حجوزات الساعة 2 النهاردة"<br>
                • 💰 "كام كاش النهاردة؟"<br>
                • ✅ "صافي اليوم"<br>
                • 🥗 "التغذية اليوم" أو "الريكفري اليوم" لمعرفة الحالات والمبالغ<br>
                • ➕ "فرق جلسة اليوم" لمراجعة فروق الجلسات المسجلة<br>
                • 📱 "إنستاباي المهندسين" لمعرفة الداخل والمصروفات<br>
                • 👥 "عدد المرضى في المهندسين"<br>
                • 💸 "مصروفات اليوم"<br>
                • 👤 "مرتب [اسم الموظف]"<br>
                • 🏠 "الجلسات المنزلية"<br>
                • 🏢 "مين الإدارة؟"<br><br>
                اسأل عن أي فرع بإضافة اسمه 😊`;
        }

        // ===== رد ذكي بدل "مش فاهم" =====
        // جرب تخمين إن كان في اسم مريض قريب
        {
            const allPats = [...data.insu, ...data.cash];
            const words = q.split(/\s+/).filter(w => w.length > 2);
            const suggestions = allPats.filter(p => {
                const name = normalize(p.id || p.name || '');
                return words.some(w => name.includes(w) || w.includes(name.split(' ')[0]||''));
            }).slice(0, 3);
            if (suggestions.length) {
                return `مش متأكد من سؤالك بالظبط 🤔<br>تقصد أحد دول؟<br>${suggestions.map(p=>`• 👤 ${p.id||p.name}`).join('<br>')}<br><br>اكتب الاسم كامل أو اكتب "مساعدة".`;
            }
        }

        return `مش فاهم السؤال 🤔<br>ممكن تسألني عن:<br>• اليومية / الكاش / الصافي<br>• مريض معين بالاسم<br>• حجوزات / مصروفات / رواتب<br><br>اكتب "مساعدة" للتفاصيل.`;
    }

    // ===== واجهة الشات =====
    function buildUI() {
        // زرار عائم
        const fab = document.createElement('button');
        fab.id = 'ai-fab';
        fab.innerHTML = '<i class="fas fa-robot"></i>';
        Object.assign(fab.style, {
            position:'fixed', bottom:'28px', right:'28px', zIndex:'99998',
            width:'58px', height:'58px', borderRadius:'50%',
            background:'linear-gradient(135deg,#7b1fa2,#9c27b0)', color:'white',
            border:'2px solid rgba(255,255,255,0.3)', fontSize:'1.4rem', cursor:'pointer',
            boxShadow:'0 8px 24px rgba(123,31,162,0.45)', transition:'0.28s',
            display:'flex', alignItems:'center', justifyContent:'center'
        });
        fab.onmouseover = () => fab.style.transform='scale(1.1)';
        fab.onmouseout = () => fab.style.transform='';
        fab.onclick = toggleChat;
        document.body.appendChild(fab);

        // نافذة الشات
        const box = document.createElement('div');
        box.id = 'ai-box';
        Object.assign(box.style, {
            position:'fixed', bottom:'96px', right:'28px', zIndex:'99999',
            width:'350px', maxWidth:'92vw', height:'480px', maxHeight:'72vh',
            background:'white', borderRadius:'20px', overflow:'hidden',
            boxShadow:'0 20px 60px rgba(0,0,0,0.3)', display:'none',
            flexDirection:'column', fontFamily:"'Tajawal',sans-serif",
            border:'1px solid #e4e9f0'
        });
        box.innerHTML = `
            <div style="background:linear-gradient(135deg,#7b1fa2,#9c27b0);color:white;padding:16px 18px;display:flex;align-items:center;gap:10px;">
                <div style="width:38px;height:38px;background:rgba(255,255,255,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.2rem;"><i class="fas fa-robot"></i></div>
                <div style="flex:1;"><div style="font-weight:900;font-size:0.98rem;">مساعد لايف سبورت</div><div style="font-size:0.72rem;opacity:0.8;">اسألني عن أي حاجة في النظام</div></div>
                <button id="ai-voice-toggle" title="تشغيل/إيقاف الصوت" style="background:rgba(255,255,255,0.2);border:none;color:white;width:34px;height:34px;border-radius:50%;cursor:pointer;font-size:0.95rem;margin-left:4px;"><i class="fas fa-volume-up"></i></button>
                <button onclick="document.getElementById('ai-box').style.display='none'" style="background:rgba(255,255,255,0.15);border:none;color:white;width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:1rem;">✕</button>
            </div>
            <div id="ai-msgs" style="flex:1;overflow-y:auto;padding:16px;background:#f8f9fc;display:flex;flex-direction:column;gap:10px;"></div>
            <div style="padding:12px;border-top:1px solid #eee;display:flex;gap:8px;align-items:center;background:white;">
                <button id="ai-mic" style="background:#f3e5f5;border:none;color:#7b1fa2;width:42px;height:42px;border-radius:50%;cursor:pointer;font-size:1.1rem;flex-shrink:0;"><i class="fas fa-microphone"></i></button>
                <input id="ai-input" type="text" placeholder="اكتب سؤالك..." style="flex:1;padding:11px 14px;border:1.5px solid #e0e4ea;border-radius:12px;outline:none;font-family:'Tajawal';font-size:0.9rem;font-weight:700;">
                <button id="ai-send" style="background:linear-gradient(135deg,#7b1fa2,#9c27b0);border:none;color:white;width:42px;height:42px;border-radius:50%;cursor:pointer;font-size:1rem;flex-shrink:0;"><i class="fas fa-paper-plane"></i></button>
            </div>`;
        document.body.appendChild(box);

        // ترحيب
        addMsg('أهلاً! 👋 أنا مساعدك الذكي. اسألني عن الكاش، المرضى، الحجوزات، الرواتب، أو أي حاجة في النظام.<br><br>اكتب "مساعدة" لرؤية كل الأوامر.', 'bot');

        // أحداث
        document.getElementById('ai-send').onclick = send;
        document.getElementById('ai-input').addEventListener('keydown', e => { if(e.key==='Enter') send(); });
        document.getElementById('ai-mic').onclick = startVoice;
        // زرار تشغيل/إيقاف الصوت
        document.getElementById('ai-voice-toggle').onclick = function() {
            voiceEnabled = !voiceEnabled;
            this.innerHTML = voiceEnabled ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
            if (!voiceEnabled) window.speechSynthesis.cancel();
        };
    }

    function toggleChat() {
        const box = document.getElementById('ai-box');
        box.style.display = box.style.display === 'none' ? 'flex' : 'none';
        if (box.style.display === 'flex') document.getElementById('ai-input').focus();
    }

    function addMsg(html, who) {
        const msgs = document.getElementById('ai-msgs');
        const m = document.createElement('div');
        const isBot = who === 'bot';
        Object.assign(m.style, {
            maxWidth:'85%', padding:'11px 14px', borderRadius:'14px',
            fontSize:'0.88rem', fontWeight:'700', lineHeight:'1.6',
            alignSelf: isBot ? 'flex-start' : 'flex-end',
            background: isBot ? 'white' : 'linear-gradient(135deg,#7b1fa2,#9c27b0)',
            color: isBot ? '#0b132b' : 'white',
            border: isBot ? '1px solid #e4e9f0' : 'none',
            boxShadow:'0 2px 8px rgba(0,0,0,0.05)'
        });
        m.innerHTML = html;
        msgs.appendChild(m);
        msgs.scrollTop = msgs.scrollHeight;
    }

    function send() {
        const inp = document.getElementById('ai-input');
        const q = inp.value.trim();
        if (!q) return;
        addMsg(q, 'user');
        inp.value = '';
        setTimeout(() => {
            if (!loaded) { addMsg('⏳ لسه بحمّل البيانات... جرب تاني بعد ثانية.', 'bot'); return; }
            const reply = answer(q);
            addMsg(reply, 'bot');
            speak(reply); // رد بالصوت
        }, 300);
    }

    // ===== الرد بالصوت =====
    let voicesReady = false;
    function loadVoices() {
        const v = window.speechSynthesis.getVoices();
        if (v.length) voicesReady = true;
    }
    if (window.speechSynthesis) {
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    function speak(html) {
        if (!window.speechSynthesis || !voiceEnabled) return;
        // شيل HTML tags والإيموجي والرموز
        let text = html.replace(/<[^>]+>/g, ' ')
                       .replace(/[━─•]+/g, ' ')
                       .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}]/gu, '')
                       .replace(/ج\.م|ج /g, ' جنيه ')
                       .replace(/\s+/g, ' ').trim();
        if (!text) return;

        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'ar-SA';
        u.rate = 0.9;
        u.pitch = 1;
        u.volume = 1;
        // دور على صوت عربي
        const voices = window.speechSynthesis.getVoices();
        const ar = voices.find(v => v.lang.startsWith('ar')) ||
                   voices.find(v => v.name.includes('Arabic'));
        if (ar) u.voice = ar;

        // أحياناً المتصفح محتاج تأخير بسيط
        setTimeout(() => window.speechSynthesis.speak(u), 100);
    }

    // ===== الصوت =====
    function startVoice() {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SR) { addMsg('⚠️ المتصفح ده مش بيدعم التسجيل الصوتي. جرب Chrome.', 'bot'); return; }
        const rec = new SR();
        rec.lang = 'ar-EG';
        rec.interimResults = false;
        const mic = document.getElementById('ai-mic');
        mic.style.background = '#e74c3c'; mic.style.color = 'white';
        mic.innerHTML = '<i class="fas fa-microphone"></i>';
        rec.onresult = e => {
            const text = e.results[0][0].transcript;
            document.getElementById('ai-input').value = text;
            send();
        };
        rec.onerror = () => addMsg('⚠️ مش قادر أسمع. تأكد إن الميكروفون شغال.', 'bot');
        rec.onend = () => { mic.style.background='#f3e5f5'; mic.style.color='#7b1fa2'; };
        rec.start();
    }

    // تشغيل
    function init() {
        // متظهرش في بوابة الدكتور (portal mode)
        const isPortal = new URLSearchParams(window.location.search).get('doc');
        if (isPortal) return; // الدكتور مايشوفش المساعد العام
        // المساعد للأدمن (owner) أو الإدارة المركزية فقط
        const role = localStorage.getItem('userRole');
        const branch = localStorage.getItem('userBranch');
        const isAdmin = (role === 'owner' || branch === 'الإدارة المركزية');
        if (!isAdmin) return; // الموظف العادي ومدير الفرع مايشوفوش المساعد
        buildUI();
        waitForDB();
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else setTimeout(init, 300);
})();

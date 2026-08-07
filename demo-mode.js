/* وضع عرض آمن للفيديو — يعمل فقط مع ?demo=1 ولا يغيّر أي بيانات في Firebase. */
(function () {
  const params = new URLSearchParams(location.search);
  if (params.get('demo') === '0') sessionStorage.removeItem('lifeSportDemoMode');
  if (params.get('demo') === '1') sessionStorage.setItem('lifeSportDemoMode', '1');
  const enabled = params.get('demo') === '1' || sessionStorage.getItem('lifeSportDemoMode') === '1';
  if (!enabled) return;

  // Never load the live application or its data for a demo URL.
  if (!/\/demo\/index\.html$/i.test(location.pathname)) {
    const demoUrl = new URL('demo/index.html', location.href);
    demoUrl.searchParams.set('demo', '1');
    location.replace(demoUrl.href);
    return;
  }

  const redact = () => {
    document.documentElement.classList.add('ls-demo-mode');
    document.title = 'Obsidian System — نسخة عرض';

    // يبقى وضع العرض فعالاً مع كل روابط القائمة والصفحات الداخلية.
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href') || '';
      if (!href || href.startsWith('#') || /^(https?:|mailto:|tel:|javascript:)/i.test(href) || link.dataset.demoLink) return;
      try {
        const target = new URL(href, location.href);
        if (target.origin === location.origin && /\.html$/i.test(target.pathname)) {
          target.searchParams.set('demo', '1');
          link.href = target.href;
          link.dataset.demoLink = '1';
        }
      } catch (_) { /* رابط غير صالح — نتجاهله */ }
    });

    document.querySelectorAll('img[src*="logo" i], img[src*="app-icon" i]').forEach(img => {
      img.style.visibility = 'hidden';
      img.setAttribute('alt', '');
    });
    document.querySelectorAll('.header-title, .brand-name, .system-name').forEach(el => {
      if (!el.dataset.demoDone) { el.textContent = 'OBSIDIAN SYSTEM'; el.dataset.demoDone = '1'; }
    });

    document.querySelectorAll('.patient-name, .res-card-name, .patient-card-name, .patient-title, .patient-name-text, #pcName, #pName, #iName, #cName').forEach((el, index) => {
      if (!el.dataset.demoDone) { el.textContent = `حالة تجريبية ${index + 1}`; el.dataset.demoDone = '1'; }
    });

    document.querySelectorAll('.phone-text, .res-card-phone, .patient-phone, .phone').forEach(el => {
      if (!el.dataset.demoDone) { el.textContent = '0100 000 0000'; el.dataset.demoDone = '1'; }
    });

    // استبدال اسم المركز حتى لو كان مكتوباً داخل عنوان أو عنصر بسيط بلا class محدد.
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach(node => {
      const value = node.nodeValue;
      if (!value || !/life\s*sport|لايف\s*سبورت/i.test(value)) return;
      const parent = node.parentElement;
      if (parent && /^(SCRIPT|STYLE)$/i.test(parent.tagName)) return;
      node.nodeValue = value.replace(/life\s*sport/ig, 'OBSIDIAN SYSTEM').replace(/لايف\s*سبورت/ig, 'Obsidian System');
    });

    // الجداول التي لا تملك class للاسم: نخفي الخلية الأولى فقط في صفوف المرضى.
    document.querySelectorAll('tbody tr').forEach((row, index) => {
      const cell = row.querySelector('td:first-child');
      if (!cell || cell.colSpan || cell.dataset.demoDone || cell.querySelector('button')) return;
      const text = (cell.textContent || '').trim();
      if (text && !/^\d+[\s.]*$/.test(text) && text.length > 2) {
        cell.textContent = `حالة تجريبية ${index + 1}`;
        cell.dataset.demoDone = '1';
      }
    });
  };

  const style = document.createElement('style');
  style.textContent = `
    .ls-demo-mode .header-logo img,.ls-demo-mode .auth-logo img { visibility:hidden!important; }
    .ls-demo-mode .header-logo::before { content:'DEMO'; color:#d4af37; font-weight:900; font-size:1.1rem; }
  `;
  document.head.appendChild(style);
  document.addEventListener('DOMContentLoaded', redact);
  const observer = new MutationObserver(() => redact());
  observer.observe(document.documentElement, { childList:true, subtree:true });
  redact();
})();

/* ═══════════════════════════════════════════════════════
   Assignment Cover Generator — App Logic
   ═══════════════════════════════════════════════════════ */

const { jsPDF } = window.jspdf;

// ── Particles Background ──────────────────────────────
(function initParticles() {
  const canvas = document.getElementById('particlesCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < 40; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.3 + 0.1
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const isDark = document.body.classList.contains('dark-theme');
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = isDark
        ? `rgba(129, 140, 248, ${p.opacity})`
        : `rgba(99, 102, 241, ${p.opacity})`;
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > w) p.dx *= -1;
      if (p.y < 0 || p.y > h) p.dy *= -1;
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

// ── Template Card Selection ────────────────────────────
document.querySelectorAll('.template-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.template-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    document.getElementById('template').value = card.dataset.template;
    generateCoverPage();
  });
});

// ── Color Swatch Selection ─────────────────────────────
document.querySelectorAll('.color-swatch').forEach(swatch => {
  swatch.addEventListener('click', () => {
    document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
    swatch.classList.add('active');
    document.getElementById('themeColor').value = swatch.dataset.color;
    generateCoverPage();
  });
});

// ── Button Ripple Effect ───────────────────────────────
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function(e) {
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${e.clientX - rect.left - radius}px`;
    ripple.style.top = `${e.clientY - rect.top - radius}px`;
    ripple.className = 'ripple';
    const old = button.querySelector('.ripple');
    if (old) old.remove();
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// ── Form Submission ────────────────────────────────────
document.getElementById('coverForm').addEventListener('submit', (e) => {
  e.preventDefault();
  if (validateForm()) generateCoverPage();
});

// Real-time preview
document.querySelectorAll('#coverForm input, #coverForm select').forEach(el => {
  el.addEventListener('input', generateCoverPage);
});

// ── Initialization ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Theme restore
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    const icon = document.getElementById('themeIcon');
    if (icon) icon.classList.replace('fa-moon', 'fa-sun');
  }
  // Load saved data
  loadFormData();
  // Welcome modal
  showWelcomeModal();
  // Shortcuts
  initShortcuts();
  // Start auto-save
  startAutoSave();
});

// ── Generate Cover Page ────────────────────────────────
function generateCoverPage() {
  const data = {
    studentName: document.getElementById('studentName').value,
    rollNumber: document.getElementById('rollNumber').value,
    classRoll: document.getElementById('classRoll').value,
    semester: document.getElementById('semester').value,
    subject: document.getElementById('subject').value,
    courseCode: document.getElementById('courseCode').value,
    submissionDate: document.getElementById('submissionDate').value,
    assignmentType: document.getElementById('assignmentType').value,
    themeColor: document.getElementById('themeColor').value || '#1a237e',
    template: document.getElementById('template').value
  };

  let coverHTML;
  switch (data.template) {
    case 'modern': coverHTML = generateModernTemplate(data); break;
    case 'minimal': coverHTML = generateMinimalTemplate(data); break;
    case 'professional': coverHTML = generateProfessionalTemplate(data); break;
    case 'elegant': coverHTML = generateElegantTemplate(data); break;
    case 'creative': coverHTML = generateCreativeTemplate(data); break;
    case 'academic': coverHTML = generateAcademicTemplate(data); break;
    default: coverHTML = generateClassicTemplate(data);
  }

  const previewFrame = document.getElementById('previewFrame');
  previewFrame.contentDocument.open();
  previewFrame.contentDocument.write(coverHTML);
  previewFrame.contentDocument.close();
}

// ── Format Date ────────────────────────────────────────
function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// ── Template: Classic ──────────────────────────────────
function generateClassicTemplate(data) {
  return `<!DOCTYPE html><html><head><style>
    @page { size: A4; margin: 0; }
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&display=swap');
    body { font-family: 'Cormorant Garamond', serif; width: 210mm; min-height: 297mm; margin: 0 auto; padding: 20mm; box-sizing: border-box; background: linear-gradient(to bottom right, #fff 97%, ${data.themeColor}50 100%); border: 12px double ${data.themeColor}40; position: relative; }
    .watermark { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-45deg); font-size: 6em; opacity: 0.03; color: ${data.themeColor}; white-space: nowrap; pointer-events: none; }
    .cover-header { text-align: center; margin-bottom: 20mm; padding-bottom: 5mm; border-bottom: 2px solid ${data.themeColor}30; }
    .university-title { font-size: 28px; color: ${data.themeColor}; margin: 10px 0; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
    .cover-logo { width: 120px; margin: 15px auto; display: block; }
    .assignment-title { text-align: center; margin: 25mm 0; padding: 5mm; border-top: 2px solid ${data.themeColor}30; border-bottom: 2px solid ${data.themeColor}30; }
    .assignment-type { font-size: 32px; margin-bottom: 15px; color: ${data.themeColor}; font-weight: 700; letter-spacing: 1.5px; }
    .subject-title { font-size: 26px; margin: 10px 0; font-weight: 600; }
    .course-code { font-size: 20px; color: ${data.themeColor}; font-style: italic; }
    .details-section { width: 85%; margin: 0 auto; background: ${data.themeColor}05; padding: 5mm; border-radius: 5mm; }
    .details-row { display: flex; margin: 12px 0; font-size: 18px; line-height: 1.6; }
    .details-label { width: 45%; font-weight: 600; color: ${data.themeColor}; padding-right: 15px; }
    .details-value { width: 55%; position: relative; padding-left: 15px; }
    .details-value::before { content: ":"; position: absolute; left: 0; color: ${data.themeColor}; }
    .signature-section { margin-top: 30mm; display: flex; justify-content: space-between; padding: 0 10mm; }
    .sign-box { text-align: center; width: 180px; }
    .sign-line { width: 100%; border-bottom: 1px solid #000; margin-bottom: 5px; }
    .sign-label { font-size: 16px; color: ${data.themeColor}; font-weight: 600; }
    .corner-decoration { position: absolute; width: 40mm; height: 40mm; opacity: 0.1; }
    .top-left { top: 10mm; left: 10mm; } .top-right { top: 10mm; right: 10mm; transform: rotate(90deg); }
    .bottom-left { bottom: 10mm; left: 10mm; transform: rotate(270deg); } .bottom-right { bottom: 10mm; right: 10mm; transform: rotate(180deg); }
  </style></head><body>
    <div class="watermark">VBU</div>
    <svg class="corner-decoration top-left" viewBox="0 0 100 100"><path d="M0,0 L100,0 L100,10 C50,10 10,50 10,100 L0,100 Z" fill="${data.themeColor}"/></svg>
    <svg class="corner-decoration top-right" viewBox="0 0 100 100"><path d="M0,0 L100,0 L100,10 C50,10 10,50 10,100 L0,100 Z" fill="${data.themeColor}"/></svg>
    <svg class="corner-decoration bottom-left" viewBox="0 0 100 100"><path d="M0,0 L100,0 L100,10 C50,10 10,50 10,100 L0,100 Z" fill="${data.themeColor}"/></svg>
    <svg class="corner-decoration bottom-right" viewBox="0 0 100 100"><path d="M0,0 L100,0 L100,10 C50,10 10,50 10,100 L0,100 Z" fill="${data.themeColor}"/></svg>
    <div class="cover-header">
      <div class="university-title">Department of Computer Application</div>
      <div class="university-title">Vinoba Bhave University</div>
      <img src="https://i1.wp.com/www.winmeen.com/wp-content/uploads/2017/04/VBU-New-Logo.png?ssl=1" class="cover-logo" alt="University Logo">
    </div>
    <div class="assignment-title">
      <div class="assignment-type">${data.assignmentType}</div>
      <div class="subject-title">${data.subject}</div>
      <div class="course-code">Course Code: ${data.courseCode}</div>
    </div>
    <div class="details-section">
      <div class="details-row"><div class="details-label">Student Name</div><div class="details-value">${data.studentName}</div></div>
      <div class="details-row"><div class="details-label">University Roll Number</div><div class="details-value">${data.rollNumber}</div></div>
      <div class="details-row"><div class="details-label">Class Roll Number</div><div class="details-value">${data.classRoll}</div></div>
      <div class="details-row"><div class="details-label">Semester</div><div class="details-value">${data.semester}</div></div>
      <div class="details-row"><div class="details-label">Submission Date</div><div class="details-value">${formatDate(data.submissionDate)}</div></div>
    </div>
    <div class="signature-section">
      <div class="sign-box"><div class="sign-line"></div><div class="sign-label">Date</div></div>
      <div class="sign-box"><div class="sign-line"></div><div class="sign-label">Student's Signature</div></div>
    </div>
  </body></html>`;
}

// ── Template: Modern ───────────────────────────────────
function generateModernTemplate(data) {
  return `<!DOCTYPE html><html><head><style>
    @page { size: A4; margin: 0; }
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap');
    body { font-family: 'Montserrat', sans-serif; width: 210mm; min-height: 297mm; margin: 0 auto; padding: 0; box-sizing: border-box; color: #333; }
    .header-band { background-color: ${data.themeColor}; color: white; padding: 20mm 25mm; text-align: center; }
    .university-title { font-size: 24px; font-weight: 300; text-transform: uppercase; }
    .dept-title { font-size: 18px; font-weight: 300; margin-bottom: 10mm; }
    .assignment-type { font-size: 32px; font-weight: 700; margin: 5mm 0; }
    .content { padding: 25mm; }
    .subject { font-size: 28px; text-align: center; margin-bottom: 15mm; }
    .course-code { font-size: 18px; text-align: center; margin-bottom: 20mm; color: ${data.themeColor}; }
    .student-info { margin: 0 auto; max-width: 80%; }
    .info-row { padding: 10px 0; border-bottom: 1px solid #eee; display: flex; }
    .info-label { width: 40%; font-weight: 500; }
    .info-value { width: 60%; }
    .signature { margin-top: 20mm; display: flex; justify-content: flex-end; }
    .sign-box { width: 150px; text-align: center; }
    .sign-line { width: 100%; border-bottom: 1px solid #333; margin-bottom: 5px; }
  </style></head><body>
    <div class="header-band">
      <div class="university-title">Vinoba Bhave University</div>
      <div class="dept-title">Department of Computer Application</div>
      <div class="assignment-type">${data.assignmentType}</div>
    </div>
    <div class="content">
      <div class="subject">${data.subject}</div>
      <div class="course-code">Course Code: ${data.courseCode}</div>
      <div class="student-info">
        <div class="info-row"><div class="info-label">Student Name</div><div class="info-value">${data.studentName}</div></div>
        <div class="info-row"><div class="info-label">University Roll No</div><div class="info-value">${data.rollNumber}</div></div>
        <div class="info-row"><div class="info-label">Class Roll No</div><div class="info-value">${data.classRoll}</div></div>
        <div class="info-row"><div class="info-label">Semester</div><div class="info-value">${data.semester} Semester</div></div>
        <div class="info-row"><div class="info-label">Submission Date</div><div class="info-value">${formatDate(data.submissionDate)}</div></div>
      </div>
      <div class="signature"><div class="sign-box"><div class="sign-line"></div><div>Student's Signature</div></div></div>
    </div>
  </body></html>`;
}

// ── Template: Minimal ──────────────────────────────────
function generateMinimalTemplate(data) {
  return `<!DOCTYPE html><html><head><style>
    @page { size: A4; margin: 0; }
    body { font-family: 'Helvetica Neue', sans-serif; width: 210mm; min-height: 297mm; margin: 0 auto; padding: 30mm; background: #f8f9fa; }
    .header { border-bottom: 3px solid ${data.themeColor}; padding-bottom: 15px; margin-bottom: 30px; }
    .university { font-size: 24px; color: ${data.themeColor}; letter-spacing: 1.5px; }
    .department { font-size: 18px; color: #666; margin-top: 5px; }
    .assignment-type { font-size: 32px; text-transform: uppercase; letter-spacing: 2px; margin: 40px 0; color: #2d3748; }
    .details-table { width: 100%; border-collapse: collapse; margin: 25px 0; }
    .details-table td { padding: 12px 0; border-bottom: 1px solid #e2e8f0; }
    .label { width: 40%; font-weight: 600; color: #4a5568; }
    .signature-section { margin-top: 60px; display: flex; justify-content: space-between; }
    .date-box { text-align: right; margin-top: 40px; color: #4a5568; }
  </style></head><body>
    <div class="header">
      <div class="university">Vinoba Bhave University</div>
      <div class="department">Department of Computer Application</div>
    </div>
    <div class="assignment-type">${data.assignmentType}</div>
    <table class="details-table">
      <tr><td class="label">Student Name</td><td>${data.studentName}</td></tr>
      <tr><td class="label">University Roll No</td><td>${data.rollNumber}</td></tr>
      <tr><td class="label">Class Roll No</td><td>${data.classRoll}</td></tr>
      <tr><td class="label">Subject</td><td>${data.subject}</td></tr>
      <tr><td class="label">Course Code</td><td>${data.courseCode}</td></tr>
      <tr><td class="label">Semester</td><td>${data.semester}</td></tr>
    </table>
    <div class="signature-section">
      <div><div style="border-bottom:1px solid #2d3748;width:200px;margin-bottom:5px;"></div><div>Student Signature</div></div>
      <div class="date-box">Submission Date: ${formatDate(data.submissionDate)}</div>
    </div>
  </body></html>`;
}

// ── Template: Professional ─────────────────────────────
function generateProfessionalTemplate(data) {
  return `<!DOCTYPE html><html><head><style>
    @page { size: A4; margin: 0; }
    body { font-family: 'Playfair Display', serif; width: 210mm; min-height: 297mm; margin: 0 auto; padding: 25mm; box-sizing: border-box; background: #fff; border: 3px solid ${data.themeColor}; position: relative; }
    .header { text-align: center; margin-bottom: 15mm; }
    .university-title { font-size: 26px; margin-bottom: 8px; color: ${data.themeColor}; font-weight: 700; }
    .logo { display: block; margin: 0 auto 8mm auto; width: 200px; }
    .assignment { text-align: center; font-size: 24px; margin-bottom: 5mm; padding: 5px 0; color: ${data.themeColor}; font-weight: 700; }
    .assignment span { font-size: 18px; color: #0026ff; }
    .details { margin: 0 auto; width: 85%; text-align: left; }
    .details-row { font-size: 15px; margin: 8mm 0; padding: 8px 0; border-bottom: 1px solid #eee; display: flex; align-items: baseline; font-weight: 700; }
    .details-label { width: 35%; color: ${data.themeColor}; margin-right: 15px; }
    .signature-section { margin-top: 20mm; display: flex; justify-content: space-between; align-items: center; padding: 0 20px; }
    .signature-box, .date-box { width: 200px; text-align: center; padding-top: 5px; font-weight: 700; }
    .date-box { font-style: italic; }
  </style></head><body>
    <div class="header">
      <div class="university-title">Department of Computer Application</div>
      <div class="university-title">Vinoba Bhave University</div>
      <img src="https://i1.wp.com/www.winmeen.com/wp-content/uploads/2017/04/VBU-New-Logo.png?ssl=1" alt="University Logo" class="logo">
    </div>
    <div class="assignment">${data.subject}<br><span>Subject Code: ${data.courseCode}</span></div>
    <div class="details">
      <div class="details-row"><span class="details-label">Student Name</span><span>: ${data.studentName}</span></div>
      <div class="details-row"><span class="details-label">University Roll Number</span><span>: ${data.rollNumber}</span></div>
      <div class="details-row"><span class="details-label">Class Roll Number</span><span>: ${data.classRoll}</span></div>
      <div class="details-row"><span class="details-label">Semester</span><span>: ${data.semester}</span></div>
    </div>
    <div class="signature-section">
      <div class="date-box">Date: _ _ _ _ _ _ _ _ _</div>
      <div class="signature-box">Signature</div>
    </div>
  </body></html>`;
}

// ── Template: Elegant (NEW) ────────────────────────────
function generateElegantTemplate(data) {
  return `<!DOCTYPE html><html><head><style>
    @page { size: A4; margin: 0; }
    @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;600;700&family=Cinzel:wght@700&display=swap');
    body { font-family: 'Lora', serif; width: 210mm; min-height: 297mm; margin: 0 auto; padding: 25mm; box-sizing: border-box; background: #fffdf5; position: relative; }
    body::before { content: ''; position: absolute; inset: 8mm; border: 2px solid ${data.themeColor}30; pointer-events: none; }
    body::after { content: ''; position: absolute; inset: 12mm; border: 1px solid ${data.themeColor}18; pointer-events: none; }
    .ornament { text-align: center; color: ${data.themeColor}; font-size: 28px; letter-spacing: 8px; margin: 5mm 0; opacity: 0.4; }
    .header { text-align: center; margin-bottom: 15mm; }
    .uni-name { font-family: 'Cinzel', serif; font-size: 28px; color: ${data.themeColor}; letter-spacing: 2px; font-weight: 700; }
    .dept-name { font-size: 18px; color: ${data.themeColor}99; margin-top: 5px; font-style: italic; }
    .logo { display: block; margin: 10mm auto; width: 100px; opacity: 0.85; }
    .title-section { text-align: center; margin: 20mm 0; padding: 8mm 0; border-top: 1px solid ${data.themeColor}25; border-bottom: 1px solid ${data.themeColor}25; }
    .assign-type { font-family: 'Cinzel', serif; font-size: 30px; color: ${data.themeColor}; letter-spacing: 3px; margin-bottom: 8px; }
    .subj { font-size: 22px; font-weight: 600; color: #333; }
    .code { font-size: 16px; color: ${data.themeColor}; margin-top: 5px; font-style: italic; }
    .info { width: 75%; margin: 0 auto; }
    .row { display: flex; padding: 10px 0; border-bottom: 1px dotted ${data.themeColor}30; font-size: 16px; }
    .lbl { width: 42%; font-weight: 600; color: ${data.themeColor}; }
    .val { width: 58%; }
    .sig-area { margin-top: 30mm; display: flex; justify-content: space-between; padding: 0 15mm; }
    .sig-box { text-align: center; width: 160px; }
    .sig-line { border-bottom: 1px solid ${data.themeColor}; margin-bottom: 5px; }
    .sig-lbl { font-size: 14px; color: ${data.themeColor}; font-style: italic; }
  </style></head><body>
    <div class="ornament">❧ ❦ ❧</div>
    <div class="header">
      <div class="uni-name">Vinoba Bhave University</div>
      <div class="dept-name">Department of Computer Application</div>
      <img src="https://i1.wp.com/www.winmeen.com/wp-content/uploads/2017/04/VBU-New-Logo.png?ssl=1" class="logo" alt="Logo">
    </div>
    <div class="title-section">
      <div class="assign-type">${data.assignmentType}</div>
      <div class="subj">${data.subject}</div>
      <div class="code">Course Code: ${data.courseCode}</div>
    </div>
    <div class="info">
      <div class="row"><div class="lbl">Student Name</div><div class="val">${data.studentName}</div></div>
      <div class="row"><div class="lbl">University Roll No.</div><div class="val">${data.rollNumber}</div></div>
      <div class="row"><div class="lbl">Class Roll No.</div><div class="val">${data.classRoll}</div></div>
      <div class="row"><div class="lbl">Semester</div><div class="val">${data.semester} Semester</div></div>
      <div class="row"><div class="lbl">Submission Date</div><div class="val">${formatDate(data.submissionDate)}</div></div>
    </div>
    <div class="ornament">❧ ❦ ❧</div>
    <div class="sig-area">
      <div class="sig-box"><div class="sig-line"></div><div class="sig-lbl">Date</div></div>
      <div class="sig-box"><div class="sig-line"></div><div class="sig-lbl">Student's Signature</div></div>
    </div>
  </body></html>`;
}

// ── Template: Creative (NEW) ───────────────────────────
function generateCreativeTemplate(data) {
  return `<!DOCTYPE html><html><head><style>
    @page { size: A4; margin: 0; }
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap');
    body { font-family: 'Outfit', sans-serif; width: 210mm; min-height: 297mm; margin: 0 auto; padding: 0; box-sizing: border-box; background: #fff; position: relative; overflow: hidden; }
    .side-bar { position: absolute; top: 0; left: 0; width: 25mm; height: 100%; background: linear-gradient(180deg, ${data.themeColor}, ${data.themeColor}cc); }
    .side-bar::after { content: ''; position: absolute; top: 0; right: -20mm; width: 40mm; height: 100%; background: ${data.themeColor}08; transform: skewX(-5deg); }
    .top-accent { position: absolute; top: 0; right: 0; width: 80mm; height: 15mm; background: ${data.themeColor}; clip-path: polygon(20% 0, 100% 0, 100% 100%, 0 100%); }
    .content { margin-left: 35mm; padding: 25mm 20mm 25mm 10mm; }
    .uni { font-size: 14px; color: ${data.themeColor}; text-transform: uppercase; letter-spacing: 3px; font-weight: 300; }
    .dept { font-size: 12px; color: #999; margin-top: 3px; letter-spacing: 1px; }
    .assign-type { font-size: 42px; font-weight: 800; color: ${data.themeColor}; margin: 15mm 0 5mm; line-height: 1.1; }
    .subj-block { margin: 8mm 0 20mm; padding-left: 15px; border-left: 4px solid ${data.themeColor}; }
    .subj-name { font-size: 22px; font-weight: 600; color: #222; }
    .subj-code { font-size: 14px; color: ${data.themeColor}; margin-top: 3px; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 15mm; }
    .info-card { background: ${data.themeColor}06; border-radius: 8px; padding: 12px 15px; border-left: 3px solid ${data.themeColor}30; }
    .info-lbl { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: ${data.themeColor}; font-weight: 600; margin-bottom: 4px; }
    .info-val { font-size: 15px; color: #333; font-weight: 400; }
    .sig-row { display: flex; justify-content: flex-end; margin-top: 20mm; gap: 25mm; }
    .sig-item { text-align: center; }
    .sig-dash { width: 120px; border-bottom: 2px solid ${data.themeColor}40; margin-bottom: 5px; }
    .sig-text { font-size: 12px; color: ${data.themeColor}; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
  </style></head><body>
    <div class="side-bar"></div>
    <div class="top-accent"></div>
    <div class="content">
      <div class="uni">Vinoba Bhave University</div>
      <div class="dept">Department of Computer Application</div>
      <div class="assign-type">${data.assignmentType}</div>
      <div class="subj-block"><div class="subj-name">${data.subject}</div><div class="subj-code">Code: ${data.courseCode}</div></div>
      <div class="info-grid">
        <div class="info-card"><div class="info-lbl">Student</div><div class="info-val">${data.studentName}</div></div>
        <div class="info-card"><div class="info-lbl">University Roll</div><div class="info-val">${data.rollNumber}</div></div>
        <div class="info-card"><div class="info-lbl">Class Roll</div><div class="info-val">${data.classRoll}</div></div>
        <div class="info-card"><div class="info-lbl">Semester</div><div class="info-val">${data.semester}</div></div>
        <div class="info-card"><div class="info-lbl">Date</div><div class="info-val">${formatDate(data.submissionDate)}</div></div>
      </div>
      <div class="sig-row">
        <div class="sig-item"><div class="sig-dash"></div><div class="sig-text">Date</div></div>
        <div class="sig-item"><div class="sig-dash"></div><div class="sig-text">Signature</div></div>
      </div>
    </div>
  </body></html>`;
}

// ── Template: Academic (NEW) ───────────────────────────
function generateAcademicTemplate(data) {
  return `<!DOCTYPE html><html><head><style>
    @page { size: A4; margin: 0; }
    @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Source+Sans+3:wght@400;600&display=swap');
    body { font-family: 'Source Sans 3', sans-serif; width: 210mm; min-height: 297mm; margin: 0 auto; padding: 20mm; box-sizing: border-box; background: #fff; position: relative; }
    body::before { content: ''; position: absolute; inset: 8mm; border: 3px double ${data.themeColor}; pointer-events: none; }
    .header { text-align: center; padding-bottom: 10mm; border-bottom: 2px solid ${data.themeColor}; margin-bottom: 10mm; }
    .crest { width: 80px; margin: 0 auto 8mm; display: block; }
    .uni { font-family: 'Merriweather', serif; font-size: 26px; color: ${data.themeColor}; font-weight: 700; }
    .dept { font-size: 18px; color: #555; margin-top: 4px; }
    .program { font-size: 15px; color: ${data.themeColor}; margin-top: 8px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; }
    .divider { width: 60%; margin: 8mm auto; height: 1px; background: linear-gradient(90deg, transparent, ${data.themeColor}50, transparent); }
    .title-block { text-align: center; margin: 10mm 0; }
    .type { font-family: 'Merriweather', serif; font-size: 30px; color: ${data.themeColor}; font-weight: 700; margin-bottom: 8px; }
    .subj { font-size: 22px; font-weight: 600; color: #333; }
    .code { font-size: 16px; color: #666; margin-top: 5px; }
    .submitted { text-align: center; font-size: 14px; color: ${data.themeColor}; text-transform: uppercase; letter-spacing: 3px; margin: 12mm 0 5mm; font-weight: 600; }
    .details { width: 70%; margin: 0 auto; }
    .d-row { display: flex; padding: 10px 0; border-bottom: 1px solid #eee; font-size: 16px; }
    .d-lbl { width: 45%; font-weight: 600; color: #444; }
    .d-val { width: 55%; color: #222; }
    .footer-area { margin-top: 25mm; display: flex; justify-content: space-between; padding: 0 10mm; }
    .f-box { text-align: center; width: 150px; }
    .f-line { border-bottom: 1.5px solid ${data.themeColor}; margin-bottom: 6px; }
    .f-lbl { font-size: 13px; color: ${data.themeColor}; font-weight: 600; }
  </style></head><body>
    <div class="header">
      <img src="https://i1.wp.com/www.winmeen.com/wp-content/uploads/2017/04/VBU-New-Logo.png?ssl=1" class="crest" alt="Crest">
      <div class="uni">Vinoba Bhave University</div>
      <div class="dept">Department of Computer Application</div>
      <div class="program">Bachelor of Computer Applications</div>
    </div>
    <div class="divider"></div>
    <div class="title-block">
      <div class="type">${data.assignmentType}</div>
      <div class="subj">${data.subject}</div>
      <div class="code">Course Code: ${data.courseCode}</div>
    </div>
    <div class="divider"></div>
    <div class="submitted">Submitted By</div>
    <div class="details">
      <div class="d-row"><div class="d-lbl">Student Name</div><div class="d-val">${data.studentName}</div></div>
      <div class="d-row"><div class="d-lbl">University Roll No.</div><div class="d-val">${data.rollNumber}</div></div>
      <div class="d-row"><div class="d-lbl">Class Roll No.</div><div class="d-val">${data.classRoll}</div></div>
      <div class="d-row"><div class="d-lbl">Semester</div><div class="d-val">${data.semester} Semester</div></div>
      <div class="d-row"><div class="d-lbl">Submission Date</div><div class="d-val">${formatDate(data.submissionDate)}</div></div>
    </div>
    <div class="footer-area">
      <div class="f-box"><div class="f-line"></div><div class="f-lbl">Date</div></div>
      <div class="f-box"><div class="f-line"></div><div class="f-lbl">Student's Signature</div></div>
    </div>
  </body></html>`;
}

// ── Validation ─────────────────────────────────────────
function validateForm() {
  const form = document.getElementById('coverForm');
  const inputs = form.querySelectorAll('input, select');
  let isValid = true;
  inputs.forEach(input => {
    const err = input.parentNode.querySelector('.error-message');
    if (err) err.remove();
    if (input.hasAttribute('required') && !input.value.trim()) {
      isValid = false;
      input.classList.add('invalid');
      const msg = document.createElement('div');
      msg.className = 'error-message';
      const label = input.parentNode.querySelector('label');
      msg.textContent = `Please enter ${label ? label.textContent.trim() : 'this field'}`;
      input.insertAdjacentElement('afterend', msg);
    } else {
      input.classList.remove('invalid');
    }
  });
  return isValid;
}

// ── Button State ───────────────────────────────────────
function setButtonState(button, state, message = '') {
  button.disabled = state === 'loading';
  button.classList.remove('loading', 'success', 'error');
  if (state === 'loading') {
    button.classList.add('loading');
    button.dataset.originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner"></i>';
  } else if (state === 'success') {
    button.classList.add('success');
    showNotification(message || 'Done!', 'success');
    setTimeout(() => button.classList.remove('success'), 2000);
  } else if (state === 'error') {
    showNotification(message || 'An error occurred', 'error');
  } else if (state === 'reset' && button.dataset.originalText) {
    button.innerHTML = button.dataset.originalText;
  }
}

// ── Download PDF ───────────────────────────────────────
async function downloadPDF() {
  const button = document.querySelector('.btn-pdf');
  try {
    setButtonState(button, 'loading');
    updateProgress(0);
    const frame = document.getElementById('previewFrame');
    const canvas = await html2canvas(frame.contentDocument.body, { scale: 2, useCORS: true, allowTaint: true, logging: false });
    updateProgress(50);
    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
    pdf.save('assignment-cover.pdf');
    setButtonState(button, 'success', 'PDF downloaded!');
    updateProgress(100);
  } catch (error) {
    console.error('PDF error:', error);
    setButtonState(button, 'error', 'Error generating PDF');
  } finally {
    setTimeout(() => setButtonState(button, 'reset'), 2000);
  }
}

// ── Download JPG ───────────────────────────────────────
async function downloadJPG() {
  const button = document.querySelector('.btn-jpg');
  try {
    setButtonState(button, 'loading');
    const frame = document.getElementById('previewFrame');
    const canvas = await html2canvas(frame.contentDocument.body, { scale: 2, useCORS: true });
    const link = document.createElement('a');
    link.download = 'assignment-cover.jpg';
    link.href = canvas.toDataURL('image/jpeg', 1.0);
    link.click();
    setButtonState(button, 'success', 'JPG downloaded!');
  } catch (error) {
    console.error('JPG error:', error);
    setButtonState(button, 'error', 'Error generating image');
  } finally {
    setTimeout(() => setButtonState(button, 'reset'), 2000);
  }
}

// ── Print ──────────────────────────────────────────────
function printCover() {
  const frame = document.getElementById('previewFrame');
  try { frame.contentWindow.print(); }
  catch (err) { showNotification('Unable to print', 'error'); }
}

// ── Save / Load ────────────────────────────────────────
function saveFormData() {
  const button = document.querySelector('.btn-save');
  try {
    if (button) setButtonState(button, 'loading');
    const formData = {
      studentName: document.getElementById('studentName').value,
      rollNumber: document.getElementById('rollNumber').value,
      classRoll: document.getElementById('classRoll').value,
      semester: document.getElementById('semester').value,
      subject: document.getElementById('subject').value,
      courseCode: document.getElementById('courseCode').value,
      submissionDate: document.getElementById('submissionDate').value,
      assignmentType: document.getElementById('assignmentType').value,
      themeColor: document.getElementById('themeColor').value,
      template: document.getElementById('template').value
    };
    localStorage.setItem('coverGeneratorData', JSON.stringify(formData));
    if (button) setButtonState(button, 'success', 'Data saved!');
  } catch (err) {
    if (button) setButtonState(button, 'error', 'Unable to save');
  } finally {
    if (button) setTimeout(() => setButtonState(button, 'reset'), 2000);
  }
}

function loadFormData() {
  const saved = localStorage.getItem('coverGeneratorData');
  if (saved) {
    const formData = JSON.parse(saved);
    Object.keys(formData).forEach(key => {
      const el = document.getElementById(key);
      if (el) el.value = formData[key];
    });
    // Sync template card
    if (formData.template) {
      document.querySelectorAll('.template-card').forEach(c => {
        c.classList.toggle('active', c.dataset.template === formData.template);
      });
    }
    // Sync color swatch
    if (formData.themeColor) {
      document.querySelectorAll('.color-swatch').forEach(s => {
        s.classList.toggle('active', s.dataset.color === formData.themeColor);
      });
    }
    generateCoverPage();
  }
}

// ── Notifications ──────────────────────────────────────
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.classList.add('show');
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 400);
    }, 3000);
  }, 10);
}

// ── Theme Toggle ───────────────────────────────────────
function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  const icon = document.getElementById('themeIcon');
  if (document.body.classList.contains('dark-theme')) {
    icon.classList.replace('fa-moon', 'fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    icon.classList.replace('fa-sun', 'fa-moon');
    localStorage.setItem('theme', 'light');
  }
}

// ── Font Size ──────────────────────────────────────────
function adjustFontSize(action) {
  const preview = document.getElementById('previewFrame').contentDocument.body;
  if (!preview) return;
  const currentSize = parseFloat(getComputedStyle(preview).fontSize);
  preview.style.fontSize = `${action === 'increase' ? currentSize * 1.1 : currentSize * 0.9}px`;
}

// ── Share ──────────────────────────────────────────────
function shareForm() {
  if (navigator.share) {
    navigator.share({ title: 'Assignment Cover Generator', text: 'Generate professional assignment covers easily!', url: window.location.href }).catch(() => fallbackShare());
  } else { fallbackShare(); }
}

function fallbackShare() {
  navigator.clipboard.writeText(window.location.href)
    .then(() => showNotification('Link copied!'))
    .catch(() => showNotification('Unable to copy link', 'error'));
}

// ── Reset ──────────────────────────────────────────────
function resetForm() {
  document.getElementById('coverForm').reset();
  document.querySelectorAll('.error-message').forEach(m => m.remove());
  document.querySelectorAll('.invalid').forEach(f => f.classList.remove('invalid'));
  document.getElementById('themeColor').value = '#1a237e';
  document.getElementById('template').value = 'classic';
  document.querySelectorAll('.template-card').forEach(c => c.classList.toggle('active', c.dataset.template === 'classic'));
  document.querySelectorAll('.color-swatch').forEach(s => s.classList.toggle('active', s.dataset.color === '#1a237e'));
  generateCoverPage();
  showNotification('Form reset!');
  try { localStorage.removeItem('coverGeneratorData'); } catch (e) {}
}

// ── Help ───────────────────────────────────────────────
function showHelp() {
  document.getElementById('helpModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function hideHelp() {
  document.getElementById('helpModal').classList.remove('active');
  document.body.style.overflow = 'auto';
}

document.getElementById('helpModal').addEventListener('click', function(e) {
  if (e.target === this) hideHelp();
});

// ── Welcome Modal ──────────────────────────────────────
function showWelcomeModal() {
  const modal = document.getElementById('welcomeModal');
  if (modal && !localStorage.getItem('dontShowWelcomeModal')) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function skipWelcome(savePref) {
  const modal = document.getElementById('welcomeModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    if (savePref && document.getElementById('dontShowAgain').checked) {
      localStorage.setItem('dontShowWelcomeModal', 'true');
    }
  }
}

function continueToGuide() {
  skipWelcome(true);
  showHelp();
}

document.getElementById('welcomeModal').addEventListener('click', function(e) {
  if (e.target === this) skipWelcome(false);
});

// ── Progress Bar ───────────────────────────────────────
function updateProgress(progress) {
  const bar = document.getElementById('progressBar');
  bar.style.width = `${progress}%`;
  if (progress === 100) setTimeout(() => { bar.style.width = '0'; }, 500);
}

// ── Loading Overlay ────────────────────────────────────
function showLoading() { document.querySelector('.loading-overlay').classList.add('active'); }
function hideLoading() { document.querySelector('.loading-overlay').classList.remove('active'); }

// ── Keyboard Shortcuts ─────────────────────────────────
const shortcuts = {
  submit: { key: 'Enter', ctrl: true, description: 'Generate Cover' },
  save: { key: 's', ctrl: true, description: 'Save Form Data' },
  load: { key: 'l', ctrl: true, description: 'Load Form Data' },
  theme: { key: 't', ctrl: true, description: 'Toggle Theme' },
  help: { key: 'h', ctrl: true, description: 'Show Help' },
  reset: { key: 'r', ctrl: true, description: 'Reset Form' },
  print: { key: 'p', ctrl: true, description: 'Print Cover' },
};

function initShortcuts() {
  const list = document.getElementById('shortcutList');
  if (list) {
    list.innerHTML = Object.entries(shortcuts).map(([, config]) =>
      `<div class="shortcut-item"><span>${config.description}</span><span class="shortcut-key">${config.ctrl ? 'Ctrl + ' : ''}${config.key.toUpperCase()}</span></div>`
    ).join('');
  }
}

document.addEventListener('keydown', (e) => {
  if (e.target.matches('input, textarea, select')) return;
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const mod = isMac ? e.metaKey : e.ctrlKey;
  for (const [action, config] of Object.entries(shortcuts)) {
    if (e.key.toLowerCase() === config.key.toLowerCase() && mod === config.ctrl) {
      e.preventDefault();
      switch (action) {
        case 'submit': document.getElementById('coverForm').dispatchEvent(new Event('submit')); break;
        case 'save': saveFormData(); break;
        case 'load': loadFormData(); break;
        case 'theme': toggleTheme(); break;
        case 'help': showHelp(); break;
        case 'reset': resetForm(); break;
        case 'print': printCover(); break;
      }
      break;
    }
  }
});

// Close modals with Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    hideHelp();
    const wm = document.getElementById('welcomeModal');
    if (wm && wm.classList.contains('active')) skipWelcome(false);
    document.getElementById('shortcutsModal').classList.remove('active');
  }
});

// ── Auto-save ──────────────────────────────────────────
let autoSaveInterval;
function startAutoSave() {
  if (autoSaveInterval) clearInterval(autoSaveInterval);
  autoSaveInterval = setInterval(() => {
    if (document.visibilityState === 'visible') {
      try { saveFormData(); } catch (e) { clearInterval(autoSaveInterval); }
    }
  }, 30000);
}

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') startAutoSave();
  else clearInterval(autoSaveInterval);
});

// ── Swipe to Switch Template ───────────────────────────
let touchStartX = 0;
document.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
document.addEventListener('touchend', e => {
  const diff = e.changedTouches[0].screenX - touchStartX;
  if (Math.abs(diff) > 50) switchTemplate(diff > 0 ? 'prev' : 'next');
}, { passive: true });

function switchTemplate(direction) {
  const templates = ['classic', 'modern', 'minimal', 'professional', 'elegant', 'creative', 'academic'];
  const current = document.getElementById('template').value;
  const idx = templates.indexOf(current);
  const newIdx = direction === 'next' ? (idx + 1) % templates.length : (idx - 1 + templates.length) % templates.length;
  document.getElementById('template').value = templates[newIdx];
  document.querySelectorAll('.template-card').forEach(c => c.classList.toggle('active', c.dataset.template === templates[newIdx]));
  generateCoverPage();
}

// Arrow keys for template switching
document.addEventListener('keydown', (e) => {
  if (e.target.matches('input, textarea, select')) return;
  if (e.key === 'ArrowLeft') switchTemplate('prev');
  else if (e.key === 'ArrowRight') switchTemplate('next');
});

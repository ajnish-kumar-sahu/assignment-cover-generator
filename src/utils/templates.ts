export interface CoverData {
  studentName: string;
  rollNumber: string;
  classRoll: string;
  semester: string;
  subject: string;
  courseCode: string;
  submissionDate: string;
  assignmentType: string;
  themeColor: string;
  template: string;
  universityName: string;
  department: string;
  logoUrl: string;
}

export function formatDate(dateString: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Global Tailwind injected into all iframe templates for robust styling
const HTML_HEAD = (themeHex: string) => `
  <meta charset="utf-8" />
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet"/>
  <script>
    tailwind.config = {
      theme: { extend: { 
        fontFamily: { 
          headline: ["Newsreader", "serif"], 
          body: ["Inter", "sans-serif"],
          elegant: ["Playfair Display", "serif"],
          modern: ["Space Grotesk", "sans-serif"]
        },
        colors: { brand: "${themeHex}" }
      }}
    }
  </script>
  <style>
    body { background: white; -webkit-print-color-adjust: exact; print-color-adjust: exact; overflow: hidden; margin: 0; padding: 0; }
    .theme-border { border-color: ${themeHex} !important; }
    .theme-text { color: ${themeHex} !important; }
    .theme-bg { background-color: ${themeHex} !important; }
    .theme-bg-light { background-color: ${themeHex}10 !important; }
    img { max-width: 100%; height: auto; }
  </style>
`;

export const generateCoverHTML = (data: CoverData): string => {
  switch (data.template) {
    case "modern": return generateModern(data);
    case "minimal": return generateMinimal(data);
    case "professional": return generateProfessional(data);
    case "elegant": return generateElegant(data);
    case "creative": return generateCreative(data);
    case "academic": return generateAcademic(data);
    case "classic":
    default: return generateClassic(data);
  }
};

const univ = (data: CoverData) => data.universityName || 'ScholarFlow University';
const dept = (data: CoverData) => data.department || 'Department of General Studies';
const renderLogo = (data: CoverData, fallbackImg: string = '') => {
  if (data.logoUrl) return `<img src="${data.logoUrl}" class="w-48 h-48 object-contain mx-auto mb-6" alt="University Logo" />`;
  return fallbackImg;
};

const generateClassic = (data: CoverData) => `<!DOCTYPE html><html>
<head>${HTML_HEAD(data.themeColor || '#1a237e')}</head>
<body class="w-[794px] h-[1123px] font-elegant relative box-border flex flex-col p-16">
  <div class="absolute inset-8 border-[12px] border-double theme-border opacity-60 z-0"></div>
  <div class="relative z-10 h-full flex flex-col items-center justify-between text-center">
    
    <div class="space-y-4">
      <h1 class="text-4xl font-bold uppercase tracking-widest text-slate-800">${univ(data)}</h1>
      <h2 class="text-xl italic text-slate-600 mb-4">${dept(data)}</h2>
      ${renderLogo(data, '')}
    </div>

    <div class="space-y-6 flex flex-col items-center w-full">
      <div class="px-8 py-3 theme-bg-light theme-text text-xl font-bold tracking-[0.2em] uppercase rounded-sm border theme-border border-opacity-20 inline-block">
        ${data.assignmentType || 'Assignment'}
      </div>
      <h3 class="text-5xl font-black leading-tight text-slate-900 mt-8 mb-4 max-w-[85%]">
        ${data.subject || 'Research Title'}
      </h3>
      <p class="text-lg font-medium text-slate-500">Course Reference: <span class="theme-text">${data.courseCode || 'N/A'}</span></p>
    </div>

    <div class="w-full max-w-[80%] mx-auto bg-slate-50 p-8 border theme-border border-opacity-30 flex flex-col items-center gap-4">
      <div class="text-2xl font-bold text-slate-800 mb-2 border-b theme-border border-opacity-30 pb-2 inline-block">Scholar Identification</div>
      <table class="w-full text-left text-lg">
        <tr class="h-10"><td class="font-bold text-slate-600 w-1/2 text-right pr-6">Full Name:</td><td class="theme-text font-bold pl-6">${data.studentName}</td></tr>
        <tr class="h-10"><td class="font-bold text-slate-600 text-right pr-6">University Roll:</td><td class="text-slate-800 pl-6">${data.rollNumber}</td></tr>
        <tr class="h-10"><td class="font-bold text-slate-600 text-right pr-6">Class Roll:</td><td class="text-slate-800 pl-6">${data.classRoll}</td></tr>
        <tr class="h-10"><td class="font-bold text-slate-600 text-right pr-6">Academic Trimester:</td><td class="text-slate-800 pl-6">${data.semester} Semester</td></tr>
      </table>
    </div>

    <div class="w-full flex justify-between items-end px-12 pt-16 mt-8">
      <div class="flex flex-col items-center w-48">
        <div class="w-full border-b border-slate-400 mb-2"></div>
        <span class="text-sm font-bold tracking-widest text-slate-500 uppercase">Date of Record</span>
        <span class="text-base font-medium text-slate-700 mt-1">${formatDate(data.submissionDate)}</span>
      </div>
      <div class="flex flex-col items-center w-48">
        <div class="w-full border-b border-slate-400 mb-2"></div>
        <span class="text-sm font-bold tracking-widest text-slate-500 uppercase">Official Signature</span>
      </div>
    </div>
  </div>
</body></html>`;

const generateModern = (data: CoverData) => `<!DOCTYPE html><html>
<head>${HTML_HEAD(data.themeColor || '#2563eb')}</head>
<body class="w-[794px] h-[1123px] font-modern bg-slate-50 box-border flex">
  <div class="w-[25%] theme-bg h-full p-8 flex flex-col justify-between text-white">
    <div class="font-black text-6xl opacity-20 tracking-tighter" style="writing-mode: vertical-rl; transform: rotate(180deg);">
      ${new Date(data.submissionDate || new Date()).getFullYear()}
    </div>
    <div class="space-y-4 pb-12">
      <div class="w-12 h-1 bg-white mb-8"></div>
      <p class="text-xs font-bold uppercase tracking-widest opacity-80">Course</p>
      <p class="text-lg font-bold">${data.courseCode}</p>
      <div class="h-8"></div>
      <p class="text-xs font-bold uppercase tracking-widest opacity-80">Type</p>
      <p class="text-lg font-bold">${data.assignmentType}</p>
    </div>
  </div>
  <div class="w-[75%] h-full bg-white p-14 flex flex-col justify-between shadow-[-20px_0_40px_rgba(0,0,0,0.05)] z-10 relative">
    <div class="space-y-4 text-right opacity-80">
      <p class="font-bold uppercase tracking-widest text-lg">${univ(data)}</p>
      <p class="text-sm mb-6">${dept(data)}</p>
      ${data.logoUrl ? `<img src="${data.logoUrl}" class="w-32 h-32 ml-auto object-contain" />` : ''}
    </div>
    <div class="space-y-8 mt-16 flex-1">
      <h1 class="text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">${data.subject}</h1>
    </div>
    <div class="bg-slate-50 p-8 rounded-2xl border border-slate-100 mb-12 relative overflow-hidden">
       <div class="absolute right-0 top-0 w-32 h-32 theme-bg opacity-5 rounded-bl-[100px]"></div>
       <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6">Prepared By</p>
       <h2 class="text-3xl font-bold theme-text mb-6">${data.studentName}</h2>
       <div class="grid grid-cols-2 gap-y-6 gap-x-4">
         <div>
           <p class="text-[9px] font-bold uppercase tracking-widest text-slate-400">Semester</p>
           <p class="font-bold text-slate-700 mt-1">${data.semester}</p>
         </div>
         <div>
           <p class="text-[9px] font-bold uppercase tracking-widest text-slate-400">Class Roll</p>
           <p class="font-bold text-slate-700 mt-1">${data.classRoll}</p>
         </div>
         <div class="col-span-2">
           <p class="text-[9px] font-bold uppercase tracking-widest text-slate-400">University Identification</p>
           <p class="font-mono font-bold text-slate-700 mt-1 tracking-wider">${data.rollNumber}</p>
         </div>
       </div>
    </div>
    <div class="flex justify-between items-end border-t border-slate-100 pt-8">
      <div>
        <p class="text-[9px] font-bold uppercase tracking-widest text-slate-400">Submission Date</p>
        <p class="font-bold text-slate-900 mt-1">${formatDate(data.submissionDate)}</p>
      </div>
      <div class="text-right">
        <div class="w-32 border-b-2 border-slate-300 mb-2"></div>
        <p class="text-[9px] font-bold uppercase tracking-widest text-slate-400">Instructor Signature</p>
      </div>
    </div>
  </div>
</body></html>`;

const generateMinimal = (data: CoverData) => `<!DOCTYPE html><html>
<head>${HTML_HEAD(data.themeColor || '#111827')}</head>
<body class="w-[794px] h-[1123px] font-body bg-white box-border flex flex-col p-20">
  <div class="w-16 h-16 rounded-full theme-bg mb-20 shadow-lg flex items-center justify-center">
    ${data.logoUrl ? `<img src="${data.logoUrl}" class="w-12 h-12 object-contain" />` : ''}
  </div>
  <div class="flex-1">
    <p class="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 mb-8">${data.assignmentType} &bull; ${data.courseCode}</p>
    <h1 class="text-5xl font-light text-slate-900 leading-tight max-w-[90%] mb-20 tracking-tight">${data.subject}</h1>
    
    <div class="space-y-8 pl-8 border-l-2 theme-border">
      <div>
        <h2 class="text-lg font-bold text-slate-900">${data.studentName}</h2>
        <p class="text-sm font-medium text-slate-500 mt-1">Roll: ${data.rollNumber} / Class: ${data.classRoll}</p>
      </div>
      <div>
        <h3 class="text-sm border border-slate-200 inline-block px-3 py-1 rounded-md text-slate-600 font-medium">${data.semester} Semester</h3>
      </div>
    </div>
  </div>
  
  <div class="flex justify-between items-end border-t border-slate-100 pt-10">
    <div class="w-1/2">
      <p class="text-sm text-slate-400 leading-relaxed font-medium">${univ(data)}<br/>${dept(data)}</p>
    </div>
    <div class="text-right">
      <p class="text-sm font-bold text-slate-900">${formatDate(data.submissionDate)}</p>
      <p class="text-xs font-bold tracking-widest uppercase text-slate-400 mt-1">Submitted</p>
    </div>
  </div>
</body></html>`;

const generateProfessional = (data: CoverData) => `<!DOCTYPE html><html>
<head>${HTML_HEAD(data.themeColor || '#0f172a')}</head>
<body class="w-[794px] h-[1123px] font-body bg-[#f8fafc] box-border p-12">
  <div class="w-full h-full bg-white border border-slate-200 shadow-xl flex flex-col items-center pt-24 pb-16 relative overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-3 theme-bg"></div>
    
    <div class="text-center space-y-2 mb-16 px-16">
      <h2 class="font-headline text-3xl font-bold text-slate-800 uppercase tracking-wide">${univ(data)}</h2>
      <h3 class="text-slate-500 font-medium tracking-widest uppercase text-sm mb-6">${dept(data)}</h3>
      ${renderLogo(data, '')}
    </div>

    <div class="w-full theme-bg-light py-10 px-16 text-center border-y border-slate-100 mb-16">
      <div class="inline-block px-4 py-1.5 bg-white border theme-border border-opacity-20 rounded-full text-xs font-bold tracking-widest uppercase theme-text mb-6 inline-flex items-center gap-2 shadow-sm"><span class="w-2 h-2 rounded-full theme-bg inline-block"></span> ${data.assignmentType}</div>
      <h1 class="font-headline text-4xl font-extrabold text-slate-900 leading-[1.2] mb-6 max-w-2xl mx-auto">${data.subject}</h1>
      <p class="text-sm font-bold tracking-widest uppercase text-slate-400">Course Code <span class="text-slate-700 ml-2">${data.courseCode}</span></p>
    </div>

    <div class="grid grid-cols-2 gap-12 w-full px-24">
      <div class="space-y-6">
        <h4 class="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-200 pb-2">Student Profile</h4>
        <div class="space-y-4">
          <div><p class="text-xs text-slate-500 font-medium">Full Legal Name</p><p class="font-bold text-lg text-slate-800">${data.studentName}</p></div>
          <div><p class="text-xs text-slate-500 font-medium">University Reg. No.</p><p class="font-mono text-slate-800 font-semibold">${data.rollNumber}</p></div>
        </div>
      </div>
      <div class="space-y-6">
        <h4 class="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-200 pb-2">Academic Details</h4>
        <div class="space-y-4">
          <div><p class="text-xs text-slate-500 font-medium">Academic Trimester</p><p class="font-bold text-lg text-slate-800">${data.semester} Semester</p></div>
          <div><p class="text-xs text-slate-500 font-medium">Internal Serial</p><p class="font-mono text-slate-800 font-semibold">${data.classRoll}</p></div>
        </div>
      </div>
    </div>

    <div class="flex-1"></div>
    
    <div class="flex justify-between items-end w-full px-24">
      <div>
         <p class="text-xs text-slate-500 font-medium mb-1">Date of Submission</p>
         <p class="font-bold text-slate-800">${formatDate(data.submissionDate)}</p>
      </div>
      <div class="text-center">
         <div class="w-48 border-b-2 border-slate-800 mb-2"></div>
         <p class="text-xs font-bold uppercase tracking-widest text-slate-500">Student Signature</p>
      </div>
    </div>
  </div>
</body></html>`;

const generateElegant = (data: CoverData) => `<!DOCTYPE html><html>
<head>${HTML_HEAD(data.themeColor || '#4c1d95')}</head>
<body class="w-[794px] h-[1123px] font-headline bg-[#FCFBF8] box-border p-8">
  <div class="w-full h-full border-[1px] theme-border relative p-12 flex flex-col items-center text-center">
    <div class="absolute inset-4 border-[1px] theme-border opacity-30 pointer-events-none"></div>
    <div class="absolute inset-5 border-[1px] border-dashed theme-border opacity-20 pointer-events-none"></div>
    
    <div class="space-y-2 mb-8">
      <h2 class="text-3xl font-elegant italic theme-text font-medium">${univ(data)}</h2>
      <p class="text-sm tracking-[0.2em] uppercase font-body text-slate-500 font-medium">${dept(data)}</p>
    </div>

    <div class="mb-4">
      ${data.logoUrl ? `<img src="${data.logoUrl}" class="w-32 h-32 mx-auto object-contain" />` : `<svg class="w-16 h-16 mx-auto theme-text opacity-80" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`}
    </div>

    <p class="text-xs font-body font-bold tracking-[0.3em] uppercase text-slate-400 mb-6">${data.assignmentType}</p>
    <h1 class="text-5xl font-elegant italic text-slate-900 leading-snug mb-8 px-12">${data.subject}</h1>
    <div class="w-16 h-[1px] theme-bg mx-auto opacity-50 mb-6"></div>
    <p class="font-body text-sm font-bold tracking-widest uppercase text-slate-500">Course: ${data.courseCode}</p>

    <div class="flex-1"></div>

    <div class="w-full max-w-lg mb-20 font-body text-sm flex flex-col gap-6">
      <div class="flex justify-between items-end border-b border-slate-200 pb-2">
        <span class="font-bold uppercase tracking-widest text-slate-400 text-xs">Authored By</span>
        <span class="font-elegant italic text-2xl text-slate-900">${data.studentName}</span>
      </div>
      <div class="flex justify-between items-end border-b border-slate-200 pb-2">
        <span class="font-bold uppercase tracking-widest text-slate-400 text-xs">Credentials</span>
        <span class="font-medium text-slate-700 text-base">Roll: ${data.rollNumber} / Cls: ${data.classRoll}</span>
      </div>
      <div class="flex justify-between items-end border-b border-slate-200 pb-2">
        <span class="font-bold uppercase tracking-widest text-slate-400 text-xs">Term</span>
        <span class="font-medium text-slate-700 text-base">${data.semester} Semester</span>
      </div>
    </div>

    <div class="w-full flex justify-between px-16 font-body">
      <div class="text-left">
        <p class="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1">Date Honored</p>
        <p class="theme-text font-serif italic text-lg">${formatDate(data.submissionDate)}</p>
      </div>
      <div class="text-right">
        <div class="w-40 border-b border-slate-300 mb-2"></div>
        <p class="text-[10px] font-bold tracking-widest uppercase text-slate-400">Signet</p>
      </div>
    </div>
  </div>
</body></html>`;

const generateCreative = (data: CoverData) => `<!DOCTYPE html><html>
<head>${HTML_HEAD(data.themeColor || '#db2777')}</head>
<body class="w-[794px] h-[1123px] font-modern bg-white box-border relative overflow-hidden">
  <div class="absolute -top-40 -left-40 w-[400px] h-[400px] rounded-full theme-bg opacity-10 filter blur-[80px]"></div>
  <div class="absolute bottom-20 -right-20 w-[300px] h-[300px] rounded-full theme-bg opacity-10 filter blur-[60px]"></div>
  <div class="absolute top-0 right-0 w-32 h-full theme-bg-light"></div>
  
  <div class="w-full h-full relative z-10 p-20 flex flex-col">
    <div class="flex gap-4 items-center mb-24">
      ${data.logoUrl ? `<img src="${data.logoUrl}" class="w-24 h-24 rounded-2xl object-contain bg-white/50 p-2 shadow-sm" />` : `<div class="w-16 h-16 rounded-full theme-bg text-white flex items-center justify-center font-black text-2xl italic shadow-xl">${univ(data)[0] || 'V'}</div>`}
      <div>
        <h2 class="font-bold text-slate-900 tracking-tighter text-2xl">${univ(data)}</h2>
        <h3 class="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">${dept(data)}</h3>
      </div>
    </div>

    <div class="relative mb-20">
      <div class="absolute -left-10 top-2 text-8xl font-black theme-text opacity-10 rotate-90 origin-left select-none">${data.courseCode}</div>
      <div class="inline-block px-4 py-1.5 rounded-full border border-slate-200 text-xs font-bold uppercase tracking-widest text-slate-500 mb-6 bg-white shadow-sm">${data.assignmentType}</div>
      <h1 class="text-6xl font-black text-slate-900 leading-[1.05] tracking-tight">${data.subject}</h1>
    </div>

    <div class="grid grid-cols-2 gap-10 mt-auto bg-white/60 backdrop-blur-3xl p-10 rounded-3xl border border-white/50 shadow-2xl relative">
       <div class="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1/2 theme-bg rounded-r-full"></div>
       
       <div>
         <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Author / Researcher</p>
         <p class="text-2xl font-black text-slate-800">${data.studentName}</p>
       </div>
       <div class="text-right">
         <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Timeline</p>
         <p class="text-lg font-bold text-slate-700 mt-1">${formatDate(data.submissionDate)}</p>
       </div>
       <div>
         <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Registration Data</p>
         <p class="font-mono text-sm font-bold text-slate-600 bg-slate-100 inline-block px-3 py-1 rounded-md mt-1">${data.rollNumber} &bull; C${data.classRoll}</p>
       </div>
       <div class="text-right">
         <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Period</p>
         <p class="text-lg font-bold text-slate-700 mt-1">${data.semester} Term</p>
       </div>
    </div>
  </div>
</body></html>`;

const generateAcademic = (data: CoverData) => `<!DOCTYPE html><html>
<head>${HTML_HEAD(data.themeColor || '#0284c7')}</head>
<body class="w-[794px] h-[1123px] font-headline bg-white box-border p-16 relative">
  <div class="absolute top-0 left-0 w-full h-4 theme-bg"></div>
  <div class="w-full h-full flex flex-col pt-10">
    
    <div class="text-center border-b-[3px] theme-border pb-12 mb-12 relative flex flex-col items-center">
      <h1 class="text-5xl font-black uppercase tracking-widest text-slate-900 mb-4">${univ(data)}</h1>
      <h2 class="text-2xl font-bold tracking-widest text-slate-600 uppercase mb-10">${dept(data)}</h2>
      ${data.logoUrl ? `<img src="${data.logoUrl}" class="w-40 h-40 mx-auto object-contain" />` : `<div class="w-32 h-32 mx-auto theme-bg rounded-md text-white font-black text-6xl flex items-center justify-center shadow-md rotate-3">${univ(data)[0] || 'V'}</div>`}
    </div>

    <div class="text-center px-10 flex-1">
      <p class="font-body text-sm font-bold tracking-[0.2em] uppercase theme-text mb-2">${data.courseCode}</p>
      <div class="text-3xl italic font-bold text-slate-400 mb-10">${data.assignmentType}</div>
      <h3 class="text-5xl font-bold text-slate-900 leading-tight border-y border-slate-200 py-10 mt-4">${data.subject}</h3>
    </div>

    <div class="flex justify-between items-end">
       <div class="font-body space-y-3 w-[55%]">
         <div class="flex border-b border-slate-200 pb-2"><span class="w-1/3 font-bold text-slate-500 uppercase text-xs tracking-widest">Submitted By</span><span class="w-2/3 font-bold text-slate-900">${data.studentName}</span></div>
         <div class="flex border-b border-slate-200 pb-2"><span class="w-1/3 font-bold text-slate-500 uppercase text-xs tracking-widest">Univ. Roll</span><span class="w-2/3 font-bold text-slate-900">${data.rollNumber}</span></div>
         <div class="flex border-b border-slate-200 pb-2"><span class="w-1/3 font-bold text-slate-500 uppercase text-xs tracking-widest">Class Roll</span><span class="w-2/3 font-bold text-slate-900">${data.classRoll}</span></div>
         <div class="flex border-b border-slate-200 pb-2"><span class="w-1/3 font-bold text-slate-500 uppercase text-xs tracking-widest">Semester</span><span class="w-2/3 font-bold text-slate-900">${data.semester}</span></div>
       </div>
       <div class="font-body w-[40%] text-right bg-slate-50 p-6 rounded-xl border border-slate-200">
         <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Date of Submission</p>
         <p class="text-lg font-bold text-slate-800 mb-8">${formatDate(data.submissionDate)}</p>
         <div class="w-full border-b border-slate-400 mb-2"></div>
         <p class="text-[10px] font-bold uppercase tracking-widest text-slate-500 text-center">Faculty Signature</p>
       </div>
    </div>
  </div>
</body></html>`;

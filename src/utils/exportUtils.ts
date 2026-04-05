import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export async function downloadPDF(
  iframeRef: React.RefObject<HTMLIFrameElement | null>,
  filename: string = 'cover.pdf',
  onProgress?: (progress: number) => void
): Promise<boolean> {
  const frame = iframeRef.current;
  if (!frame || !frame.contentDocument) {
    throw new Error('Preview frame is not accessible.');
  }

  try {
    if (onProgress) onProgress(10);
    const canvas = await html2canvas(frame.contentDocument.body, {
      scale: 3,
      useCORS: true,
      backgroundColor: '#ffffff',
    });
    if (onProgress) onProgress(70);
    
    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
    if (onProgress) onProgress(90);
    pdf.save(filename);
    if (onProgress) onProgress(100);
    return true;
  } catch (error) {
    throw new Error('Failed to export PDF: ' + (error instanceof Error ? error.message : String(error)));
  }
}

export async function downloadJPG(
  iframeRef: React.RefObject<HTMLIFrameElement | null>,
  filename: string = 'cover.jpg'
): Promise<boolean> {
  const frame = iframeRef.current;
  if (!frame || !frame.contentDocument) {
    throw new Error('Preview frame is not accessible.');
  }

  try {
    const canvas = await html2canvas(frame.contentDocument.body, {
      scale: 3,
      useCORS: true,
      backgroundColor: '#ffffff',
    });
    
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/jpeg', 1.0);
    link.click();
    return true;
  } catch (error) {
    throw new Error('Failed to export JPG: ' + (error instanceof Error ? error.message : String(error)));
  }
}

export function printDocument(iframeRef: React.RefObject<HTMLIFrameElement | null>) {
  const frame = iframeRef.current;
  if (frame && frame.contentWindow) {
    try {
      frame.contentWindow.focus();
      frame.contentWindow.print();
    } catch (err) {
      console.error('Unable to print', err);
    }
  }
}

export async function printElement(elementRef: React.RefObject<HTMLElement | null>) {
  const element = elementRef.current;
  if (!element) return;
  
  try {
    const canvas = await html2canvas(element, { scale: 3, useCORS: true, backgroundColor: '#ffffff' });
    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      console.error('Popup blocked');
      return;
    }
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Document</title>
          <style>
            @page { size: auto; margin: 0mm; }
            body { margin: 0; padding: 20px; display: flex; justify-content: center; }
            img { max-width: 100%; height: auto; }
          </style>
        </head>
        <body>
          <img src="${imgData}" />
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.focus();
                window.print();
                setTimeout(function() { window.close(); }, 500);
              }, 250);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  } catch (err) {
    console.error('Unable to print element', err);
  }
}

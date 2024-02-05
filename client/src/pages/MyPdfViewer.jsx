import {Worker,Viewer  } from '@react-pdf-viewer/core';
function MyPdfViewer({
    pdfPath
}) {
  return (
    <div className='min-h-screen w-full'>
    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.7.570/build/pdf.worker.min.js`}>
    <Viewer fileUrl={pdfPath} />
  </Worker>
    </div>
  )
}

export default MyPdfViewer

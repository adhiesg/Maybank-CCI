const url = './test.pdf';

let pdfDoc = null,
  pageNum = 1,
  pageIsRendering = false,
  pageNumIsPending = null;

const scale = 1.25,
  // canvas = document.querySelector('#pdf-render'),
  canvasContainer = document.getElementById('holder');

const renderPage = (num) => {
  pageIsRendering = true;
  pdfDoc.getPage(num).then((page) => {
    const viewport = page.getViewport({ scale: scale });
    const wrapper = document.createElement('div');
    wrapper.className = 'canvas-wrapper';
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport,
    };

    wrapper.appendChild(canvas);
    canvasContainer.appendChild(wrapper);
    page.render(renderContext);
  });
};

const renderPages = (pdfDoc) => {
  for (let num = 1; num <= pdfDoc.numPages; num++) {
    pdfDoc.getPage(num).then(renderPage);
  }
};

pdfjsLib.getDocument(url).promise.then((pdfDoc_) => {
  pdfDoc = pdfDoc_;
  // document.querySelector('#page-count').textContent = pdfDoc.numPages;
  console.log(pdfDoc);

  // renderPages(pageNum);
  // renderPage(pageNum);
  for (let num = 1; num <= pdfDoc.numPages; num++) {
    pdfDoc.getPage(num).then(renderPage(num));
  }
});

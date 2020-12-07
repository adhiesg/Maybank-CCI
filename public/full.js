// const url = './test.pdf';

// PDF Location
let month = localStorage.getItem('month');
let year = localStorage.getItem('year')
const url = './' + month + year + '.pdf';

let pdfDoc = null,
  pageNum = 1,
  pageIsRendering = false,
  pageNumIsPending = null,
  scale = 1;

const canvasContainer = document.getElementById('holder');

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

const renderPages = () => {
  for (let num = 1; num <= pdfDoc.numPages; num++) {
    pdfDoc.getPage(num).then(renderPage(num));
  }
};

pdfjsLib.getDocument(url).promise.then((pdfDoc_) => {
  pdfDoc = pdfDoc_;
  // document.querySelector('#page-count').textContent = pdfDoc.numPages;
  console.log(pdfDoc);

  // renderPages(pageNum);
  // renderPage(pageNum);
  // for (let num = 1; num <= pdfDoc.numPages; num++) {
  //   pdfDoc.getPage(num).then(renderPage(num));
  // }
  renderPages();
});

// Zoom In
const zoomIn = () => {
  if (scale >= 5) {
    return;
  } else {
    scale = scale + 0.25;
    // queueRenderPage(pageNum);

    document.querySelectorAll('.canvas-wrapper').forEach((e) => e.remove());
    renderPages();
  }
};
document.querySelector('#zoom-in').addEventListener('click', zoomIn);

// Zoom Out
const zoomOut = () => {
  if (scale <= 1) {
    return;
  } else {
    scale = scale - 0.25;
    // queueRenderPage(pageNum);
    document.querySelectorAll('.canvas-wrapper').forEach((e) => e.remove());
    renderPages();
  }
};
document.querySelector('#zoom-out').addEventListener('click', zoomOut);

// PDF Location
let month = localStorage.getItem('month');
const url = './' + month + '20.pdf';
// const url = './test.pdf';

// The PDF Document itself
let pdfDoc = null,
  pageNum = 1,
  pageIsRendering = false,
  pageNumIsPending = null,
  scale = 1;

const canvas = document.querySelector('#pdf-render'),
  ctx = canvas.getContext('2d');

// Render Page Function
const renderPage = (num) => {
  pageIsRendering = true;

  // Get Page
  pdfDoc.getPage(num).then((page) => {
    // console.log(page);
    const viewport = page.getViewport({ scale: scale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderCtx = {
      canvasContext: ctx,
      viewport,
    };

    page.render(renderCtx).promise.then(() => {
      pageIsRendering = false;

      if (pageNumIsPending != null) {
        renderPage(pageNumIsPending);
        pageNumIsPending = null;
      }
    });

    // Print current page number
    document.querySelector('#page-num').textContent = num;
  });
};

// Check for pages rendering
const queueRenderPage = (num) => {
  if (pageIsRendering) {
    pageNumIsPending = num;
  } else {
    renderPage(num);
  }
};

// Next Page

const nextPage = () => {
  if (pageNum >= pdfDoc.numPages) {
    return;
  } else {
    pageNum++;
    queueRenderPage(pageNum);
  }
};
document.querySelector('#next').addEventListener('click', nextPage);

// Prev Page

const prevPage = () => {
  if (pageNum <= 1) {
    return;
  } else {
    pageNum--;
    queueRenderPage(pageNum);
  }
};
document.querySelector('#prev').addEventListener('click', prevPage);

// Get Document
pdfjsLib.getDocument(url).promise.then((pdfDoc_) => {
  pdfDoc = pdfDoc_;
  document.querySelector('#page-count').textContent = pdfDoc.numPages;
  console.log(pdfDoc);

  renderPage(pageNum);
});

// Zoom In
const zoomIn = () => {
  if (scale >= 5) {
    return;
  } else {
    scale = scale + 0.25;
    queueRenderPage(pageNum);
  }
};
document.querySelector('#zoom-in').addEventListener('click', zoomIn);

// Zoom Out
const zoomOut = () => {
  if (scale <= 1) {
    return;
  } else {
    scale = scale - 0.25;
    queueRenderPage(pageNum);
  }
};
document.querySelector('#zoom-out').addEventListener('click', zoomOut);

// let month = document.getElementById('#month');
// console.log(month.value);

(() => {
  let yOffset = 0;

  let acc = 0.1;
  let delayedYOffset = 0;
  let rafState;
  let rafId;

  const info = {
    heightNum: 5,
    scrollHeight: 0,
    objs: {
      container: document.querySelector('.canvas-section'),
      canvas: document.querySelector('.video-canvas'),
      context: document.querySelector('.video-canvas').getContext('2d'),
      videoImages: [],
    },
    values: {
      videoImageCount: 180,
      imageSequence: [0, 179],
    },
  };

  function calcValues(values) {
    let rv;
    const scrollRatio = yOffset / (info.scrollHeight - window.innerHeight);
    rv = scrollRatio * (values[1] - values[0]) + values[0];
    return rv;
  }

  function setCanvasImages() {
    let imgElem;
    for (let i = 0; i < info.values.videoImageCount; i++) {
      imgElem = new Image();
      imgElem.src = `./images/sea-${1 + i}.jpg`;
      info.objs.videoImages.push(imgElem);
    }
  }
  setCanvasImages();

  function playAnimation() {
    const objs = info.objs;
    const values = info.values;
    // let sequence = Math.round(calcValues(values.imageSequence, yOffset));
    // objs.context.drawImage(objs.videoImages[sequence], 0, 0);
  }

  function setLayout() {
    info.scrollHeight = info.heightNum * window.innerHeight;
    info.objs.container.style.height = `${info.scrollHeight}px`;
    const heightRatio = window.innerHeight / 2160;
    info.objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
  }

  function loop() {
    delayedYOffset = delayedYOffset + (yOffset - delayedYOffset) * acc;
    const objs = info.objs;
    const values = info.values;
    let sequence = Math.round(calcValues(values.imageSequence, yOffset));
    if (objs.videoImages[sequence]) {
      objs.context.drawImage(objs.videoImages[sequence], 0, 0);
    }

    rafId = requestAnimationFrame(loop);

    if (!Math.abs(yOffset - delayedYOffset) < 1) {
      cancelAnimationFrame(rafId);
      rafState = false;
    }
  }

  window.addEventListener('scroll', () => {
    yOffset = window.pageYOffset;
    playAnimation();

    if (!rafState) {
      rafId = requestAnimationFrame(loop);
      rafState = true;
    }
  });
  window.addEventListener('load', () => {
    setLayout();
    info.objs.context.drawImage(info.objs.videoImages[0], 0, 0);
  });
  window.addEventListener('resize', setLayout);
})();

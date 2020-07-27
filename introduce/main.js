(() => {
  let yOffset = 0;
  let prevScrollHeight = 0;
  let currentSection = 0;

  const sectionInfo = [
    {
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-0'),
        messageA: document.querySelector('#scroll-section-0 .main-message.a'),
        messageB: document.querySelector('#scroll-section-0 .main-message.b'),
        messageC: document.querySelector('#scroll-section-0 .main-message.c'),
        messageD: document.querySelector('#scroll-section-0 .main-message.d'),
        video: document.querySelector('.video-elem'),
      },
      values: {
        messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
        messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
        messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
        messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],

        messageA_translateY_in: [30, 0, { start: 0.1, end: 0.2 }],
        messageB_translateY_in: [30, 0, { start: 0.3, end: 0.4 }],
        messageC_translateY_in: [30, 0, { start: 0.5, end: 0.6 }],
        messageD_translateY_in: [30, 0, { start: 0.7, end: 0.8 }],

        messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
        messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
        messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
        messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],

        messageA_translateY_out: [0, -30, { start: 0.25, end: 0.3 }],
        messageB_translateY_out: [0, -30, { start: 0.45, end: 0.5 }],
        messageC_translateY_out: [0, -30, { start: 0.65, end: 0.7 }],
        messageD_translateY_out: [0, -30, { start: 0.85, end: 0.9 }],

        video_out: [1, 0, { start: 0.93, end: 0.99 }],
      },
    },
    {
      type: 'normal',
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-1'),
        posters: document.querySelector('.posters'),
      },
    },
  ];

  function setLayout() {
    for (let i = 0; i < sectionInfo.length; i++) {
      if (sectionInfo[i].type === 'sticky') {
        sectionInfo[i].scrollHeight = sectionInfo[i].heightNum * window.innerHeight;
      } else {
        sectionInfo[i].scrollHeight = window.innerHeight;
      }
      sectionInfo[i].objs.container.style.height = `${sectionInfo[i].scrollHeight}px`;
    }

    yOffset = window.pageYOffset;
    let totalScrollHeight = 0;
    for (let i = 0; i < sectionInfo.length; i++) {
      totalScrollHeight += sectionInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentSection = i;
        break;
      }
    }
    document.body.setAttribute('id', `show-section-${currentSection}`);

    const heightRatio = window.innerHeight / 1080;
    document.querySelector('#video-0').style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    sectionInfo[1].objs.posters.style.transform = `translate3d(0, -50%, 0)`;
    const title = document.querySelector('.title');
    // console.log(title.offsetHeight);
    // title.style.transform = `translate3d(-${title.offsetWidth}, -${title.offsetHeight}, 0)`;
  }

  function calcValues(values, currentYOffset) {
    let rv;

    const scrollHeight = sectionInfo[currentSection].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;
    if (values.length === 3) {
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;
      const partRatio = (currentYOffset - partScrollStart) / partScrollHeight;
      if (partRatio < 0) rv = values[0];
      else if (partRatio >= 0 && partRatio <= 1) rv = partRatio * (values[1] - values[0]) + values[0];
      else rv = values[1];
    } else {
      rv = scrollRatio * (values[1] - values[0]) + values[0];
    }

    return rv;
  }

  function playAnimation() {
    const objs = sectionInfo[currentSection].objs;
    const values = sectionInfo[currentSection].values;
    const currentYOffset = yOffset - prevScrollHeight;
    const scrollHeight = sectionInfo[currentSection].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    switch (currentSection) {
      case 0:
        objs.video.style.opacity = calcValues(values.video_out, currentYOffset);

        if (scrollRatio < 0.23) {
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
        } else {
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
        }
        if (scrollRatio < 0.43) {
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
        } else {
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
        }
        if (scrollRatio < 0.63) {
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
        } else {
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
        }
        if (scrollRatio < 0.83) {
          objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
          objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
        } else {
          objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
          objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
        }

        break;
      case 1:
        break;
    }
  }

  function scrollLoop() {
    prevScrollHeight = 0;
    // console.log(yOffset);
    for (let i = 0; i < currentSection; i++) {
      prevScrollHeight += sectionInfo[i].scrollHeight;
    }
    // console.log(currentSection, yOffset);

    if (yOffset + 2 > prevScrollHeight + sectionInfo[currentSection].scrollHeight) {
      currentSection++;
      document.body.setAttribute('id', `show-section-${currentSection}`);
    }
    if (yOffset < prevScrollHeight) {
      currentSection--;
      document.body.setAttribute('id', `show-section-${currentSection}`);
    }

    playAnimation();
  }

  window.addEventListener('load', () => {
    setLayout();
    let tempYOffset = yOffset;
    let tempScrollCount = 0;
    let siId = setInterval(() => {
      tempYOffset += 3;
      window.scrollTo(0, tempYOffset);
      tempYOffset -= 3;
      if (tempScrollCount > 5) {
        clearInterval(siId);
      }
      tempScrollCount++;
    }, 10);
    document.body.classList.remove('before-load');
    document.body.removeChild(document.querySelector('.loading'));

    window.addEventListener('scroll', () => {
      yOffset = window.pageYOffset;
      scrollLoop();
    });

    window.addEventListener('resize', () => {
      setLayout();
    });
  });
})();

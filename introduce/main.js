(() => {
  let yOffset = 0;
  let prevScrollHeight = 0;
  let currentSection = 0;

  const sectionInfo = [
    {
      type: 'sticky',
      heightNum: 3,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-0'),
        messageA: document.querySelector('#scroll-section-0 .main-message.a'),
        messageB: document.querySelector('#scroll-section-0 .main-message.b'),
        messageC: document.querySelector('#scroll-section-0 .main-message.c'),
        messageD: document.querySelector('#scroll-section-0 .main-message.d'),
      },
      values: {
        messageA_opadity_in: [0, 1, { start: 0.1, end: 0.2 }],
        messageB_opadity_in: [0, 1, { start: 0.3, end: 0.4 }],
        messageC_opadity_in: [0, 1, { start: 0.5, end: 0.6 }],
        messageD_opadity_in: [0, 1, { start: 0.7, end: 0.8 }],

        messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
        messageA_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
        messageA_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
        messageA_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],

        messageA_opadity_out: [1, 0, { start: 0.25, end: 0.3 }],
        messageB_opadity_out: [1, 0, { start: 0.45, end: 0.5 }],
        messageC_opadity_out: [1, 0, { start: 0.65, end: 0.7 }],
        messageD_opadity_out: [1, 0, { start: 0.85, end: 0.9 }],

        messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
        messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
        messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
        messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
      },
    },
    {
      type: 'normal',
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-1'),
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
  }

  function scrollLoop() {
    prevScrollHeight = 0;
    console.log(yOffset);
    for (let i = 0; i < currentSection; i++) {
      prevScrollHeight += sectionInfo[i].scrollHeight;
    }

    if (yOffset + window.innerHeight > prevScrollHeight + sectionInfo[currentSection].scrollHeight) {
      currentSection++;
      document.body.setAttribute('id', `show-section-${currentSection}`);
    }
    if (yOffset + window.innerHeight < prevScrollHeight) {
      currentSection--;
      document.body.setAttribute('id', `show-section-${currentSection}`);
    }
    console.log(currentSection);
  }

  window.addEventListener('load', () => {
    setLayout();

    window.addEventListener('scroll', () => {
      yOffset = window.pageYOffset;
      scrollLoop();
    });

    window.addEventListener('resize', () => {
      setLayout();
    });
  });
})();

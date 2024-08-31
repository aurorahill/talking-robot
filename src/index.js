import './sass/index.scss';
const box = document.querySelector('.typing');
const text = [
  'Hello! I am a small robot. ^I was created by Kasia.',
  'She is learning a lot because she wants to become a frontend developer. ^Kasia started learning HTML, CSS and bootstrap but it was not enough to create beautiful websites.',
  'That is why Kasia started her adventure with Java Script.  ^ It is not an easy thing to do, so she is learning all the time and looking for new solutions for her ideas.',
  'Kasia knows that there is a lot of work ahead of her, but she really likes what she is doing and she would like to develop further in this direction.',
  'Kasia enjoys learning new things and is persistent in her goals. ^Maybe you would like to help her learn how to create effective and impressive websites? ^She would be very grateful!',
];
let wordIndex = 0;
let textIndex = 0;
let oldTime = 0;
let speed = 70; //czym wieksza wartosc tym wolniejszy typing
const stop = 2000; //przerwa między paragrafami
let activeDOMElement = box;
let shouldStopBars = false;

const barsTimeline = new TimelineMax({ repeat: -1 });

const bars = () => {
  const tl = barsTimeline;

  const scale = () => {
    return 0.1 + Math.random() * 2.7;
  };
  const color = () => {
    const colors = ['green', 'red', 'yellow'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const barsElements = document.querySelectorAll('#voice-bars > *');
  tl.set(barsElements, { y: -30, transformOrigin: '50% 50%' });
  tl.to(barsElements, 0.4, {
    scaleY: scale,
    fill: color,
    ease: Bounce.easeIn,
    stagger: { each: 0.1, repeat: 1, yoyo: true },
  });

  tl.eventCallback('onRepeat', () => {
    if (shouldStopBars) {
      tl.pause();
    }
  });

  return tl;
};

const blink = () => {
  const tl = new TimelineMax({ repeat: -1, repeatDelay: 3, delay: 2 });
  const eyes = document.querySelectorAll('#eye-left, #eye-right');
  tl.set(eyes, { transformOrigin: '50% 50%' });
  tl.to(eyes, 0.1, {
    scaleY: 0,
    fill: '#231f20',
  });
  tl.to(eyes, 0.05, {
    scaleY: 1,
    fill: '#48b3e6',
  });
  tl.to(
    eyes,
    0.11,
    {
      scaleY: 0,
      fill: '#231f20',
    },
    '+=0.5'
  );
  tl.to(eyes, 0.03, {
    scaleY: 1,
    fill: '#48b3e6',
  });
  tl.to(
    eyes,
    0.08,
    {
      scaleY: 0,
      fill: '#231f20',
    },
    '+=1.5'
  );
  tl.to(eyes, 0.08, {
    scaleY: 1,
    fill: '#48b3e6',
  });
  return tl;
};

const move = (legs) => {
  const tl = new TimelineMax();
  tl.to(legs, 0.5, {
    y: -60,
    ease: 'none',
    stagger: {
      repeat: -1,
      yoyo: true,
      each: 0.5,
    },
  });
  return tl;
};

const master = new TimelineMax();
master.add('start');
// master.add(bars(), 'start');
master.add(move(document.querySelectorAll('#leg-left, #leg-right')), 'start');
master.add(blink(), 'start');
bars();

const typing = (newTime) => {
  if (newTime - oldTime > speed) {
    const letter = text[textIndex].substr(wordIndex, 1);
    if (wordIndex === text[textIndex].length) {
      if (textIndex === text.length - 1) {
        shouldStopBars = true;
        return;
      }
      shouldStopBars = true;
      return setTimeout(() => {
        box.textContent = '';
        textIndex++;
        wordIndex = 0;
        shouldStopBars = false;
        barsTimeline.resume();
        requestAnimationFrame(typing);
      }, stop);
    } else if (wordIndex === 0 || letter === '^') {
      const p = document.createElement('p');
      box.appendChild(p);
      activeDOMElement = p;
    }

    if (!(letter === '^')) {
      activeDOMElement.textContent += letter;
    }

    oldTime = newTime;
    wordIndex++;
  }
  requestAnimationFrame(typing);
};

typing();

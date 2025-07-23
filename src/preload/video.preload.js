/* eslint-disable no-undef,no-param-reassign */
console.info('video.preload.js loaded');

const displayTypingEffect = (target, text) => {
  const typingEffect = document.createElement('div');
  typingEffect.className = 'typing-effect';
  typingEffect.textContent = text;
  target.parentElement.style.position = 'relative';
  typingEffect.style.top = `${target.offsetTop}px`;
  typingEffect.style.left = `${target.offsetLeft}px`;
  target.parentElement.append(typingEffect);

  typingEffect.addEventListener('animationend', () => {
    typingEffect.remove();
  });
};

const displayClickEffect = (event) => {
  const clickEffect = document.createElement('div');
  clickEffect.className = 'click-effect';
  clickEffect.style.left = `${event.clientX - 30}px`; // Center the effect
  clickEffect.style.top = `${event.clientY - 30}px`; // Center the effect
  document.body.append(clickEffect);

  // Remove the effect after the animation ends
  clickEffect.addEventListener('animationend', () => {
    clickEffect.remove();
  });
};

// eslint-disable-next-line unicorn/prefer-global-this
window.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.innerHTML = `
    .playwright-cursor {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      position: fixed;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 99999999;
      transition: transform 0.05s cubic-bezier(0.87, 0, 0.13, 1);
    }
    .click-effect {
      width: 60px;
      height: 60px;
      border: 2px solid rgba(0, 0, 0, 0.8);
      outline: 2px solid rgba(255, 255, 255, 0.8);
      border-radius: 50%;
      position: fixed;
      pointer-events: none;
      z-index: 99999999;
      top: 0;
      left: 0;
      animation: click-animation 0.4s ease-out;
    }
    .frame-updater {
      position: fixed;
      top: 10px;
      left: 10px;
      width: 2px;
      height: 2px;
      pointer-events: none;
      z-index: 99999999;
      background: red;
    }
    @keyframes click-animation {
      0% {
        transform: scale(1);
        opacity: 0.8;
      }
      100% {
        transform: scale(2);
        opacity: 0;
      }
    }
    .typing-effect {
      position: absolute;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      font-size: 12px;
      padding: 4px 8px;
      border-radius: 4px;
      pointer-events: none;
      z-index: 99999999;
      transform: translateY(-150%);
      animation: text-animation 1s ease-out;
    }
    @keyframes text-animation {
      0% {
        transform: scale(1);
        opacity: 0.8;
      }
      100% {
        transform: scale(2);
        opacity: 0;
      }
    }
  `;
  document.head.append(style);

  const cursor = document.createElement('div');
  cursor.innerHTML = `
    <?xml version="1.0" encoding="utf-8"?>
    <!-- Generator: Adobe Illustrator 18.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    \t viewBox="0 0 28 28" enable-background="new 0 0 28 28" xml:space="preserve">
      <polygon fill="#FFFFFF" points="8.2,20.9 8.2,4.9 19.8,16.5 13,16.5 12.6,16.6 "/>
      <polygon fill="#FFFFFF" points="17.3,21.6 13.7,23.1 9,12 12.7,10.5 "/>
      <rect x="12.5" y="13.6" transform="matrix(0.9221 -0.3871 0.3871 0.9221 -5.7605 6.5909)" width="2" height="8"/>
      <polygon points="9.2,7.3 9.2,18.5 12.2,15.6 12.6,15.5 17.4,15.5 "/>
    </svg>
  `;
  cursor.className = 'playwright-cursor';
  document.body.append(cursor);

  const frameUpdater = document.createElement('div');
  frameUpdater.className = 'frame-updater';
  document.body.append(frameUpdater);

  // We need to constantly move the frameUpdater to the current scroll position
  setInterval(() => {
    frameUpdater.style.transform = `translate(${Math.random() * 5}px, ${Math.random() * 5}px)`;
  }, 30);

  document.addEventListener('mousemove', (event) => {
    cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
  });

  document.addEventListener('click', (event) => {
    displayClickEffect(event);
  });

  document.addEventListener('input', (event) => {
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
      const typedText = event.target.value;
      if (typedText.length > 0) {
        displayTypingEffect(event.target, 'Typing...');
      }
    }
  });
});

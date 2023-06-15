const container = document.createElement('div');

const iframeContainer = document.createElement('div');
iframeContainer.style.display = 'none';
iframeContainer.id = 'my-iframeContainer';
iframeContainer.style.border = 'none';
iframeContainer.style.position = 'fixed';
iframeContainer.style.width = '425px';
iframeContainer.style.height = '70%';
iframeContainer.style.borderRadius = '0.75rem';
iframeContainer.style.zIndex = '999999998';
iframeContainer.style.transition = 'all 0.5s ease-in-out';
iframeContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';

const iframe = document.createElement('iframe');
const currentScript = document.currentScript;
const chatbotId = currentScript.getAttribute('data-chatbot-id');
iframe.src = `https://leadqualifier.koretex.ai/?chatbotId=${chatbotId}`;
iframe.style.width = '100%';
iframe.style.height = '100%';
iframe.style.border = 'none';
iframe.style.borderRadius = '0.75rem';

const bubble = document.createElement('img');
bubble.src = 'https://dashboard.koretex.ai/bubble.svg';
bubble.style.width = '50px';
bubble.style.height = '50px';
bubble.style.borderRadius = '100%';
bubble.style.animation = 'pulsate 1s infinite';

const keyframes = `@keyframes pulsate {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}`;

const bubbleStyle = document.createElement('style');
bubbleStyle.appendChild(document.createTextNode(keyframes));
const bubbleBUtton = document.createElement('button');

bubbleBUtton.style.border = 'none';
bubbleBUtton.style.position = 'fixed';
bubbleBUtton.style.flexDirection = 'column';
bubbleBUtton.style.justifyContent = 'space-between';
bubbleBUtton.style.bottom = '2rem';
bubbleBUtton.style.right = '30px';
bubbleBUtton.style.background = 'transparent';
bubbleBUtton.style.borderRadius = '0.75rem';
bubbleBUtton.style.display = 'flex';
bubbleBUtton.style.zIndex = '999999997';
bubbleBUtton.style.overflow = 'hidden';
bubbleBUtton.style.left = 'unset';
bubbleBUtton.style.cursor = 'pointer';
bubbleBUtton.style.borderRadius = '100%';

const xMark = document.createElement('div');
xMark.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
</svg>
`;
xMark.style.position = 'absolute';
xMark.style.width = '28px';
xMark.style.height = '28x';
xMark.style.top = '10px';
xMark.style.right = '12px';
xMark.style.zIndex = '999999999';
xMark.style.color = '#fff';
xMark.style.cursor = 'pointer';
xMark.style.display = 'none';

xMark.addEventListener('click', () => {
  xMark.style.display = xMark.style.display === 'none' ? 'block' : 'none';
  iframeContainer.style.display =
    iframeContainer.style.display === 'none' ? 'block' : 'none';
});

bubbleBUtton.addEventListener('click', () => {
  xMark.style.display = xMark.style.display === 'none' ? 'block' : 'none';
  iframeContainer.style.display =
    iframeContainer.style.display === 'none' ? 'block' : 'none';
});

function updateIframeWidth() {
  if (window.innerWidth < 525) {
    console.log(window.innerWidth);
    iframeContainer.style.width = '100%';
    iframeContainer.style.height = 'calc((var(--vh, 1vh) * 100) - 180px)';
    iframeContainer.style.left = '0rem';
    iframeContainer.style.bottom = '0rem';
  } else {
    iframeContainer.style.width = '425px';
    iframeContainer.style.height = '75%';
    iframeContainer.style.left = 'unset';
    iframeContainer.style.right = '25px';
    iframeContainer.style.bottom = '100px';
  }
}
window.addEventListener('resize', function () {
  document.documentElement.style.setProperty(
    '--vh',
    window.innerHeight * 0.01 + 'px',
  );
});

window.addEventListener('load', function () {
  document.documentElement.style.setProperty(
    '--vh',
    window.innerHeight * 0.01 + 'px',
  );
});
updateIframeWidth();
window.addEventListener('resize', updateIframeWidth);
iframeContainer.appendChild(xMark);
bubbleBUtton.appendChild(bubble);
iframeContainer.appendChild(iframe);
container.appendChild(bubbleBUtton);
container.appendChild(iframeContainer);
document.head.appendChild(bubbleStyle);
document.body.appendChild(container);

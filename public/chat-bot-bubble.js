const container = document.createElement('div');
const iframe = document.createElement('iframe');
const currentScript = document.currentScript;
const chatbotId = currentScript.getAttribute('data-chatbot-id');
iframe.src = `https://leadqualifier.koretex.ai/?chatbotId=${chatbotId}`;
iframe.style.display = 'none';
iframe.id = 'my-iframe';
iframe.style.border = 'none';
iframe.style.position = 'fixed';
iframe.style.flexDirection = 'column';
iframe.style.justifyContent = 'space-between';
iframe.style.bottom = '8rem';
iframe.style.right = '1rem';
iframe.style.width = '425px';
iframe.style.height = '75vh';
iframe.style.maxHeight = '824px';
iframe.style.borderRadius = '0.75rem';
iframe.style.zIndex = '999999998';
iframe.style.overflow = 'hidden';
iframe.style.left = 'unset';
iframe.style.transition = 'all 0.5s ease-in-out';
iframe.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';

const img = document.createElement('img');
img.src = 'https://dashboard.koretex.ai/bubble.svg';
img.style.width = '50px';
img.style.height = '50px';
img.style.borderRadius = '100%';
img.style.animation = 'pulsate 1s infinite';

const keyframes = `@keyframes pulsate {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}`;

const style = document.createElement('style');
style.appendChild(document.createTextNode(keyframes));
const button = document.createElement('button');

document.head.appendChild(style);

document.body.appendChild(img);

button.appendChild(img);
button.style.border = 'none';
button.style.position = 'fixed';
button.style.flexDirection = 'column';
button.style.justifyContent = 'space-between';
button.style.bottom = '2rem';
button.style.right = '1rem';
button.style.background = 'transparent';
button.style.borderRadius = '0.75rem';
button.style.display = 'flex';
button.style.zIndex = '999999997';
button.style.overflow = 'hidden';
button.style.left = 'unset';
button.style.cursor = 'pointer';
button.style.borderRadius = '100%';

const xMark = document.createElement('div');
xMark.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
</svg>
`;
xMark.style.fontSize = '40px';
xMark.style.fontWeight = 'bold';
xMark.style.marginTop = '6px';
xMark.style.marginRight = '6px';
xMark.style.position = 'absolute';
xMark.style.width = '32px';
xMark.style.height = '32px';
xMark.style.top = '10px';
xMark.style.right = '22px';
xMark.style.zIndex = '999999999';
xMark.style.color = '#fff';
xMark.style.display = 'none';
xMark.addEventListener('click', () => {
  xMark.style.display = xMark.style.display === 'none' ? 'block' : 'none';
  iframe.style.display = iframe.style.display === 'none' ? 'block' : 'none';
});

button.addEventListener('click', () => {
  xMark.style.display = xMark.style.display === 'none' ? 'block' : 'none';
  iframe.style.display = iframe.style.display === 'none' ? 'block' : 'none';
});
container.appendChild(xMark);

container.appendChild(iframe);
container.appendChild(button);

function updateIframeWidth() {
  if (window.innerWidth < 525) {
    console.log(window.innerWidth);
    iframe.style.width = '100%';
    iframe.style.height = '100vh';
    iframe.style.left = '0rem';
    iframe.style.maxHeight = '100vh';
    iframe.style.bottom = '0rem';
    xMark.style.top = '-2px';
    xMark.style.right = '6px';
  } else {
    iframe.style.width = '425px';
    iframe.style.height = '85vh';
    iframe.style.left = 'unset';
    iframe.style.right = '1rem';
    iframe.style.bottom = '8rem';
    xMark.style.top = '10px';
    xMark.style.right = '22px';
  }
}
updateIframeWidth();
window.addEventListener('resize', updateIframeWidth);

const chatDiv = document.createElement('div');
chatDiv.setAttribute('id', 'chat-id');
chatDiv.appendChild(container);
document.body.appendChild(chatDiv);

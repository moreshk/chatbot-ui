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

const button = document.createElement('button');
button.addEventListener('click', () => {
  iframe.style.display = iframe.style.display === 'none' ? 'block' : 'none';
});
const img = document.createElement('img');
img.src = 'https://dashboard.koretex.ai/bubble.svg';
img.style.width = '80px';
img.style.height = '80px';
img.style.borderRadius = '100%';
img.style.animation = 'pulsate 1s infinite';

const keyframes = `@keyframes pulsate {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}`;

const style = document.createElement('style');
style.appendChild(document.createTextNode(keyframes));
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
button.style.zIndex = '999999998';
button.style.overflow = 'hidden';
button.style.left = 'unset';
button.style.cursor = 'pointer';
button.style.borderRadius = '100%';
container.appendChild(iframe);
container.appendChild(button);

function updateIframeWidth() {
  if (window.innerWidth < 525) {
    iframe.style.width = '100%';
    iframe.style.height = 'calc(100% - 7rem)';
    iframe.style.left = '0rem';
  } else {
    iframe.style.width = '425px';
    iframe.style.height = '85vh';
    iframe.style.left = 'unset';
    iframe.style.right = '1rem';
  }
}
updateIframeWidth();
window.addEventListener('resize', updateIframeWidth);

const chatDiv = document.createElement('div');
chatDiv.setAttribute('id', 'chat-id');
chatDiv.appendChild(container);
document.body.appendChild(chatDiv);

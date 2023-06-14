(function () {
  // Inject the CSS
  const style = document.createElement('style');
  style.innerHTML = `
  .hidden {
    display: none;
  }
  #chat-widget-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    flex-direction: column;
  }
  #close-popup{
    z-index: 999999999;
    background-color: transparent;
    border: none;
    outline: none;
    color: #fff;
    cursor: pointer;
    position: absolute;
    top: 9px;
    right: 12px;
    width: 40px;
    height: 32px;
  }

  #chat-bubble {
    cursor: pointer;
    z-index: 999999999;
  }
  #chat-popup {
    height: 70vh;
    max-height: 70vh;
    transition: all 0.3s;
    overflow: hidden;
    z-index: 999999999;
    position: absolute;
    bottom: 55px;
    right: 0px;
    width: 384px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    display: none;
    flex-direction: column;
    transition: all 0.3s;
    font-size: 14px;
  }
  #chat-iframe {
    display: flex;
    z-index: 10;
    flex-grow: 1;
    border: none;
  }
  @media (max-width: 768px) {
    #chat-popup {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      max-height: 100%;
      border-radius: 0;
    }
  }
  `;

  document.head.appendChild(style);

  // Create chat widget container
  const chatWidgetContainer = document.createElement('div');
  chatWidgetContainer.id = 'chat-widget-container';
  document.body.appendChild(chatWidgetContainer);

  const currentScript = document.currentScript;
  const chatbotId = currentScript.getAttribute('data-chatbot-id');
  const src = `https://leadqualifier.koretex.ai/?chatbotId=${chatbotId}`;

  // Inject the HTML
  chatWidgetContainer.innerHTML = `
    <div id="chat-bubble" class="w-6 h-6  cursor-pointer text-3xl">
      <img src="https://dashboard.koretex.ai/bubble.svg" width="40px" height="40px" />
    </div>
    <div id="chat-popup">
        <button id="close-popup">
         <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <iframe id="chat-iframe"  src=${src}></iframe>
    </div>
  `;

  // Add event listeners
  const chatBubble = document.getElementById('chat-bubble');
  const closePopup = document.getElementById('close-popup');

  chatBubble.addEventListener('click', function () {
    togglePopup();
  });

  closePopup.addEventListener('click', function () {
    togglePopup();
  });

  function togglePopup() {
    const chatPopup = document.getElementById('chat-popup');
    chatPopup.style.display =
      chatPopup.style.display === 'none' ? 'flex' : 'none';
  }
})();

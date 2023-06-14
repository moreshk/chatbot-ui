(function () {
  document.head.insertAdjacentHTML(
    'beforeend',
    '<link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.16/tailwind.min.css" rel="stylesheet">',
  );

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
  #chat-popup {
    height: 70vh;
    max-height: 70vh;
    transition: all 0.3s;
    overflow: hidden;
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
      z-index: 2;
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
    <div id="chat-bubble" class="w-16 h-16  cursor-pointer text-3xl">
      <img src="https://dashboard.koretex.ai/bubble.svg"/>
    </div>
    <div id="chat-popup" class="hidden absolute bottom-20 right-0 w-96 bg-white rounded-md shadow-md flex flex-col transition-all text-sm z-10">
        <button id="close-popup" class="bg-transparent border-none text-white cursor-pointer absolute right-3 top-3 z-50">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <iframe id="chat-iframe"  src=${src} class="flex-grow z-10"></iframe>
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
    chatPopup.classList.toggle('hidden');
  }
})();

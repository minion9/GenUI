const messageWrapper = document.getElementById("message-wrapper");
const chatBox = document.querySelector("chatbox");
const inputField = document.getElementById("message");
const sendButton = document.querySelector(".send-button");
const scrollToBottomBtn = document.getElementById("scrollToBottomBtn");

// inputField.addEventListener('input', () => {
//     if (inputField.value.trim().length > 0) {
//         sendButton.classList.add('active');
//     } else {
//         sendButton.classList.remove('active');
//     }
// });

// Array to store chat history
let chatHistory = [];

// Function to display the user's sent message
function displaySentMessage(message) {
  const chatBox = document.getElementById("chatbox"); // Get the chatbox container

  const messageElement = document.createElement("div");
  messageElement.className = "user-bubble"; // Set the class for styling the message

  // Set the inner HTML for the sent message
  messageElement.innerHTML = `
        <div class="user-message">
            ${message}
        </div>
    `;

  // Append the sent message to the chatbox
  chatBox.appendChild(messageElement);

  // Scroll to the bottom of the chatbox to show the latest message
  scrollToBottom();
}

async function displayReceivedMessage() {
  const chatBox = document.getElementById("chatbox");

  const loadingElement = document.createElement("div");
  loadingElement.className = "bot-bubble no-background loading";
  loadingElement.innerHTML = `<div class="loader">
    <span class="bar"></span>
    <span class="bar"></span>
    <span class="bar"></span>
  </div>`;

  chatBox.appendChild(loadingElement);
  scrollToBottom();

  try {
    const message = await generateRandomMessage();
    chatBox.removeChild(loadingElement);

    const messageElement = document.createElement("div");
    messageElement.className = "bot-bubble";
    messageElement.innerHTML = `
      <div class="bot-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-stars" viewBox="0 0 16 16">
          <defs>
            <linearGradient id="gradient-fill" x1="20%" y1="50%" x2="100%" y2="75%">
              <stop offset="0%" style="stop-color: #bda0de; stop-opacity: 1" />
              <stop offset="50%" style="stop-color: #867fea; stop-opacity: 1" />
              <stop offset="100%" style="stop-color: #5272f2; stop-opacity: 1" />
            </linearGradient>
          </defs>
          <path
            fill="url(#gradient-fill)"
            d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.73 1.73 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.73 1.73 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.73 1.73 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"
          />
        </svg>
      </div>
      <div class="bot-message">
      </div>
    `;

    chatBox.appendChild(messageElement);
    const botTextElement = messageElement.querySelector(".bot-message");

    function typeMessage(text, index) {
      if (index < text.length) {
        botTextElement.textContent += text.charAt(index);
        if (index % 10 === 0) {
          scrollToBottom();
        }
        setTimeout(() => typeMessage(text, index + 1), 5);
      } else {
        scrollToBottom();

        const botFooter = document.createElement("div");
        botFooter.className = "bot-footer";
        botFooter.style = "display: flex; opacity: 0;";
        botFooter.innerHTML = `<div class="msg-opt" onclick="copyToClipboard(this)">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"><path d="M16 3H4v13"/><path d="M8 7h12v12a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z"/></g></svg>
                      </div>
                      <div class="like-btn">
                          <svg xmlns="http://www.w3.org/2000/svg" class="like" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M14.5998 8.00033H21C22.1046 8.00033 23 8.89576 23 10.0003V12.1047C23 12.3659 22.9488 12.6246 22.8494 12.8662L19.755 20.3811C19.6007 20.7558 19.2355 21.0003 18.8303 21.0003H2C1.44772 21.0003 1 20.5526 1 20.0003V10.0003C1 9.44804 1.44772 9.00033 2 9.00033H5.48184C5.80677 9.00033 6.11143 8.84246 6.29881 8.57701L11.7522 0.851355C11.8947 0.649486 12.1633 0.581978 12.3843 0.692483L14.1984 1.59951C15.25 2.12534 15.7931 3.31292 15.5031 4.45235L14.5998 8.00033ZM7 10.5878V19.0003H18.1606L21 12.1047V10.0003H14.5998C13.2951 10.0003 12.3398 8.77128 12.6616 7.50691L13.5649 3.95894C13.6229 3.73105 13.5143 3.49353 13.3039 3.38837L12.6428 3.0578L7.93275 9.73038C7.68285 10.0844 7.36341 10.3746 7 10.5878ZM5 11.0003H3V19.0003H5V11.0003Z"></path></svg>
                      </div>
                      <div class="dislike-btn">
                          <svg xmlns="http://www.w3.org/2000/svg" class="dislike" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M9.40017 16H3C1.89543 16 1 15.1046 1 14V11.8957C1 11.6344 1.05118 11.3757 1.15064 11.1342L4.24501 3.61925C4.3993 3.24455 4.76447 3 5.16969 3H22C22.5523 3 23 3.44772 23 4V14C23 14.5523 22.5523 15 22 15H18.5182C18.1932 15 17.8886 15.1579 17.7012 15.4233L12.2478 23.149C12.1053 23.3508 11.8367 23.4184 11.6157 23.3078L9.80163 22.4008C8.74998 21.875 8.20687 20.6874 8.49694 19.548L9.40017 16ZM17 13.4125V5H5.83939L3 11.8957V14H9.40017C10.7049 14 11.6602 15.229 11.3384 16.4934L10.4351 20.0414C10.3771 20.2693 10.4857 20.5068 10.6961 20.612L11.3572 20.9425L16.0673 14.27C16.3172 13.9159 16.6366 13.6257 17 13.4125ZM19 13H21V5H19V13Z"></path></svg>
                      </div>`;
        botFooter.style.opacity = "0";

        messageElement.appendChild(botFooter);
        setTimeout(() => {
          botFooter.style.opacity = "1";
        }, 250);
        scrollToBottom();

        addTooltip('.msg-opt', 'Copy');
        addTooltip('.like-btn', 'Good Response');
        addTooltip('.dislike-btn', 'Bad Response');
        initializeFeedbackSystem(messageElement, chatBox);
      }
    }
    typeMessage(message, 0);
  } catch (error) {
    console.error('Error displaying received message:', error);
    chatBox.removeChild(loadingElement);
    
    // Optional: create an error message element
    const errorElement = document.createElement("div");
    errorElement.className = "bot-bubble error";
    errorElement.textContent = "Sorry, there was an error generating a message.";
    chatBox.appendChild(errorElement);
    scrollToBottom();
  }
}
function generateRandomMessage() {
  return new Promise((resolve) => {
  const messages = [
    "Knowledge is a powerful tool that can unlock countless opportunities. It's like a key that opens doors to new worlds, enabling us to understand the complexities of the universe and our place within it. From the intricacies of science to the nuances of human behavior, knowledge empowers us to make informed decisions, solve problems creatively, and contribute meaningfully to society. It's a valuable asset that can help us achieve our goals, overcome obstacles, and make a positive impact on the world. Knowledge is a force for good that can transform individuals and societies.",
    "Facts are the building blocks of knowledge. They provide a solid foundation upon which we can construct our understanding of the world. By gathering and analyzing facts, we can separate truth from fiction, distinguish between reliable and unreliable sources, and develop critical thinking skills. Facts are essential for making evidence-based arguments, conducting research, and staying informed about current events. They're like the sturdy bricks that hold up a house, ensuring a strong and stable structure. Facts are the bedrock of a healthy democracy.",
    "Learning is a lifelong journey that enriches our lives in countless ways. It expands our horizons, stimulates our minds, and fosters a sense of curiosity and wonder. Whether we're learning a new language, mastering a musical instrument, or delving into a particular field of study, the benefits of learning are far-reaching. It can improve our job prospects, enhance our relationships, and even contribute to our overall well-being. Learning is like a muscle that gets stronger with exercise, making us more adaptable, resilient, and successful. Learning is an investment in ourselves that pays dividends throughout our lives.",
    "Education plays a crucial role in shaping our lives and societies. It provides us with the tools and knowledge we need to succeed, both personally and professionally. From early childhood to adulthood, education equips us with the skills and competencies necessary to navigate the complexities of the modern world. It helps us develop critical thinking, problem-solving, and communication skills, which are essential for success in any field. Education is like a garden that needs to be nurtured and cultivated to produce beautiful and fruitful results. Education is the foundation of a prosperous and equitable society.",
    "Curiosity is a powerful force that drives us to seek out new knowledge and experiences. It is the spark that ignites our desire to learn, explore, and understand the world around us. By cultivating curiosity, we can broaden our perspectives, challenge our assumptions, and discover new and innovative ways of thinking. Curiosity is a valuable asset that can help us achieve our goals, overcome obstacles, and make a positive impact on the world. It's like a compass that guides us towards exciting new discoveries and adventures. Curiosity is the engine of progress and innovation.",
    "Education plays a crucial role in shaping our lives and societies. It provides us with the tools and knowledge we need to succeed, both personally and professionally. From early childhood to adulthood, education equips us with the skills and competencies necessary to navigate the complexities of the modern world. It helps us develop critical thinking, problem-solving, and communication skills, which are essential for success in any field.",
    "Knowledge is meant to be shared. By passing on what we've learned to others, we can help them grow, develop, and reach their full potential. So whether you're teaching a child how to read, mentoring a colleague, or simply sharing a funny fact with a friend, take the time to spread knowledge and make a difference in the world. Sharing knowledge is a powerful way to connect with others and create a more informed and compassionate society. Sharing knowledge is a gift that keeps on giving.",
    "Facts can be serious business, but they can also be downright hilarious. From amusing animal anecdotes to bizarre historical events, there's a wealth of comical knowledge out there just waiting to be discovered. So next time you're feeling down, why not crack open a book of quirky facts and give your brain a good laugh? Laughter is a powerful medicine that can boost our mood, reduce stress, and strengthen our relationships. Humor can be a great way to connect with others and lighten the mood.",
    "There's something truly magical about learning something new. It's like unwrapping a present on Christmas morning, except instead of toys, you're getting a whole new world of knowledge. So whether you're taking a cooking class, learning to play an instrument, or simply reading a book outside your comfort zone, embrace the joy of learning and let your curiosity guide you. Learning is a rewarding experience that can bring a sense of fulfillment and accomplishment.",
    "As technology continues to advance, the ways in which we acquire and share knowledge are constantly evolving. From virtual reality classrooms to artificial intelligence-powered learning tools, the future of education is filled with exciting possibilities. It's an exciting time to be alive and learning, and I can't wait to see what the future holds for knowledge and human understanding. The future of knowledge is bright, and the possibilities are endless. Knowledge is the key to unlocking a better future.",
  ];
  const randomIndex = Math.floor(Math.random() * messages.length);
    setTimeout(() => {
      resolve(messages[randomIndex]);
    }, 5000); // Delay of 1 second to simulate async fetching
  });
}



// Function to initialize feedback container and add toggle effect for like/dislike buttons
function initializeFeedbackSystem(messageElement, chatBox) {
  // Feedback container overlay creation
  const fcOverlay = document.createElement("div");
  fcOverlay.className = "feedback-container-overlay";
  fcOverlay.style.display = "none"; // Hidden by default
  chatBox.appendChild(fcOverlay);

  // Feedback container creation
  const feedbackContainer = document.createElement("div");
  feedbackContainer.className = "feedback-container";
  feedbackContainer.style.display = "none"; // Hidden by default
  feedbackContainer.innerHTML = `
    <div class="fc-border">
      <div class="feedback-header">
        <span>Provide Feedback</span>
        <button class="close-feedback-btn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg></button>
      </div>
    </div>
    <div class="feedback-options">
        <button class="feedback-option">Speed of Response</button>
        <button class="feedback-option">Not factually correct</button>
        <button class="feedback-option">Didn't fully follow instructions</button>
        <button class="feedback-option">Relevance of Information</button>
        <button class="feedback-option">Being lazy</button>
        <button class="feedback-option">Accuracy</button>
        <button class="feedback-option feedback-other">Other</button>
    </div>
    <div class="feedback-actions">
      <input class="feedback-input" placeholder="Describe what was wrong with the response..." style="display: none;">
      <button class="submit-feedback-btn" disabled>Submit</button>
    </div>
  `;
  chatBox.appendChild(feedbackContainer);

  // // Event listener to open feedback container on dislike
  // botFooter.querySelector(".dislike-btn").addEventListener("click", () => {
  //     fcOverlay.style.display = "block";
  //     feedbackContainer.style.display = "block";
  // });

  // Close feedback container
  feedbackContainer.querySelector(".close-feedback-btn").addEventListener("click", () => {
      fcOverlay.style.display = "none";
      feedbackContainer.style.display = "none";
  });

  // Handle feedback input and submission
  const feedbackOptions = document.querySelectorAll(".feedback-option");
  const feedbackInput = feedbackContainer.querySelector(".feedback-input");
  const submitFeedbackBtn = feedbackContainer.querySelector(".submit-feedback-btn");
  
  feedbackOptions.forEach(option => {
    submitFeedbackBtn.style.display = "none";
    option.addEventListener("click", () => {
      // Check if SVG is already present
      const existingIcon = option.querySelector(".check-icon");
      
      if (existingIcon) {
        // If the icon exists, remove it and the selected state
        existingIcon.remove();
        option.classList.remove("selected");
        feedbackInput.style.display = "none"; // Hide feedback input
        // Disable the submit button if no option is selected
        submitFeedbackBtn.style.display = "none";
      } else {
        // Create and insert the SVG if not present
        const checkIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        checkIcon.setAttribute("width", "26");
        checkIcon.setAttribute("height", "26");
        checkIcon.setAttribute("viewBox", "0 0 24 24");
        checkIcon.setAttribute("fill", "none");
        checkIcon.classList.add("check-icon");

        // Create path element for the SVG
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M10.5858 13.4142L7.75735 10.5858L6.34314 12L10.5858 16.2427L17.6568 9.1716L16.2426 7.75739L10.5858 13.4142Z");
        path.setAttribute("fill", "currentColor");

        // Append path to SVG and SVG to button
        checkIcon.appendChild(path);
        option.prepend(checkIcon);

        // Add selected class for styling
        option.classList.add("selected");

        submitFeedbackBtn.style.display = "block";
        submitFeedbackBtn.disabled = false;
        // Show feedback input only if the "Other" button is selected
        if (option.classList.contains("feedback-other")) {
          feedbackInput.style.display = "block";
        } else {
          feedbackInput.style.display = "none";
        }
      }
    });
  });

  feedbackInput.addEventListener("input", () => {
    submitFeedbackBtn.disabled = feedbackInput.value.trim() === "";
  });
  submitFeedbackBtn.addEventListener("click", () => {
    const selectedOption = feedbackContainer.querySelector(".feedback-option.selected");
    const feedbackText = feedbackInput.value.trim() || selectedOption.textContent;
  
    if (feedbackText) {
        console.log("Feedback submitted:", feedbackText);
  
        // Hide feedback container and overlay
        feedbackContainer.style.display = "none";
        fcOverlay.style.display = "none";
        feedbackInput.value = "";
        submitFeedbackBtn.style.display = "none";
  
        // Remove selected state from feedback options
        feedbackOptions.forEach(option => option.classList.remove("selected"));
  
        // Create and display the "Thanks for your feedback!" message
        const feedbackMessage = document.createElement("div");
        feedbackMessage.className = "feedback-message tracking-in-expand-fwd";
        feedbackMessage.innerHTML = `
          <div class="thanks-message">Thanks for your feedback!</div>
        `;
        chatBox.appendChild(feedbackMessage);
        scrollToBottom();
  
        // Remove the message after a short delay
        setTimeout(() => {
          feedbackMessage.remove();
        }, 3000); // 3 seconds
    }
  });
  

  // Toggle effect for like/dislike buttons
  const likeBtn = messageElement.querySelector('.like-btn');
  const dislikeBtn = messageElement.querySelector('.dislike-btn');
  const likeIconOriginal = likeBtn.innerHTML;
  const dislikeIconOriginal = dislikeBtn.innerHTML;
  const likeIconNew = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M2 8.99997H5V21H2C1.44772 21 1 20.5523 1 20V9.99997C1 9.44769 1.44772 8.99997 2 8.99997ZM7.29289 7.70708L13.6934 1.30661C13.8693 1.13066 14.1479 1.11087 14.3469 1.26016L15.1995 1.8996C15.6842 2.26312 15.9026 2.88253 15.7531 3.46966L14.5998 7.99997H21C22.1046 7.99997 23 8.8954 23 9.99997V12.1043C23 12.3656 22.9488 12.6243 22.8494 12.8658L19.755 20.3807C19.6007 20.7554 19.2355 21 18.8303 21H8C7.44772 21 7 20.5523 7 20V8.41419C7 8.14897 7.10536 7.89462 7.29289 7.70708Z"></path></svg>`;
  const dislikeIconNew = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M22 15H19V3H22C22.5523 3 23 3.44772 23 4V14C23 14.5523 22.5523 15 22 15ZM16.7071 16.2929L10.3066 22.6934C10.1307 22.8693 9.85214 22.8891 9.65308 22.7398L8.8005 22.1004C8.3158 21.7369 8.09739 21.1174 8.24686 20.5303L9.40017 16H3C1.89543 16 1 15.1046 1 14V11.8957C1 11.6344 1.05118 11.3757 1.15064 11.1342L4.24501 3.61925C4.3993 3.24455 4.76447 3 5.16969 3H16C16.5523 3 17 3.44772 17 4V15.5858C17 15.851 16.8946 16.1054 16.7071 16.2929Z"></path></svg>`;

  const originalLikePosition = likeBtn.parentNode;
  const likeIndex = Array.from(originalLikePosition.children).indexOf(likeBtn);
  const originalDislikePosition = dislikeBtn.parentNode;
  const dislikeIndex = Array.from(originalDislikePosition.children).indexOf(dislikeBtn);

  likeBtn.addEventListener('click', () => {
    if (likeBtn.innerHTML === likeIconOriginal) {
      likeBtn.innerHTML = likeIconNew;
       // Create and display the "Thanks for your feedback!" message
       const feedbackMessage = document.createElement("div");
       feedbackMessage.className = "feedback-message";
       feedbackMessage.innerHTML = `
         <div class="thanks-message">Thanks for your feedback!</div>
       `;
       chatBox.appendChild(feedbackMessage);
       scrollToBottom();
 
       // Remove the message after a short delay
       setTimeout(() => {
         feedbackMessage.remove();
       }, 3000); // 3 seconds
      dislikeBtn.remove();
    } else {
      likeBtn.innerHTML = likeIconOriginal;
      if (!originalDislikePosition.contains(dislikeBtn)) {
        originalDislikePosition.insertBefore(dislikeBtn, originalDislikePosition.children[dislikeIndex]);
      }
    }
  });
  
  dislikeBtn.addEventListener('click', () => {
    if (dislikeBtn.innerHTML === dislikeIconOriginal) {
      fcOverlay.style.display = "block";
      feedbackContainer.style.display = "block";
      dislikeBtn.innerHTML = dislikeIconNew;
      likeBtn.remove();
    } else {
      dislikeBtn.innerHTML = dislikeIconOriginal;
      if (!originalLikePosition.contains(likeBtn)) {
        originalLikePosition.insertBefore(likeBtn, originalLikePosition.children[likeIndex]);
      }
    }
  });
}

// function addToggleEffect(messageElement) {
//   const likeBtn = messageElement.querySelector('.like-btn');
//   const dislikeBtn = messageElement.querySelector('.dislike-btn');

//   const likeIconOriginal = likeBtn.innerHTML;
//   const dislikeIconOriginal = dislikeBtn.innerHTML;

//   const likeIconNew = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M2 8.99997H5V21H2C1.44772 21 1 20.5523 1 20V9.99997C1 9.44769 1.44772 8.99997 2 8.99997ZM7.29289 7.70708L13.6934 1.30661C13.8693 1.13066 14.1479 1.11087 14.3469 1.26016L15.1995 1.8996C15.6842 2.26312 15.9026 2.88253 15.7531 3.46966L14.5998 7.99997H21C22.1046 7.99997 23 8.8954 23 9.99997V12.1043C23 12.3656 22.9488 12.6243 22.8494 12.8658L19.755 20.3807C19.6007 20.7554 19.2355 21 18.8303 21H8C7.44772 21 7 20.5523 7 20V8.41419C7 8.14897 7.10536 7.89462 7.29289 7.70708Z"></path></svg>`;
//   const dislikeIconNew = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M22 15H19V3H22C22.5523 3 23 3.44772 23 4V14C23 14.5523 22.5523 15 22 15ZM16.7071 16.2929L10.3066 22.6934C10.1307 22.8693 9.85214 22.8891 9.65308 22.7398L8.8005 22.1004C8.3158 21.7369 8.09739 21.1174 8.24686 20.5303L9.40017 16H3C1.89543 16 1 15.1046 1 14V11.8957C1 11.6344 1.05118 11.3757 1.15064 11.1342L4.24501 3.61925C4.3993 3.24455 4.76447 3 5.16969 3H16C16.5523 3 17 3.44772 17 4V15.5858C17 15.851 16.8946 16.1054 16.7071 16.2929Z"></path></svg>`;

//   const originalLikePosition = likeBtn.parentNode;
//   const likeIndex = Array.from(originalLikePosition.children).indexOf(likeBtn);
//   const originalDislikePosition = dislikeBtn.parentNode;
//   const dislikeIndex = Array.from(originalDislikePosition.children).indexOf(dislikeBtn);

//   likeBtn.addEventListener('click', () => {
//     if (likeBtn.innerHTML === likeIconOriginal) {
//       likeBtn.innerHTML = likeIconNew;
//       dislikeBtn.remove();
//     } else {
//       likeBtn.innerHTML = likeIconOriginal;
//       if (!originalDislikePosition.contains(dislikeBtn)) {
//         originalDislikePosition.insertBefore(dislikeBtn, originalDislikePosition.children[dislikeIndex]);
//       }
//     }
//   });
  
//   dislikeBtn.addEventListener('click', () => {
//     if (dislikeBtn.innerHTML === dislikeIconOriginal) {
//       dislikeBtn.innerHTML = dislikeIconNew;
//       likeBtn.remove();
//     } else {
//       dislikeBtn.innerHTML = dislikeIconOriginal;
//       if (!originalLikePosition.contains(likeBtn)) {
//         originalLikePosition.insertBefore(likeBtn, originalLikePosition.children[likeIndex]);
//       }
//     }
//   });
// }

// Function to scroll the conversation view to the bottom
function scrollToBottom() {
  const chatBox = document.getElementById("chatbox");
  const lastMessage = chatBox.lastElementChild; // Get the last message in the chatbox

  if (lastMessage) {
    lastMessage.scrollIntoView({ behavior: "smooth" }); // Scroll to the last message smoothly
  }
}
// // Function to detect if the user is scrolled to the bottom
// function isScrolledToBottom() {
//   return chatBox.scrollHeight - chatBox.scrollTop === chatBox.clientHeight;
// }
// // Function to show/hide the scroll to bottom button
// function toggleScrollToBottomButton() {
//   const shouldShowButton = chatBox.scrollTop < chatBox.scrollHeight - chatBox.clientHeight - 200; // Show if scrolled up more than 200px
//   if (shouldShowButton) {
//     scrollToBottomBtn.style.display = "block"; // Show the button
//   } else {
//     scrollToBottomBtn.style.display = "none"; // Hide the button
//   }
// }
// // Add scroll event listener to the chatbox
// chatBox.addEventListener("scroll", toggleScrollToBottomButton);

// Add click event listener to the scroll-to-bottom button
// scrollToBottomBtn.addEventListener("click", () => {
//   scrollToBottom();
//   scrollToBottomBtn.style.display = "none"; // Hide the button after scrolling
// });

// Initial scroll check (in case chat starts already with messages)
// toggleScrollToBottomButton();
// Function to handle sending the message
function sendMessage() {
  const messageInput = document.getElementById("message");
  const message = messageInput.value.trim(); // Get the trimmed message from the input

  if (message !== "") {
    displaySentMessage(message); // Call to display the sent message
    messageInput.value = ""; // Clear the input field after sending
    

    // Remove all rows containing card-body elements
    const cards = document.querySelectorAll(
      ".logoContainer"
    );
    cards.forEach((card) => card.remove());

    // Disable the send button after sending the message
    sendButton.disabled = true;
    sendButton.classList.remove('show'); // Hide the button
    

    // Simulate a bot response with a slight delay
    setTimeout(() => {
      displayReceivedMessage(generateRandomMessage());
    }, 500); // Delay for bot response (500ms)
    autoResize(messageInput);
  }
}

// Event listener for pressing the "Enter" key inside the input field
document.getElementById("message").addEventListener("keyup", function(event) {
    // Regular Enter triggers send
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault(); // Prevent default behavior
        sendMessage();
    }
    // Shift + Enter allows new line (default behavior continues)
});

document.getElementById("message").addEventListener("keydown", function(event) {
    // Prevent regular Enter from creating a new line
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
    }
});

// Event listener for the send button click
document.querySelector(".send-button").addEventListener("click", function () {
  sendMessage(); // Call sendMessage function
});

// Function to generate a random message


// function generateRandomMessage() {
//     const messages = [
//         "How can I assist you today?",
//         "Is there anything you need help with?",
//         "Feel free to ask me anything!",
//         "What can I do for you?",
//         "I'm here to help!",
//         "The API response time is slower than expected",
//         "Can you review my pull request when you get a chance?",
//         "I’ve pushed the hotfix to the production branch.",
//         "Did you check the error logs on the server?",
//         "Based on my Research. please Google it",
//     ];
//     const randomIndex = Math.floor(Math.random() * messages.length);
//     return messages[randomIndex];
// }

document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const sidebar = document.getElementById("sidebar");
  const closeSidebarButton = document.getElementById("close-sidebar");
  const expandSidebarButton = document.getElementById("expand-sidebar");
  const header = document.querySelector("header");
  const tc = document.querySelector(".text-container");
  const cb = document.querySelector("#chatbox");

  // Create overlay element
  const overlay = document.createElement("div");
  overlay.id = "sidebar-overlay";
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 8;
    display: none;
    opacity: 0;
    transition: opacity 200ms ease;
  `;
  document.body.appendChild(overlay);

  // Constants for breakpoints, sizes, and layout
  const BREAKPOINT_LARGE = 769;
  const MARGIN = "240px";
  const MOBILE_SIDEBAR_WIDTH = "350px";

  // Local state
  let sidebarVisible = false;
  let previousScreenSize = window.innerWidth >= BREAKPOINT_LARGE ? "large" : "small";

  // Toggle sidebar visibility
  function toggleSidebar() {
    sidebarVisible = !sidebarVisible;
    updateSidebarDisplay();
    saveSidebarState(sidebarVisible);
  }

  // Close sidebar
  function closeSidebar() {
    sidebarVisible = false;
    updateSidebarDisplay();
    saveSidebarState(sidebarVisible);
  }

  // Update sidebar and overlay display
  function updateSidebarDisplay() {
    const isLargeScreen = window.innerWidth >= BREAKPOINT_LARGE;
    // Set transitions
    const elements = [header, cb, tc, sidebar];
    elements.forEach(el => {
      if (el) el.style.transition = "all 350ms ease";
    });

    // Update sidebar width and position
    sidebar.style.width = isLargeScreen ? MARGIN : MOBILE_SIDEBAR_WIDTH;
    if (!isLargeScreen) {
      sidebar.style.zIndex = "9";
      expandSidebarButton.style.display =  !sidebarVisible ? "block" : "block";
      // Show/hide overlay
      overlay.style.display = sidebarVisible ? "block" : "none";
      overlay.offsetHeight; // Force reflow
      overlay.style.opacity = sidebarVisible ? "1" : "0";
      
      // Prevent body scroll when sidebar is open
      document.body.style.overflow = sidebarVisible ? "hidden" : "";
      
      // Reset content styles on mobile
      [header].forEach(el => {
        if (el) {
          // el.style.width = "100dvw";
          el.style.marginLeft = "0";
        }
      });
      [cb, tc].forEach(el => {
        if (el) {
          // el.style.width = "80dvw";
          el.style.marginLeft = "0";
        }
      });
    } else { 
      // Hide overlay
      overlay.style.display = "none";
      document.body.style.overflow = "";
      
      // Squeeze content on desktop
      [header].forEach(el => {
        if (el) {
          // el.style.width = sidebarVisible ? `calc(100dvw - ${MARGIN})` : "100dvw";
          el.style.marginLeft = sidebarVisible ? MARGIN : "0";
        }
      });
      [cb, tc].forEach(el => {
        if (el) {
          // el.style.width = sidebarVisible ? `calc(35dvw + ${MARGIN})` : "65dvw";
          el.style.marginLeft = sidebarVisible ? MARGIN : "0";
        }
      });
    }
    // Update expand button visibility - show when sidebar is closed
    expandSidebarButton.style.display = !sidebarVisible ? "block" : "none";
    // Remove hidden class to prevent conflicts with visibility
    if (sidebarVisible) {
      sidebar.classList.remove("hidden");
    } else {
      // Use setTimeout to hide the sidebar after the transition
      setTimeout(() => {
        if (!sidebarVisible) {
          sidebar.classList.add("hidden");
        }
      }, 0); // Match the transition duration
    }
  }

  // Load sidebar state from server
  async function loadSidebarState() {
    try {
      // const response = await fetch('/load_chat_data');
      // const data = await response.json();
      // if (data && !data.error) {
      //   sidebarVisible = data.sidebar === true;
      // }
    } catch (error) {
      // Silent error handling
    }
    updateSidebarDisplay();
  }

  // Save sidebar state to server
  async function saveSidebarState(isVisible) {
    try {
      // await fetch('/save_settings', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ sidebar: isVisible }),
      // });
    } catch (error) {
      // Silent error handling
    }
  }

  // Handle screen resize
  function handleResize() {
    const currentScreenSize = window.innerWidth >= BREAKPOINT_LARGE ? "large" : "small";
    if (previousScreenSize !== currentScreenSize) {
      updateSidebarDisplay();
    }
    previousScreenSize = currentScreenSize;
  }

  // Event listeners
  expandSidebarButton.addEventListener("click", toggleSidebar);
  closeSidebarButton.addEventListener("click", closeSidebar);
  overlay.addEventListener("click", closeSidebar);
  window.addEventListener("resize", handleResize);

  // Initialize
  loadSidebarState();
});

// suggestion
// Function to adjust visible cards based on window size
function adjustCardVisibility() {
  const screenWidth = window.innerWidth; // Get the current screen width
  const cards = document.querySelectorAll(".suggestion-card"); // Get all the suggestion cards
  const totalCards = cards.length;

  // Define breakpoints and dynamically adjust card visibility
  cards.forEach((card, index) => {
    if (screenWidth < 400 && index >= 1) {
      card.style.display = "none"; // Hide all cards except the first
    } else if (screenWidth < 500 && index >= 2) {
      card.style.display = "none"; // Hide all cards except the first two
    } else if (screenWidth < 600 && index >= 3) {
      card.style.display = "none"; // Hide all cards except the first three
    } else if (screenWidth < 630 && index >= 3) {
      card.style.display = "none"; // Hide all cards except the first four
    } else {
      card.style.display = "flex"; // Show the card if it should be visible at the current size
    }
  });
}

// Listen for window resize events
window.addEventListener("resize", adjustCardVisibility);

// Call the function once to set the initial visibility based on the current screen size
window.addEventListener("load", adjustCardVisibility);


// Toggle the popup menu when profile icon is clicked
document.querySelector(".profile-icon").addEventListener("click", function () {
  document.querySelector(".profile-menu-container").classList.toggle("active");
});


// Optional: Close the popup when clicking outside
window.addEventListener("click", function (event) {
  if (!event.target.closest(".profile-menu-container")) {
    document
    .querySelector(".profile-menu-container",".edit-buttons")
    .classList.remove("active");
  }
});

function sendMessage1() {
  // Get the suggestion card that was clicked
  const suggestionCard = event.currentTarget;
  
  // Retrieve the message text from the <p> element inside the clicked card
  const messageText = suggestionCard.querySelector('p').textContent;
  
  // Find the chatbox input field
  const chatboxInput = document.getElementById('message');
  
  // Set the chatbox input field value to the message text
  chatboxInput.value = messageText;
  
  // Optionally, you can also simulate sending the message immediately
  // For example, you can trigger a submit or call the function that handles sending messages
  sendMessage(); // Uncomment this line if you have a function to send the message
}

document.addEventListener('DOMContentLoaded', function() {
  const inputField = document.getElementById('message');
  const sendButton = document.querySelector('.send-button');
  
  inputField.addEventListener('input', function() {
    // Enable the send button if there's valid input, otherwise keep it hidden
    if (inputField.value.trim() === '') {
      sendButton.disabled = true;
      sendButton.classList.remove('show'); // Remove the show class to hide the button
    } else {
      sendButton.disabled = false;
      sendButton.classList.add('show'); // Add the show class to display the button
    }
  });
  
  // Set the initial state of the button on page load
  sendButton.disabled = inputField.value.trim() === '';
  if (!sendButton.disabled) {
    sendButton.classList.add('show'); // Show the button if it should be enabled
  }
});

// edit-button-function
document.addEventListener("DOMContentLoaded", function () {
  // Constants
  const POPUP_OFFSET = 5;
  const Z_INDEX_ACTIVE = "10";
  const VIEWPORT_MARGIN = 10;
  const POPUP_WIDTH_OFFSET = 100;
  
  // CSS Classes and Selectors
  const CLASSES = {
    editButton: "edit-buttons",
    popupMenu: "edit-popup-menu",
    visible: "visible"
  };

  // Helper Functions
  function hideAllPopups() {
    document.querySelectorAll(`.${CLASSES.popupMenu}`).forEach(menu => {
      menu.classList.remove(CLASSES.visible);
      menu.parentElement.style.zIndex = "";
    });
  }

  function getAvailableSpace(buttonRect) {
    const viewportHeight = window.innerHeight;
    return {
      above: buttonRect.top,
      below: viewportHeight - buttonRect.bottom
    };
  }

  function calculatePopupPosition(button, popup) {
    const buttonRect = button.getBoundingClientRect();
    const space = getAvailableSpace(buttonRect);
    
    // Temporarily show popup to get its height
    popup.style.visibility = "hidden";
    popup.classList.add(CLASSES.visible);
    const popupHeight = popup.offsetHeight;
    popup.classList.remove(CLASSES.visible);
    popup.style.visibility = "";

    let position = {
      left: `${buttonRect.left + window.scrollX - POPUP_WIDTH_OFFSET}px`
    };

    // Determine vertical position
    if (space.below >= popupHeight) {
      // Enough space below
      position.top = `${buttonRect.bottom + window.scrollY + POPUP_OFFSET}px`;
      position.maxHeight = `${popupHeight}px`;
    } else if (space.above >= popupHeight) {
      // Enough space above
      position.top = `${buttonRect.top + window.scrollY - popupHeight - POPUP_OFFSET}px`;
      position.maxHeight = `${popupHeight}px`;
    } else {
      // Not enough space either way - use the larger space
      if (space.below >= space.above) {
        position.top = `${buttonRect.bottom + window.scrollY + POPUP_OFFSET}px`;
        position.maxHeight = `${space.below - VIEWPORT_MARGIN}px`;
      } else {
        position.top = `${buttonRect.top + window.scrollY - space.above + POPUP_OFFSET}px`;
        position.maxHeight = `${space.above - VIEWPORT_MARGIN}px`;
      }
    }

    return position;
  }

  function applyPosition(popup, position) {
    popup.style.position = "absolute";
    popup.style.top = position.top;
    popup.style.left = position.left;
    popup.style.maxHeight = position.maxHeight;
  }

  function handleButtonClick(event) {
    event.stopPropagation();
    
    const button = event.currentTarget;
    const popup = button.parentElement.querySelector(`.${CLASSES.popupMenu}`);

    if (popup.classList.contains(CLASSES.visible)) {
      popup.classList.remove(CLASSES.visible);
      return;
    }

    hideAllPopups();
    button.parentElement.style.zIndex = Z_INDEX_ACTIVE;
    
    const position = calculatePopupPosition(button, popup);
    applyPosition(popup, position);
    popup.classList.add(CLASSES.visible);
  }

  function handleDocumentClick(event) {
    if (!event.target.classList.contains(CLASSES.editButton)) {
      document.querySelectorAll(`.${CLASSES.popupMenu}`).forEach(menu => {
        if (!menu.contains(event.target)) {
          menu.classList.remove(CLASSES.visible);
          menu.parentElement.style.zIndex = "";
        }
      });
    }
  }

  // Event Listeners
  document.querySelectorAll(`.${CLASSES.editButton}`)
    .forEach(button => button.addEventListener("click", handleButtonClick));
  
  document.addEventListener("click", handleDocumentClick);
});

document.addEventListener("DOMContentLoaded", function () {
  // Configuration remains the same
  const CONFIG = {
    classes: {
      editButton: "edit-buttons",
      popupMenu: "edit-popup-menu",
      visible: "visible",
      active: "active",
      conversationButton: "conversation-button",
      deleteModal: "delete-modal",
      deleteOverlay: "delete-modal-overlay"
    },
    zIndex: {
      active: "10"
    },
    animations: {
      popup: "fadeInDown"
    },
    spacing: {
      popupOffset: 5,
      viewportMargin: 10,
      menuOffset: 6
    }
  };

  // UI Components remain the same
  const UIComponents = {
    // SVG Templates remain the same
    svgTemplates: {
      editIcon: `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5 15C6.65685 15 8 13.6569 8 12C8 10.3431 6.65685 9 5 9C3.34315 9 2 10.3431 2 12C2 13.6569 3.34315 15 5 15ZM5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" fill="currentColor"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15ZM12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" fill="currentColor"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 13.6569 20.6569 15 19 15C17.3431 15 16 13.6569 16 12C16 10.3431 17.3431 9 19 9C20.6569 9 22 10.3431 22 12ZM20 12C20 12.5523 19.5523 13 19 13C18.4477 13 18 12.5523 18 12C18 11.4477 18.4477 11 19 11C19.5523 11 20 11.4477 20 12Z" fill="currentColor"/>
        </svg>`,
      menuItems: {
        rename: `
          <svg width="24px" height="24px" stroke-width="1.6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor">
            <path d="M3 21L12 21H21" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M12.2218 5.82839L15.0503 2.99996L20 7.94971L17.1716 10.7781M12.2218 5.82839L6.61522 11.435C6.42769 11.6225 6.32233 11.8769 6.32233 12.1421L6.32233 16.6776L10.8579 16.6776C11.1231 16.6776 11.3774 16.5723 11.565 16.3847L17.1716 10.7781M12.2218 5.82839L17.1716 10.7781" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>`,
        delete: `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M17 5V4C17 2.89543 16.1046 2 15 2H9C7.89543 2 7 2.89543 7 4V5H4C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H5V18C5 19.6569 6.34315 21 8 21H16C17.6569 21 19 19.6569 19 18V7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H17ZM15 4H9V5H15V4ZM17 7H7V18C7 18.5523 7.44772 19 8 19H16C16.5523 19 17 18.5523 17 18V7Z" fill="#ff0000"/>
            <path d="M9 9H11V17H9V9Z" fill="#ff0000"></path>
            <path d="M13 9H15V17H13V9Z" fill="#ff0000"></path>
          </svg>`
      }
    },

    createPopupMenu() {
      const menu = document.createElement("div");
      menu.classList.add(CONFIG.classes.popupMenu, CONFIG.animations.popup);
      menu.innerHTML = `
        <ul>
          <li id="rename-session">
            ${this.svgTemplates.menuItems.rename}
            <a>Rename</a>
          </li>
          <li id="delete-session">
            ${this.svgTemplates.menuItems.delete}
            <a>Delete</a>
          </li>
        </ul>
      `;
      return menu;
    },

    createDeleteModal() {
      const overlay = document.createElement("div");
      overlay.classList.add(CONFIG.classes.deleteOverlay);
      overlay.style.display = "none"; // Initialize overlay as hidden

      const modal = document.createElement("div");
      modal.classList.add(CONFIG.classes.deleteModal);
      modal.style.display = "none"; // Initialize modal as hidden
      modal.innerHTML = `
        <div class="delete-border">
          <div class="delete-header">
            <span>Delete chat?</span>
          </div>
        </div>
        <div class="delete-modal-content">
          <p>This will delete <span id="conversationName" class="conversation-name"></span>.</p>
        </div>
        <div class="delete-modal-actions">
          <button id="cancelButton" class="modal-cancel-btn">Cancel</button>
          <button id="confirmDeleteButton" class="modal-delete-btn">Delete</button>
        </div>
      `;

      return { overlay, modal };
    }
  };

  // PositionManager remains the same
  const PositionManager = {
    calculatePopupPosition(button, popup) {
      const rect = button.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      popup.style.visibility = "hidden";
      popup.classList.add(CONFIG.classes.visible);
      const popupHeight = popup.offsetHeight;
      popup.classList.remove(CONFIG.classes.visible);
      popup.style.visibility = "";

      const spaceAbove = rect.top;
      const spaceBelow = viewportHeight - rect.bottom;

      const position = {
        left: `${rect.left + window.scrollX - CONFIG.spacing.menuOffset}px`
      };

      if (spaceBelow >= popupHeight) {
        position.top = `${rect.bottom + window.scrollY + CONFIG.spacing.popupOffset}px`;
        position.maxHeight = `${popupHeight}px`;
      } else if (spaceAbove >= popupHeight) {
        position.top = `${rect.top + window.scrollY - popupHeight - CONFIG.spacing.popupOffset}px`;
        position.maxHeight = `${popupHeight}px`;
      } else {
        if (spaceBelow >= spaceAbove) {
          position.top = `${rect.bottom + window.scrollY + CONFIG.spacing.popupOffset}px`;
          position.maxHeight = `${spaceBelow - CONFIG.spacing.viewportMargin}px`;
        } else {
          position.top = `${rect.top + window.scrollY - spaceAbove + CONFIG.spacing.popupOffset}px`;
          position.maxHeight = `${spaceAbove - CONFIG.spacing.viewportMargin}px`;
        }
      }

      return position;
    }
  };

  // Event Handlers with updated overlay handling
  const EventHandlers = {
    handleEditButtonClick(event, button) {
      event.stopPropagation();

      const editPopupMenu = button.parentElement.querySelector(`.${CONFIG.classes.popupMenu}`);

      if (editPopupMenu.classList.contains(CONFIG.classes.visible)) {
        editPopupMenu.classList.remove(CONFIG.classes.visible);
        return;
      }

      // Hide all other popups
      document.querySelectorAll(`.${CONFIG.classes.popupMenu}`).forEach(menu => {
        menu.classList.remove(CONFIG.classes.visible);
        menu.parentElement.style.zIndex = "";
      });

      button.parentElement.style.zIndex = CONFIG.zIndex.active;

      const position = PositionManager.calculatePopupPosition(button, editPopupMenu);
      Object.assign(editPopupMenu.style, position);
      editPopupMenu.classList.add(CONFIG.classes.visible);
    },

    handleDocumentClick(event) {
      if (!event.target.closest(`.${CONFIG.classes.editButton}`)) {
        document.querySelectorAll(`.${CONFIG.classes.popupMenu}`).forEach(menu => {
          if (!menu.contains(event.target)) {
            menu.classList.remove(CONFIG.classes.visible);
            menu.parentElement.style.zIndex = "";
          }
        });
      }
    }
  };

  // Updated Modal Manager
  const ModalManager = {
    init() {
      if (!document.querySelector(`.${CONFIG.classes.deleteModal}`)) {
        const { overlay, modal } = UIComponents.createDeleteModal();
        document.body.appendChild(overlay);
        document.body.appendChild(modal);

        overlay.addEventListener("click", () => this.close());
        modal.querySelector("#cancelButton").addEventListener("click", () => this.close());
      }
    },

    show(conversationName, onConfirm) {
      const overlay = document.querySelector(`.${CONFIG.classes.deleteOverlay}`);
      const modal = document.querySelector(`.${CONFIG.classes.deleteModal}`);
      
      document.getElementById("conversationName").textContent = 
        conversationName.replace(/rename|delete/gi, "").trim();

      // Hide all popup menus
      document.querySelectorAll(`.${CONFIG.classes.popupMenu}.${CONFIG.classes.visible}`)
        .forEach(menu => {
          menu.classList.remove(CONFIG.classes.visible);
          menu.parentElement.style.zIndex = "";
        });

      // Show modal and overlay
      overlay.style.display = "block";
      modal.style.display = "block";

      // Reset and set up confirm button
      const confirmButton = document.getElementById("confirmDeleteButton");
      const newConfirmButton = confirmButton.cloneNode(true);
      confirmButton.parentNode.replaceChild(newConfirmButton, confirmButton);
      
      newConfirmButton.addEventListener("click", () => {
        onConfirm();
        this.close();
      });
    },

    close() {
      const overlay = document.querySelector(`.${CONFIG.classes.deleteOverlay}`);
      const modal = document.querySelector(`.${CONFIG.classes.deleteModal}`);
      
      if (overlay && modal) {
        overlay.style.display = "none";
        modal.style.display = "none";
      }
    }
  };

  // Conversation Manager remains largely the same
  const ConversationManager = {
    createConversationButton(sessionTitle) {
      const li = document.createElement('li');
      if (Math.random() < 0.5) {
        li.classList.add(CONFIG.classes.active);
      }
      
      const button = document.createElement('button');
      button.classList.add(CONFIG.classes.conversationButton);
      button.textContent = sessionTitle;

      const editButtonsContainer = document.createElement("div");
      editButtonsContainer.classList.add("edit-buttons-container");

      const editButtons = document.createElement("div");
      editButtons.classList.add(CONFIG.classes.editButton);
      editButtons.innerHTML = UIComponents.svgTemplates.editIcon;

      const popupMenu = UIComponents.createPopupMenu();
      
      editButtonsContainer.appendChild(editButtons);
      editButtonsContainer.appendChild(popupMenu);
      button.appendChild(editButtonsContainer);
      li.appendChild(button);

      this.initializeEditButton(editButtons);

      const conversationsContainer = document.querySelector(".conversations");
      conversationsContainer.insertBefore(li, conversationsContainer.firstChild);
    },

    initializeEditButton(button) {
      button.addEventListener("click", (event) => 
        EventHandlers.handleEditButtonClick(event, button));

      const deleteOption = button.parentElement.querySelector("#delete-session");
      deleteOption.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        const conversationItem = button.closest("li");
        const conversationName = conversationItem.querySelector(`.${CONFIG.classes.conversationButton}`).textContent;

        ModalManager.show(conversationName, () => conversationItem.remove());
      });
    }
  };

  // Initialize
  function initialize() {
    ModalManager.init();
    document.addEventListener("click", EventHandlers.handleDocumentClick);
    
    document.querySelector(".newchatbtn").addEventListener("click", () => {
      const sessionTitle = generateRandomSessionTitle(); // Assuming this function exists
      ConversationManager.createConversationButton(sessionTitle);
      addTooltip('.edit-buttons', 'More Options');
    });
  }

  initialize();
});

function generateRandomSessionTitle() {
  const adjectives = ['Amazing', 'Brilliant', 'Creative', 'Dynamic', 'Exciting', 'Fantastic', 'Gleaming', 'Innovative', 'Jubilant', 'Mighty'];
  const nouns = ['Session', 'Conversation', 'Chat', 'Talk', 'Discussion', 'Meeting', 'Brainstorm', 'Dialogue', 'Exchange', 'Debate'];
  
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNumber = Math.floor(Math.random() * 1000);  // Random number between 0 and 999
  
  // Randomly decide whether to return a short or long name
  const isLongName = Math.random() > 0.5;
  
  if (isLongName) {
    return `${randomAdjective} ${randomNoun} of Infinite Possibilities`;
  } else {
    return `${randomAdjective} ${randomNoun} #${randomNumber}`;
  }
}

// Generate multiple session titles
// for (let i = 0; i < 10; i++) {
//   console.log(generateRandomSessionTitle());
// }


function autoResize(textarea) {
  // Reset initial height
  textarea.style.height = '60px';
  
  const container = textarea.closest('.message-wrapper');
  if (container) container.style.height = '60px';

  // Calculate new height
  const newHeight = Math.min(textarea.scrollHeight, 250);

  // Set textarea height
  textarea.style.height = `${newHeight}px`;

  // Set container height
  if (container) container.style.height = `${newHeight + 10}px`;
}

// Function to get the current theme from cookies
function getThemeFromCookies() {
  const cookies = document.cookie.split('; ');
  const themeCookie = cookies.find(row => row.startsWith('theme='));
  return themeCookie ? themeCookie.split('=')[1] : null;
}

// Function to save theme preference in cookies
function saveThemeState(theme) {
  // Set cookie with a 1-year expiration
  const expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 1);
  document.cookie = `theme=${theme}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Strict`;

  // Optional: Send to server for additional persistence/tracking
  // fetch('/save_settings', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ theme })
  // }).catch(error => {
  //   console.error('Failed to save theme on server:', error);
  // });
}

// Function to apply the saved theme
function applyThemeSetting() {
  const savedTheme = getThemeFromCookies();
  
  if (savedTheme === 'dark') {
    enableDarkMode();
  } else if (savedTheme === 'light') {
    enableLightMode();
  } else {
    // Default to system preference if no saved theme
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    prefersDarkMode ? enableDarkMode() : enableLightMode();
  }
}

// Function to switch to light mode
function enableLightMode() {
  document.documentElement.setAttribute('data-mode', '');
}

// Function to switch to dark mode
function enableDarkMode() {
  document.documentElement.setAttribute('data-mode', 'dark');
}

// Ensure DOM is fully loaded before adding event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle event listeners
  const lightModeButton = document.getElementById('light-mode');
  const darkModeButton = document.getElementById('dark-mode');

  if (lightModeButton) {
    lightModeButton.addEventListener('click', () => {
      enableLightMode();
      saveThemeState('light');
    });
  }

  if (darkModeButton) {
    darkModeButton.addEventListener('click', () => {
      enableDarkMode();
      saveThemeState('dark');
    });
  }

  // Dropdown toggle function
  const toggleButton = document.querySelector(".dark-mode-toggle");
  const dropdown = document.getElementById("dark-mode-options");

  if (toggleButton && dropdown) {
    toggleButton.addEventListener('click', () => {
      dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    });
  }

  // Close the dropdown if clicked outside
  document.addEventListener("click", function(event) {
    const toggleButton = document.querySelector(".dark-mode-toggle");
    const dropdown = document.getElementById("dark-mode-options");
    
    if (toggleButton && dropdown && !toggleButton.contains(event.target)) {
      dropdown.style.display = "none";
    }
  });

  // Apply the saved theme
  applyThemeSetting();
});

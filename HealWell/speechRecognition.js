// Check if the browser supports the Web Speech API (webkitSpeechRecognition)
let recognition;
if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false; // Stop once speech ends
    recognition.interimResults = false; // Only final results
    recognition.lang = 'en-US'; // Set the language to English

    // When speech starts, log it to the console
    recognition.onstart = function () {
        console.log("Speech recognition started.");
    };

    // When speech has ended, stop recognition
    recognition.onspeechend = function () {
        console.log("Speech has ended.");
        recognition.stop();
    };

    // When speech is recognized, update the value of the focused input field
    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        const activeInput = document.activeElement;
        if (activeInput && activeInput.tagName === 'INPUT') {
            activeInput.value = transcript; // Set the recognized text into the input field
        } else if (activeInput && activeInput.tagName === 'TEXTAREA') {
            activeInput.value = transcript; // If it's a textarea
        }
        console.log("Speech recognized: " + transcript);
    };

    // Error handling
    recognition.onerror = function (event) {
        console.error("Speech recognition error: ", event.error);
        alert("Error occurred: " + event.error);
    };
} else {
    alert("Speech recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge.");
}

// Function to start speech recognition when the microphone button is clicked
function startRecognition(inputFieldId) {
    const inputElement = document.getElementById(inputFieldId);
    if (inputElement) {
        inputElement.focus();  // Focus the input field to activate it
        recognition.start();   // Start the recognition
    }
}

// Attach event listeners to microphone buttons for each input field
document.getElementById('mic_first_name').addEventListener('click', function () { startRecognition('first_name'); });
document.getElementById('mic_last_name').addEventListener('click', function () { startRecognition('last_name'); });
// Repeat for other input fields like email, phone, etc.


let mic = document.querySelector("#mic");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");


function speak(text) {
    console.log("Speaking:", text); // Debugging line
    if (window.speechSynthesis.speaking) {
        console.error("Speech synthesis already speaking.");
        return; // Prevent overlapping speech
    }
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-GB"; // Change to supported language if necessary
    window.speechSynthesis.speak(text_speak);
}

function wishme() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning madam");
    } else if (hours >= 12 && hours < 16) {
        speak("Good afternoon madam");
    } else {
        speak("Good evening madam");
    }
}

window.addEventListener('load', () => {
    wishme();
});

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SpeechRecognition) {
    console.error("Speech recognition not supported in this browser.");
} else {
    let recognition = new SpeechRecognition();

    recognition.onresult = (event) => {
        let currentIndex = event.resultIndex;
        let transcript = event.results[currentIndex][0].transcript;
        content.innerText = transcript;
        takecommand(transcript.toLowerCase());
    };

    recognition.onerror = (event) => {
        console.error("Speech recognition error detected: " + event.error);
    };

    mic.addEventListener("click", () => {
        console.log("Mic button clicked"); // Debugging line
        recognition.start();
        mic.style.display = "none"
        voice.style.display = "block"
    });
}

function takecommand(message) {
    mic.style.display = "flex"
    voice.style.display = "none"
    console.log("Received message:", message);
    if (message.includes("hello")) {
        speak("Hello madam, how can I help you?");
    } else if (message.includes("who are you")) {
        speak("I am Ken, a virtual assistant created by Sana madam.");
    }
    else if (message.includes("open youtube")) {
        speak("sure,opening youtube");
        window.open("https://www.youtube.com/")
    }
    else if (message.includes("open facebook")) {
        speak("sure,opening facebook");
        window.open("https://www.facebook.com/")
    }
    else if (message.includes("open instagram")) {
        speak("sure,opening instagram");
        window.open("https://www.instagram.com/")
    }
    else if (message.includes("open google")) {
        speak("sure,opening google");
        window.open("https://www.google.com/")
    }
    else if (message.includes("open calculator")) {
        speak("sure,opening calculator");
        window.open("calculator://")
    }
    else if (message.includes("open whatsapp")) {
        speak("sure,opening whatsapp");
        window.open("whatsapp://")
    }
    else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" })
        speak(time)
    }
    else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "numeric" })
        speak(date)
    }

    else {
        speak(`this what i found ion internet regarding ${message.replace("ken", "")}`)
        window.open(`https://www.google.com/search?q=${message.replace("ken", "")}`)
    }
}

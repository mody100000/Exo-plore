import React, { useState, useEffect } from "react";
import { useChat } from "../hooks/useChat";
import { Mic, MicOff, Send } from "lucide-react";
import Planets from "./Planets";
import StarsOverlay from './starsOverlay';
import BlackHole from './blackHole';

export const UI = ({ hidden, ...props }) => {
  const { chat, loading } = useChat();
  const [isListening, setIsListening] = useState(false);
  const [recognizedSpeech, setRecognizedSpeech] = useState("");
  const [textInput, setTextInput] = useState("");
  const [usingFallback, setUsingFallback] = useState(false);
  const [currentPlanet, setCurrentPlanet] = useState(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setUsingFallback(true);
    }
  }, []);

  const startListening = () => {
    if (loading) return;

    if (usingFallback) {
      setIsListening(true);
    } else {
      setIsListening(true);
      setRecognizedSpeech("");
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setRecognizedSpeech(transcript);
        chat(transcript, currentPlanet);
      };
      recognition.onend = () => {
        setIsListening(false);
      };
      recognition.start();
    }
  };

  const handleTextSubmit = () => {
    if (textInput.trim() && !loading) {
      chat(textInput, currentPlanet);
      setTextInput("");
    }
  };

  const handlePlanetChange = (planetName) => {
    setCurrentPlanet(planetName);
  };

  if (hidden) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 z-0">
        <StarsOverlay starSize={0.004}>
          <BlackHole />
        </StarsOverlay>
      </div>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-between p-4 flex-col pointer-events-none">
        <div className="w-full pointer-events-auto">
          <Planets onPlanetChange={handlePlanetChange} />
        </div>
        <div className="flex items-center gap-2 pointer-events-auto max-w-screen-sm w-full mx-auto">
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow p-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <button
            onClick={handleTextSubmit}
            disabled={loading || !textInput.trim()}
            className={`bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-r-md ${loading || !textInput.trim() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
            <Send size={24} />
          </button>
          <button
            onClick={startListening}
            disabled={loading || usingFallback}
            className={`${isListening ? "bg-red-500 hover:bg-red-600" : "bg-indigo-700 hover:bg-indigo-500"
              } text-white p-2 rounded-md ml-2 ${loading || usingFallback ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
            {isListening ? <MicOff size={24} /> : <Mic size={24} />}
          </button>
        </div>
      </div>
    </>
  );
};
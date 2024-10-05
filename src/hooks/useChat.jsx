import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../constants/api";


const backendUrl = `${API_BASE_URL}`;

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {

  const token = JSON.parse(localStorage.getItem("auth")) || "";

  const chat = async (userMessage , currentPlanet) => {

    setLoading(true);


    const data = await fetch(`${backendUrl}/api/v1/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userMessage , currentPlanet }),
    });

    // Parse the response and extract the 'messages' property.
    const resp = (await data.json()).messages;

    // Add the received messages to the current messages state.
    setMessages((messages) => [...messages, ...resp]);
    setLoading(false);
  };

  // Initialize state variables using the 'useState' hook.
  const [messages, setMessages] = useState([]); // Stores chat messages.
  const [message, setMessage] = useState(); // Represents the current message being displayed.
  const [loading, setLoading] = useState(false); // Indicates whether a message is being sent.
  const [cameraZoomed, setCameraZoomed] = useState(true); // Indicates if the camera is zoomed.

  // Define a function to handle playing a message.
  const onMessagePlayed = () => {
    // Remove the first message from the message queue.
    setMessages((messages) => messages.slice(1));
  };

  // Use the 'useEffect' hook to update the 'message' state when the 'messages' state changes.
  useEffect(() => {
    if (messages.length > 0) {
      // If there are messages, set the 'message' state to the first message in the queue.
      setMessage(messages[0]);
    } else {
      // If there are no messages, set 'message' to null.
      setMessage(null);
    }
  }, [messages]);

  // Provide the chat-related data and functions to child components via the context.
  return (
    <ChatContext.Provider
      value={{
        chat,
        message,
        onMessagePlayed,
        loading,
        cameraZoomed,
        setCameraZoomed,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Define a custom hook for using the chat context within components.
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
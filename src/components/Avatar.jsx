import React, { useRef, useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useChat } from '../hooks/useChat'; // Assuming this is where your chat logic is

export function Avatar(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/models/x.glb");
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const audioRef = useRef(null); // Audio reference for controlling playback
  const { message, onMessagePlayed } = useChat(); // Using the chat hook
  const lastMessageRef = useRef(null); // Track the last played message

  // Load audio and play when a new message arrives
  useEffect(() => {
    // Check if the message is new before playing
    if (message && message !== lastMessageRef.current && message.audio) {
      // Ensure the audio is properly formatted as a data URL (assuming it's in base64)
      const audioSrc = `data:audio/mp3;base64,${message.audio}`; // Adjust MIME type if it's not MP3

      // Clean up any previously playing audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      // Create a new audio object and set it to the audioRef
      const audio = new Audio(audioSrc);
      audioRef.current = audio;

      audio.addEventListener('ended', () => {
        onMessagePlayed(); // Notify that the message has been played
      });

      // Play the audio and catch any potential errors
      audio.play().catch((err) => console.error("Audio playback failed:", err));

      // Update the last played message
      lastMessageRef.current = message;
    }
  }, [message, onMessagePlayed]);

  // Continuous rotation with more emphasis on X-axis and slower overall
  useFrame(() => {
    if (group.current) {
      setRotation((prevRotation) => ({
        x: (prevRotation.x + 0.002) % (Math.PI * 2), // Faster X rotation
        y: (prevRotation.y + 0.002) % (Math.PI * 10), // Slower Y rotation
      }));

      group.current.rotation.x = rotation.x;
      group.current.rotation.y = rotation.y;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      {Object.keys(nodes).map((key) => {
        const node = nodes[key];
        if (node.isMesh) {
          return <primitive key={key} object={node} material={materials[node.material.name]} />;
        }
        return null;
      })}
    </group>
  );
}

useGLTF.preload("/models/x.glb");

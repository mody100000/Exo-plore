import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

function AreYouReady() {
    const controls = useAnimation();  // Framer Motion's animation controls
    const [ref, inView] = useInView({
        threshold: 0.2,  // Trigger when 20% of the component is in view
        triggerOnce: true // Only trigger the animation once
    });

    // Trigger the animation when the component is in view
    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    const containerVariants = {
        hidden: { opacity: 0, y: 100 }, // Initial state: faded out and moved down
        visible: {
            opacity: 1,
            y: 0, // Final state: visible and in place
            transition: {
                duration: 1,
                ease: "easeInOut",
                staggerChildren: 0.2 // Stagger the children animations
            }
        }
    };

    const buttonVariants = {
        // hidden: { scale: 0 },
        visible: {
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20
            }
        }
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}  // Bind controls to the div
            variants={containerVariants}
            className="h-screen flex flex-col justify-center items-center text-white"
        >
            <motion.h2
                className="text-6xl font-bold mb-8"
                variants={containerVariants}
            >
                Are You Ready?
            </motion.h2>

            <motion.p
                className="text-xl mb-12 text-center max-w-2xl"
                variants={containerVariants}
            >
                Prepare yourself for an epic journey through the cosmos.
                Defeat the Space Bugs and save the galaxy!
            </motion.p>

            <Link to="/home">
                <motion.button
                    className="px-8 py-4 rounded-full text-2xl font-bold uppercase tracking-wider"
                    variants={buttonVariants}
                    whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        background: "linear-gradient(-45deg, #6A417E, #1f1f1f, #000000, #6A417E)",
                        backgroundSize: "400% 400%",
                        color: "#FFFFFF",
                        animation: "gradient 10s ease infinite",
                    }}
                >
                    Launch Mission
                </motion.button>
            </Link>

            <style>{`
                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}</style>
        </motion.div>
    );
}

export default AreYouReady;

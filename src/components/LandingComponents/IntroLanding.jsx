import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
};

const wordVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08 }
    }
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.5,
            delayChildren: 0.3
        }
    }
};

function IntroLanding() {
    const title = "Exo-plore";

    return (
        <motion.div
            className='h-full flex flex-col justify-center items-center'
            variants={containerVariants}
        >
            <motion.div
                variants={containerVariants}
                className="mb-8"
            >
                <motion.h1
                    className="text-9xl md:text-6xl text-center font-aldrich font-bold drop-shadow-2xl uppercase"
                    variants={wordVariants}
                >
                    {title.split('').map((char, index) => (
                        <motion.span
                            key={`${char}-${index}`}
                            variants={letterVariants}
                            className={char === 'p' ? 'text-red-900' : ''}
                        >
                            {char}
                        </motion.span>
                    ))}
                </motion.h1>
            </motion.div>

            <motion.div
                className='flex justify-center items-center'
                variants={containerVariants}
            >
                <motion.p
                    className='text-xl w-2/3 text-gray-200 mt-5 text-center mx-auto'
                    variants={letterVariants}
                >
                  Join us on a cosmic journey to explore distant worlds and ignite your creativity! 
                  Let's uncover the universe together!
                </motion.p>
            </motion.div>
            <Link to="/home">
                <motion.button
                    className="mt-8 px-6 py-3 bg-red-900 bg-opacity-80 text-white rounded-full font-bold text-lg hover:bg-opacity-100 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    variants={letterVariants}
                >
                    Start Adventure
                </motion.button>
            </Link>
        </motion.div>
    );
}

export default IntroLanding;
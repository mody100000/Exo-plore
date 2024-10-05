import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
    }
};

function Description2() {
    return (
        <motion.div
            className='relative h-full min-h-screen flex items-center justify-center py-20'
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
        >
            <div className='max-w-4xl mx-auto px-4'>
                <motion.h1
                    className="text-4xl md:text-6xl font-bold drop-shadow-2xl text-white text-center mb-8"
                    variants={itemVariants}
                >
                    Explore the Cosmos
                </motion.h1>

                <motion.p
                    className="text-xl text-gray-300 text-center mb-6"
                    variants={itemVariants}
                >
                    We inspire you to think about the possibilities of life beyond Earth.
                     What wonders await us in the cosmos beyond our solar system? 
                </motion.p>

                <motion.p
                    className="text-xl text-gray-300 text-center mb-10"
                    variants={itemVariants}
                >
                    In "Space Bugs," you'll face challenges that test your wits and reflexes.
                    Upgrade your ship, form alliances with alien races, and become the ultimate
                    cosmic explorer in this thrilling space adventure.
                </motion.p>

                <motion.div
                    className="flex justify-center"
                    variants={itemVariants}
                >
                    {/* <motion.button
                        className="px-8 py-4 bg-red-600 text-white rounded-full font-bold text-lg hover:bg-red-700 transition duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Start Your Adventure
                    </motion.button> */}
                </motion.div>
            </div>
        </motion.div>
    );
}

export default Description2;
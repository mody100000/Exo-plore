import React from "react";
import { motion } from "framer-motion";
import IntroLanding from "../components/LandingComponents/IntroLanding";
import Description from "../components/LandingComponents/Description";
import BlackHole from "../components/blackHole";
import StarsOverlay from "../components/starsOverlay";
import Description1 from "../components/LandingComponents/Description1";
import Description2 from "../components/LandingComponents/Description2";
import AreYouReady from "../components/LandingComponents/AreYouReady";
import Planets from "../components/Planets";

const LandingPage = () => {
    return (
        <div className="relative text-white">
            {/* Fixed background */}
            <div className="fixed inset-0 z-0">
                <StarsOverlay starSize={0.004}>
                    <BlackHole />
                </StarsOverlay>
            </div>

            {/* Scrollable content */}
            <div className="relative z-10">
                <motion.div
                    className="h-screen"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.8 }}
                >
                    <IntroLanding />
                </motion.div>
                <Description />
                <Description1 />
                <Description2 />
                <Planets />
                <AreYouReady />
            </div>
        </div>
    );
};

export default LandingPage;
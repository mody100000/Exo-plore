import React from "react";
import StarsOverlay from "../components/starsOverlay";
import BlackHole from "../components/blackHole";

const SpaceLayout = ({ children }) => {
    return (
        <div className="text-white absolute top-0 left-0 w-full h-full object-cover z-[-1]">
            <StarsOverlay starSize={0.002}>
                <BlackHole>{children}</BlackHole>
            </StarsOverlay>
        </div>
    );
};

export default SpaceLayout;
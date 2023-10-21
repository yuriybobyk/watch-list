import React from 'react';
import animationData from '../assets/Animation - 1697860635264.json';
import Lottie from 'lottie-react';

const Animation = () => {

    const animationWidth = 100;
    const animationHeight = 100;

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="h-[850px] w-[1000px]">
                <Lottie
                    animationData={animationData}
                    height={animationHeight}
                    width={animationWidth}
                    loop={true}
                />
            </div>
        </div>
    );
};

export {Animation}

import React from 'react'
import ScrollToTop from 'react-scroll-up';

const ScrollUp = () => {
    return (
        <ScrollToTop showUnder={160} style={{ zIndex: 1 }}>
            <div className="scroll">
                <span className="circlescoll">
                    <svg className="w-6 h-6 text-center self-center animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                    </svg>
                </span>
            </div>
        </ScrollToTop>


    )
}

export default ScrollUp;

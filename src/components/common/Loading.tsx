import React, { JSXElementConstructor, ReactElement, ReactNode, ReactPropTypes, Suspense } from 'react';
const FullscreenLoader = () => {
    return (
        /* fullscreen loading */
        <div className="flex justify-center items-center h-screen w-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-500"></div>
        </div>
    );
};

const Barloader = () => {
    return (
        <div className="w-100 top-0 start-0 zindex-9999">
            {/* animated bar */}
            <div className="animate-pulse bg-teal-500 h-1 w-100"></div>    
        </div>
    )
}

const Loadable = (Component: any, Fallback: any) => (props: any) => (
    <Suspense fallback={<Fallback />}>
        <Component {...props} />
    </Suspense>
);

export { Loadable, FullscreenLoader, Barloader }
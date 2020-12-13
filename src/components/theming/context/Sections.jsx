import React, { createContext } from 'react';

export const SectionsContext = createContext(() => {
    throw new Error('Forgot to wrap component in `SectionsProvider`');
});
if (process.env.NODE_ENV !== 'production') {
    SectionsContext.displayName = 'SectionsContext';
}



export const SectionsProvider = props => {
    const { children } = props;

    return (
        <SectionsContext.Provider>
            {children}
        </SectionsContext.Provider>
    );
};
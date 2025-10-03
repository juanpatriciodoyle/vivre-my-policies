import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {CustomThemeProvider} from './contexts/ThemeContext';
import {GlobalStyle} from './styles/globalStyles';

const root = ReactDOM.createRoot(document.getElementById('__SPNS__root') as HTMLElement);
root.render(
    <React.StrictMode>
        <CustomThemeProvider>
            <GlobalStyle/>
            <App/>
        </CustomThemeProvider>
    </React.StrictMode>
);
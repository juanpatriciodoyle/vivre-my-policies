import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {CustomThemeProvider} from './contexts/ThemeContext';
import {GlobalStyle} from './styles/globalStyles';
import {SettingsProvider} from './utils/dx/settingsContext';

const root = ReactDOM.createRoot(document.getElementById('__SPNS__root') as HTMLElement);
root.render(
    <React.StrictMode>
        <SettingsProvider>
            <CustomThemeProvider>
                <GlobalStyle/>
                <App/>
            </CustomThemeProvider>
        </SettingsProvider>
    </React.StrictMode>
);
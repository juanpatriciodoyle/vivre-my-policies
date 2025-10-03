import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {CustomThemeProvider} from './contexts/ThemeContext';
import {GlobalStyle} from './styles/globalStyles';
import {SettingsProvider} from './utils/dx/settingsContext';
import {DX_ATTRIBUTES} from "./utils/dx/dx-data";

const root = ReactDOM.createRoot(document.getElementById(DX_ATTRIBUTES.rootName) as HTMLElement);
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
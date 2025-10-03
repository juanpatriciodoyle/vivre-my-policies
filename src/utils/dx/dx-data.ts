import {Currency, Product, Theme} from './types';

export const THEMES: { value: Theme; label: string }[] = [
    {value: 'light', label: 'Light'},
    {value: 'dark', label: 'Dark'},
];

export const PRODUCTS: { value: Product; label: string }[] = [
    {value: 'Auto', label: 'Auto Insurance'},
    {value: 'Health', label: 'Health Insurance'},
];

export const CURRENCIES: { value: Currency; label: string }[] = [
    {value: 'GBP', label: 'GBP (£)'},
    {value: 'EUR', label: 'EUR (€)'},
];

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
    EUR: '€',
    GBP: '£',
};

export const DEFAULT_PRODUCT: Product = 'Auto';
export const DEFAULT_THEME: Theme = 'light';
export const DEFAULT_CURRENCY: Currency = 'GBP';

export const MODAL_DATA = {
    general: {
        title: 'Dashboard Preferences',
        saveButton: 'Save Changes',
        themeLabel: 'Theme',
        currencyLabel: 'Currency',
    },
    specific: {
        labels: {
            productLabel: 'Product View',
        },
    }
};

export const DX_ATTRIBUTES = {
    rootName: '__SPNS__root'
}
import React from 'react';
import {CURRENCIES, DEFAULT_CURRENCY, DEFAULT_PRODUCT, DEFAULT_THEME, MODAL_DATA, PRODUCTS, THEMES} from './dx-data';
import {Settings} from './types';
import ThemeSelector from '../../components/ThemeSelector';
import CurrencySelector from '../../components/CurrencySelector';

export interface SettingConfig<K extends keyof Settings> {
    key: K;
    label: string;
    defaultValue: Settings[K];
    options: ReadonlyArray<{ value: Settings[K]; label: string }>;
    component?: React.ElementType;
}

const productConfig: SettingConfig<'product'> = {
    key: 'product',
    label: MODAL_DATA.specific.labels.productLabel,
    defaultValue: DEFAULT_PRODUCT,
    options: PRODUCTS,
};

const themeConfig: SettingConfig<'theme'> = {
    key: 'theme',
    label: MODAL_DATA.general.themeLabel,
    defaultValue: DEFAULT_THEME,
    options: THEMES,
    component: ThemeSelector,
};

const currencyConfig: SettingConfig<'currency'> = {
    key: 'currency',
    label: MODAL_DATA.general.currencyLabel,
    defaultValue: DEFAULT_CURRENCY,
    options: CURRENCIES,
    component: CurrencySelector,
};

export const settingsConfig = {
    product: productConfig,
    theme: themeConfig,
    currency: currencyConfig,
};

export const settingsConfigArray = Object.values(settingsConfig);
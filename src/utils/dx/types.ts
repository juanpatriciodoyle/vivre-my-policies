export type Currency = 'EUR' | 'GBP';
export type Product = 'Auto' | 'Health';
export type Theme = 'light' | 'dark';

export interface Settings {
    product: Product;
    theme: Theme;
    currency: Currency;
}
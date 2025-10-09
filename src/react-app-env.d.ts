export { };

declare global {
    interface Window {
        __SPNS__appConfig?: {
            isEditor: string;
        };
    }
}
export { };

declare global {
    interface Window {
        appConfig?: {
            userUid: string;
        };
    }
}
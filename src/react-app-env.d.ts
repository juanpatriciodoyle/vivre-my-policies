export { };

declare global {
    interface Window {
        appConfig?: {
            userCn: string;
        };
    }
}
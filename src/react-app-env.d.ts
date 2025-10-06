export { };

declare global {
    interface Window {
        __SPNS__userUid?: string;
        appConfig?: {
            userUid: string;
            userCn: string;
        };
    }
}
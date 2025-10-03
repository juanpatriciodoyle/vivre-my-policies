export const getRelativeDate = (offsetDays: number): Date => {
    const date = new Date('2025-10-03T12:00:00Z');
    date.setDate(date.getDate() + offsetDays);
    return date;
};

export const formatDate = (date: Date, options?: Intl.DateTimeFormatOptions): string => {
    const defaultOptions: Intl.DateTimeFormatOptions = {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    };
    return date.toLocaleDateString('en-GB', options || defaultOptions);
};
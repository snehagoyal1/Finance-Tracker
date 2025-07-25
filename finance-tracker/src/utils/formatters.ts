// src/utils/formatters.ts

/**
 * Formats a date string (YYYY-MM-DD) into a more readable format.
 * @param dateString The date string to format.
 * @returns A formatted date string (e.g., "Jul 25, 2025").
 */
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    // Adjust for timezone offset to prevent date from shifting
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(date.getTime() + userTimezoneOffset);
    
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(adjustedDate);
};

/**
 * Formats a number into a currency string for Indian Rupees.
 * @param amount The number to format.
 * @returns A formatted currency string (e.g., "₹1,000.00").
 */
export const formatCurrency = (amount: number): string => {
    // This is the only part that needs to change
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR', // Changed from 'USD'
    }).format(amount);
};

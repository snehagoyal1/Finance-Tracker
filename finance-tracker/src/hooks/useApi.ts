import { useState } from 'react';
import { AxiosResponse } from 'axios';

// Define the shape of the state returned by the hook
interface ApiState<T> {
    data: T | null;
    error: string | null;
    loading: boolean;
}

// The hook itself
export const useApi = <T, P extends any[]>(
    apiFunc: (...args: P) => Promise<AxiosResponse<T>>
) => {
    const [state, setState] = useState<ApiState<T>>({
        data: null,
        error: null,
        loading: false,
    });

    // The function that will be called to trigger the API request
    const request = async (...args: P): Promise<void> => {
        setState({ ...state, loading: true, error: null });
        try {
            const result = await apiFunc(...args);
            setState({ ...state, data: result.data, loading: false });
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'An unexpected error occurred.';
            setState({ ...state, error: errorMessage, loading: false });
        }
    };

    return {
        data: state.data,
        error: state.error,
        loading: state.loading,
        request,
    };
};
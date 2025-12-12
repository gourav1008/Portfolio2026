import { create } from 'zustand';

interface AppState {
    selectedProjectId: string | null;
    isLoaded: boolean;

    // Actions
    setSelectedProjectId: (id: string | null) => void;
    setIsLoaded: (isLoaded: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
    selectedProjectId: null,
    isLoaded: false,

    setSelectedProjectId: (id) => set({ selectedProjectId: id }),
    setIsLoaded: (isLoaded) => set({ isLoaded }),
}));

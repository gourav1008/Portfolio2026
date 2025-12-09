import { create } from 'zustand';

interface AppState {
    isChatOpen: boolean;
    selectedProjectId: string | null;

    // Actions
    setChatOpen: (isOpen: boolean) => void;
    toggleChat: () => void;
    setSelectedProjectId: (id: string | null) => void;
}

export const useStore = create<AppState>((set) => ({
    isChatOpen: false,
    selectedProjectId: null,

    setChatOpen: (isOpen) => set({ isChatOpen: isOpen }),
    toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),
    setSelectedProjectId: (id) => set({ selectedProjectId: id }),
}));

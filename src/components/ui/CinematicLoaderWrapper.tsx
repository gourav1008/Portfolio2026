"use client";

import dynamic from "next/dynamic";
import { Scene3DProvider } from "@/hooks/useScene3D";

const CinematicLoader = dynamic(() => import("./CinematicLoader"), {
    ssr: false,
    loading: () => <div className="fixed inset-0 z-[100] bg-[#020205]" />,
});

export default function CinematicLoaderWrapper({ children }: { children?: React.ReactNode }) {
    return (
        <Scene3DProvider>
            <CinematicLoader />
            {children}
        </Scene3DProvider>
    );
}

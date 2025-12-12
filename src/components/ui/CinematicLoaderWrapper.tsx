"use client";

import dynamic from "next/dynamic";

const CinematicLoader = dynamic(() => import("./CinematicLoader"), {
    ssr: false,
    loading: () => <div className="fixed inset-0 z-[100] bg-[#020205]" />,
});

export default function CinematicLoaderWrapper() {
    return <CinematicLoader />;
}

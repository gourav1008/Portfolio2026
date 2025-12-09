import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
            <h1 className="text-6xl font-bold text-neon-cyan mb-4">404</h1>
            <p className="text-xl text-gray-400 mb-8">System Malfunction: Sector Not Found</p>
            <Link
                href="/"
                className="px-6 py-3 rounded-full border border-neon-purple/50 bg-neon-purple/10 text-neon-purple hover:bg-neon-purple hover:text-white transition-all"
            >
                Return to Base
            </Link>
        </div>
    );
}

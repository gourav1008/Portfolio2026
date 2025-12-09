"use client";

import { motion } from "framer-motion";
import { profileData } from "@/lib/profileData";

export default function AboutCard() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative p-1 rounded-2xl bg-gradient-to-br from-neon-cyan/50 to-neon-purple/50"
        >
            <div className="relative p-6 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 overflow-hidden">
                {/* Glow Effect */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-neon-cyan/30 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-40 h-35 bg-neon-purple/30 rounded-full blur-3xl pointer-events-none" />

                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                    ABOUT <span className="text-neon-cyan">ME</span>
                </h2>

                <p className="font-body text-gray-300 leading-relaxed mb-4">
                    {profileData.bio}
                </p>

                <p className="font-body text-gray-300 leading-relaxed mb-6 italic">
                    <span className="text-neon-purple font-semibold">💡 My mission:</span> {profileData.mission}
                </p>

                <div className="flex gap-4 mb-6">
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-white">1+</span>
                        <span className="text-xs text-gray-400 uppercase tracking-wider">Years Exp.</span>
                    </div>
                    <div className="w-px h-10 bg-white/20" />
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-white">10+</span>
                        <span className="text-xs text-gray-400 uppercase tracking-wider">Projects</span>
                    </div>
                </div>

                {/* Education Section */}
                <div className="mt-6 pt-6 border-t border-white/10">
                    <h3 className="text-lg font-bold text-white mb-2">
                        <span className="text-neon-cyan">🎓</span> Education
                    </h3>
                    <p className="text-gray-300 font-semibold">{profileData.education.degree}</p>
                    <p className="text-gray-400 text-sm">{profileData.education.institution}</p>
                    <p className="text-gray-500 text-xs">{profileData.education.period}</p>
                </div>

                {/* Work Experience */}
                <div className="mt-6 pt-6 border-t border-white/10">
                    <h3 className="text-lg font-bold text-white mb-2">
                        <span className="text-neon-cyan">💼</span> Current Role
                    </h3>
                    <p className="text-gray-300 font-semibold">{profileData.experience.title}</p>
                    <p className="text-gray-400 text-sm">{profileData.experience.company}</p>
                    <p className="text-gray-500 text-xs">{profileData.experience.period}</p>
                </div>
            </div>
        </motion.div>
    );
}

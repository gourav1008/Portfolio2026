"use client";

import { motion } from "framer-motion";
import { useResponsive } from "@/hooks/useResponsive";
import { profileData } from "@/lib/profileData";

export default function AboutCard() {
    const { isMobile, isTablet } = useResponsive();

    const padding = isMobile ? 'p-4' : isTablet ? 'p-5' : 'p-6';
    const titleSize = isMobile ? 'text-xl' : isTablet ? 'text-2xl' : 'text-3xl md:text-4xl';
    const bodyTextSize = isMobile ? 'text-sm' : isTablet ? 'text-base' : 'text-base';

    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative p-1 rounded-lg sm:rounded-2xl bg-gradient-to-br from-neon-cyan/50 to-neon-purple/50"
        >
            <div className={`relative ${padding} rounded-lg sm:rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 overflow-hidden`}>
                {/* Glow Effect - Scaled for mobile */}
                <div className={`absolute -top-20 -right-20 ${isMobile ? 'w-24 h-24' : 'w-40 h-40'} bg-neon-cyan/30 rounded-full blur-3xl pointer-events-none`} />
                <div className={`absolute -bottom-20 -left-20 ${isMobile ? 'w-20 h-20' : 'w-40 h-35'} bg-neon-purple/30 rounded-full blur-3xl pointer-events-none`} />

                <h2 className={`font-display ${titleSize} font-bold text-white mb-3 sm:mb-4`}>
                    ABOUT <span className="text-neon-cyan">ME</span>
                </h2>

                <p className={`font-body ${bodyTextSize} text-gray-300 leading-relaxed mb-3 sm:mb-4`}>
                    {profileData.bio}
                </p>

                <p className={`font-body ${bodyTextSize} text-gray-300 leading-relaxed mb-4 sm:mb-6 italic`}>
                    <span className="text-neon-purple font-semibold">💡 My mission:</span> {profileData.mission}
                </p>

                <div className={`flex gap-4 mb-4 sm:mb-6 ${isMobile ? 'justify-center' : ''}`}>
                    <div className="flex flex-col">
                        <span className={`font-bold text-white ${isMobile ? 'text-lg' : 'text-2xl'}`}>1+</span>
                        <span className={`${isMobile ? 'text-xs' : 'text-xs'} text-gray-400 uppercase tracking-wider`}>Years Exp.</span>
                    </div>
                    <div className="w-px h-10 bg-white/20" />
                    <div className="flex flex-col">
                        <span className={`font-bold text-white ${isMobile ? 'text-lg' : 'text-2xl'}`}>10+</span>
                        <span className={`${isMobile ? 'text-xs' : 'text-xs'} text-gray-400 uppercase tracking-wider`}>Projects</span>
                    </div>
                </div>

                {/* Education Section */}
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/10">
                    <h3 className={`text-base sm:text-lg font-bold text-white mb-2`}>
                        <span className="text-neon-cyan">🎓</span> Education
                    </h3>
                    <p className={`text-gray-300 font-semibold ${bodyTextSize}`}>{profileData.education.degree}</p>
                    <p className={`text-gray-400 text-xs sm:text-sm`}>{profileData.education.institution}</p>
                    <p className={`text-gray-500 text-xs`}>{profileData.education.period}</p>
                </div>

                {/* Work Experience */}
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/10">
                    <h3 className={`text-base sm:text-lg font-bold text-white mb-2`}>
                        <span className="text-neon-cyan">💼</span> Current Role
                    </h3>
                    <p className={`text-gray-300 font-semibold ${bodyTextSize}`}>{profileData.experience.title}</p>
                    <p className={`text-gray-400 text-xs sm:text-sm`}>{profileData.experience.company}</p>
                    <p className="text-gray-500 text-xs">{profileData.experience.period}</p>
                </div>
            </div>
        </motion.div>
    );
}

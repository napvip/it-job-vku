"use client";

import { motion } from "framer-motion";
import { Sparkles, Code2, Network } from "lucide-react";

export function WelcomeSection() {
  return (
    <div className="bg-[#ECF4D6] border-b border-[#9AD0C2]">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 text-center lg:text-left"
          >
            <h1 className="text-[#265073] mb-3">
              Xin chào, Nguyễn Văn An! 👋
            </h1>
            <p className="text-[#2D9596] text-xl">
              Hôm nay là một ngày tuyệt vời để khám phá cơ hội mới trong ngành IT.
            </p>
          </motion.div>

          {/* Right Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative w-48 h-48"
          >
            {/* Central Developer Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-gradient-to-br from-[#2D9596] to-[#265073] rounded-full flex items-center justify-center shadow-xl">
                <Code2 className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Orbiting AI Nodes */}
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0"
            >
              {/* Node 1 */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#9AD0C2] rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-[#265073]" />
              </div>

              {/* Node 2 */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#9AD0C2] rounded-full flex items-center justify-center shadow-lg">
                <Network className="w-6 h-6 text-[#265073]" />
              </div>

              {/* Node 3 */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#2D9596] rounded-full shadow-lg" />

              {/* Node 4 */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#2D9596] rounded-full shadow-lg" />
            </motion.div>

            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full">
              <motion.circle
                cx="96"
                cy="96"
                r="80"
                fill="none"
                stroke="#9AD0C2"
                strokeWidth="2"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2 }}
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </div>
  );
}



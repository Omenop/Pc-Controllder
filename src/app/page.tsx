"use client";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePopup } from "@/hook/usePopup";

export default function Home() {
  const [stars, setStars] = useState<
    { id: number; size: number; x: number; y: number; duration: number }[]
  >([]);
  const [flashMessage, setFlashMessage] = useState("");
  const [showFlash, setShowFlash] = useState(false);

  // Example: Use the popup hook
  const { sendPopup, loading, error, successMessage } = usePopup();

  useEffect(() => {
    setStars(
      Array.from({ length: 100 }).map((_, i) => ({
        id: i,
        size: Math.random() * 3,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 5 + 2,
      }))
    );
  }, []);

  const handleFlashMessage = () => {
    if (!flashMessage) return;
    // Optionally, display the flash message on the UI
    setShowFlash(true);
    // Send popup request using the hook
    sendPopup(flashMessage);
    setTimeout(() => setShowFlash(false), 2000);
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Header />
      <div className="absolute inset-0">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute bg-white rounded-full opacity-75"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              top: `${star.y}%`,
              left: `${star.x}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row justify-center items-center min-h-screen px-6 gap-6">
        <div className="flex flex-col w-full lg:w-1/2 gap-6 bg-gray-900 p-6 rounded-lg shadow-lg">
          <div className="flex-1 bg-gray-800 p-4 rounded-md">
            <h2 className="text-lg font-semibold">Flash Message</h2>
            <input
              type="text"
              placeholder="Enter message..."
              className="w-full p-2 mt-2 bg-gray-700 border border-gray-600 rounded-md text-white"
              value={flashMessage}
              onChange={(e) => setFlashMessage(e.target.value)}
            />
            <button
              onClick={handleFlashMessage}
              className="mt-3 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
              disabled={loading}
            >
              {loading ? "Sending..." : "Flash Message"}
            </button>
            {error && <p className="mt-2 text-red-400">{error}</p>}
            {successMessage && <p className="mt-2 text-green-400">{successMessage}</p>}
          </div>
        </div>

        <div className="flex flex-col w-full lg:w-1/2 gap-6 bg-gray-900 p-6 rounded-lg shadow-lg">
          <div className="flex-1 bg-gray-800 p-4 rounded-md">
            <h2 className="text-lg font-semibold">Application Control</h2>
            <input
              type="text"
              placeholder="Enter app name (e.g., notepad)"
              className="w-full p-2 mt-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            />
            <div className="flex gap-2 mt-3">
              <button className="w-1/2 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition">
                Open
              </button>
              <button className="w-1/2 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {showFlash && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80"
        >
          <h1 className="text-4xl font-bold text-white">{flashMessage}</h1>
        </motion.div>
      )}
    </div>
  );
}

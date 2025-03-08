import { useState } from "react";
import { usePcControl } from "@/hook/usePcControl";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { sendCommand, loading } = usePcControl();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-black/50 backdrop-blur-md border-b border-gray-800 shadow-md z-50">
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        <h2 className="text-white text-lg font-semibold">Control Panel</h2>

        <div className="hidden md:flex gap-3">
          <button
            onClick={() => sendCommand("shutdown")}
            className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg transition"
            disabled={loading}
          >
            Shutdown
          </button>
          <button
            onClick={() => sendCommand("restart")}
            className="px-4 py-2 bg-yellow-700 hover:bg-yellow-600 text-white rounded-lg transition"
            disabled={loading}
          >
            Restart
          </button>
          <button
            onClick={() => sendCommand("sleep")}
            className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-lg transition"
            disabled={loading}
          >
            Sleep
          </button>
        </div>

        <motion.button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          animate={{ rotate: menuOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden flex flex-col items-center gap-3 bg-black/70 p-4"
          >
            <button
              onClick={() => sendCommand("shutdown")}
              className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg transition"
              disabled={loading}
            >
              Shutdown
            </button>
            <button
              onClick={() => sendCommand("restart")}
              className="px-4 py-2 bg-yellow-700 hover:bg-yellow-600 text-white rounded-lg transition"
              disabled={loading}
            >
              Restart
            </button>
            <button
              onClick={() => sendCommand("sleep")}
              className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-lg transition"
              disabled={loading}
            >
              Sleep
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
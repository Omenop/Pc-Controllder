import { useState } from "react";

const API_URL = "/api/control";

export function usePcControl() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendCommand = async (action: "shutdown" | "restart" | "sleep") => {
    setLoading(true);
    setError(null);

    try {
      console.log(`Sending action: ${action}`); // ✅ Debugging

      const response = await fetch("/api/control", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      const data = await response.json();
      console.log("Server Response:", data); // ✅ Debugging

      if (!response.ok) throw new Error(data.message || "Failed to execute command");

    } catch (err) {
      console.error("Hook Error:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return { sendCommand, loading, error };
}

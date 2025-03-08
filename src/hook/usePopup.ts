import { useState } from "react";

const POPUP_API_URL = "/api/popupText";

export function usePopup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const sendPopup = async (message: string) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(POPUP_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to send popup");
      }
      setSuccessMessage(`Popup sent: "${message}"`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return { sendPopup, loading, error, successMessage };
}

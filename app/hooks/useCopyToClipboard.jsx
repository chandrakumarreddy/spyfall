import { useEffect, useState } from "react";

function useCopyToClipboard(duration = 1500) {
  const [copiedText, setCopiedText] = useState(null);

  useEffect(() => {
    if (copiedText) {
      setTimeout(() => {
        setCopiedText("");
      }, duration);
    }
  }, [copiedText, duration]);

  const copy = async (text) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      return true;
    } catch (error) {
      console.warn("Copy failed", error);
      setCopiedText(null);
      return false;
    }
  };

  return [copiedText, copy];
}

export default useCopyToClipboard;

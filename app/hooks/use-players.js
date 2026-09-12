"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function usePlayers() {
  const [players, setPlayers] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [hasData, setHasData] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const startedRef = useRef(false);
  const loadingRef = useRef(false);

  const loadPlayers = useCallback(async (cursor = null) => {
    if (loadingRef.current) return;

    loadingRef.current = true;
    setLoading(true);
    setError("");

    try {
      const query = cursor ? `?cursor=${encodeURIComponent(cursor)}` : "";
      const response = await fetch(`/api/players${query}`);
      const payload = await response.json();

      //console.log("payload res",payload)

      if (!response.ok) {
        throw new Error(payload.error || "unable to load players.");
      }

      setPlayers((current) => {
        const byId = new Map(current.map((player) => [player.id, player]));
        payload.data.forEach((player) => byId.set(player.id, player));
        return [...byId.values()];
      });

      setNextCursor(payload.meta?.next_cursor ?? null);
      setHasData(Boolean(payload.meta?.next_cursor));
      
    } catch (requestError) {
      setError(requestError.message || "unable to load players.");
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    loadPlayers();
  }, [loadPlayers]);

  return {
    players,
    loading,
    error,
    hasData,
    loadMore: () => loadPlayers(nextCursor),
    retry: () => loadPlayers(nextCursor),
  };
}

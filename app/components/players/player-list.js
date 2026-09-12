"use client";

import { useMemo } from "react";
import { getPlayerName, getPlayerTeam } from "../../lib/players";
import { UsersIcon } from "../ui/icons";

function PlayerSkeleton() {
  return (
    <div className="flex animate-pulse items-center gap-4 px-5 py-4">
      <div className="size-10 rounded-full bg-zinc-100" />
      <div className="flex-1"><div className="h-3 w-32 rounded bg-zinc-100" /><div className="mt-2 h-2.5 w-48 rounded bg-zinc-100" /></div>
      <div className="h-6 w-16 rounded-full bg-zinc-100" />
    </div>
  );
}

export default function PlayerList({ players, teams, loading, error, hasData, onLoadMore, onViewPlayer }) {
  const assignedTeamByPlayer = useMemo(() => {
    const assignments = new Map();
    teams.forEach((team) => team.players.forEach((player) => assignments.set(player.id, team.name)));
    return assignments;
  }, [teams]);

  return (
    <section id="players" className="scroll-mt-6 rounded-2xl border border-zinc-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <div className="border-b border-zinc-100 px-5 py-5 sm:px-6">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400">Player directory</p>
          <h2 className="mt-1 text-lg font-semibold tracking-[-0.025em]">Discover players</h2>
        </div>
      </div>

      <div className="divide-y divide-zinc-100">
        {players.map((player) => {
          const assignedTeam = assignedTeamByPlayer.get(player.id);
          return (
            <div key={player.id} className="flex items-center gap-3 px-5 py-4 transition hover:bg-zinc-50/70 sm:gap-4 sm:px-6">
              <div className="grid size-10 shrink-0 place-items-center rounded-full bg-zinc-100 text-xs font-bold text-zinc-700">
                {player.first_name?.[0]}{player.last_name?.[0]}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-zinc-900">{getPlayerName(player)}</p>
                <p className="mt-0.5 truncate text-xs text-zinc-500">{player.position || "Position —"} · {getPlayerTeam(player)}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {assignedTeam ? (
                  <span className="hidden max-w-28 truncate rounded-full bg-zinc-950 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white sm:block sm:max-w-40">{assignedTeam}</span>
                ) : (
                  <span className="hidden rounded-full border border-zinc-200 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 sm:block">Available</span>
                )}
                <button type="button" onClick={() => onViewPlayer(player)} className="h-8 rounded-lg border border-zinc-200 bg-white px-3 text-xs font-semibold text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950">Details</button>
              </div>
            </div>
          );
        })}

        {loading && players.length === 0 && <><PlayerSkeleton /><PlayerSkeleton /><PlayerSkeleton /></>}
        {!loading && !error && players.length === 0 && (
          <div className="grid place-items-center px-6 py-14 text-center">
            <UsersIcon className="size-7 text-zinc-300" />
            <p className="mt-3 text-sm font-medium text-zinc-700">No players found</p>
            <p className="mt-1 text-xs text-zinc-400">No player data is available.</p>
          </div>
        )}
      </div>

      <div className="border-t border-zinc-100 bg-zinc-50/60 px-5 py-4 text-center sm:px-6">
        {error && <p role="alert" className="mb-3 text-sm text-red-700">{error}</p>}
        {(hasData || error) && (
          <button type="button" onClick={onLoadMore} disabled={loading} className="h-10 rounded-lg border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-800 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 disabled:cursor-wait disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950">
            {loading ? "Loading…" : error ? "Try again" : "Load 10 more players"}
          </button>
        )}
        {!hasData && !error && players.length > 0 && <p className="text-xs text-zinc-400">You have reached the end of the directory.</p>}
      </div>
    </section>
  );
}

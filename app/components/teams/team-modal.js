"use client";

import { useMemo, useState } from "react";
import { compactPlayer, getPlayerName, getPlayerTeam } from "../../lib/players";
import { validateTeam } from "../../lib/team-validation";
import { CheckIcon } from "../ui/icons";
import Modal from "../ui/modal";

function FieldError({ children }) {
  return <p role="alert" className="mt-1.5 text-xs font-medium text-red-700">{children}</p>;
}

export default function TeamModal({ team, teams, players, loading, apiError, hasData, onLoadMore, onClose, onSave }) {
  const [form, setForm] = useState(() => ({
    name: team?.name || "",
    region: team?.region || "",
    country: team?.country || "",
    playerIds: team?.players.map((player) => player.id) || [],
  }));
  const [errors, setErrors] = useState({});

  const assignedTeamByPlayer = useMemo(() => {
    const assignments = new Map();
    teams.forEach((existingTeam) => {
      existingTeam.players.forEach((player) => assignments.set(player.id, existingTeam));
    });
    return assignments;
  }, [teams]);

  const candidatePlayers = useMemo(() => {
    const byId = new Map(players.map((player) => [player.id, player]));
    team?.players.forEach((player) => byId.set(player.id, player));
    return [...byId.values()];
  }, [players, team]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: "" }));
  }

  function togglePlayer(player) {
    const assignedTeam = assignedTeamByPlayer.get(player.id);
    if (assignedTeam && assignedTeam.id !== team?.id) return;

    setForm((current) => ({
      ...current,
      playerIds: current.playerIds.includes(player.id)
        ? current.playerIds.filter((id) => id !== player.id)
        : [...current.playerIds, player.id],
    }));
    if (errors.players) setErrors((current) => ({ ...current, players: "" }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateTeam(form, teams, team?.id);

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const playerById = new Map(candidatePlayers.map((player) => [player.id, player]));
    onSave({
      id: team?.id || globalThis.crypto?.randomUUID?.() || `${Date.now()}`,
      name: form.name.trim().replace(/\s+/g, " "),
      region: form.region.trim(),
      country: form.country.trim(),
      playerCount: form.playerIds.length,
      players: form.playerIds.map((id) => compactPlayer(playerById.get(id))).filter(Boolean),
      createdAt: team?.createdAt || new Date().toISOString(),
    });
  }

  return (
    <Modal title={team ? "Edit team" : "Create a team"} description="Team names must be unique, and each player can belong to only one team." onClose={onClose}>
      <form className="flex min-h-0 flex-1 flex-col" onSubmit={handleSubmit} noValidate>
        <div className="overflow-y-auto px-6 py-6 sm:px-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="sm:col-span-2">
              <span className="mb-2 block text-sm font-medium text-zinc-800">Team name</span>
              <input value={form.name} onChange={(event) => updateField("name", event.target.value)} placeholder="e.g. SST" autoFocus aria-invalid={Boolean(errors.name)} className="form-input" />
              {errors.name && <FieldError>{errors.name}</FieldError>}
            </label>
            <label>
              <span className="mb-2 block text-sm font-medium text-zinc-800">Region</span>
              <input value={form.region} onChange={(event) => updateField("region", event.target.value)} placeholder="e.g. West" aria-invalid={Boolean(errors.region)} className="form-input" />
              {errors.region && <FieldError>{errors.region}</FieldError>}
            </label>
            <label>
              <span className="mb-2 block text-sm font-medium text-zinc-800">Country</span>
              <input value={form.country} onChange={(event) => updateField("country", event.target.value)} placeholder="e.g. USA" aria-invalid={Boolean(errors.country)} className="form-input" />
              {errors.country && <FieldError>{errors.country}</FieldError>}
            </label>
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3.5 sm:col-span-2">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-zinc-800">Player count</p>
                  <p className="mt-0.5 text-xs text-zinc-500">Updates automatically from the players selected below.</p>
                </div>
                <output
                  name="playerCount"
                  aria-label={`${form.playerIds.length} players selected`}
                  aria-live="polite"
                  className="grid min-w-12 place-items-center rounded-lg bg-white px-3 py-2 text-xl font-semibold tracking-[-0.04em] text-zinc-950 ring-1 ring-zinc-200"
                >
                  {form.playerIds.length}
                </output>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-zinc-100 pt-7">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-zinc-950">Choose players</h3>
                <p className="mt-1 text-xs text-zinc-500">Select available players. Assigned players are locked.</p>
              </div>
              <span className="shrink-0 rounded-full bg-zinc-950 px-2.5 py-1 text-[11px] font-semibold text-white">{form.playerIds.length} selected</span>
            </div>

            {errors.players && (
              <div role="alert" className="mb-3 flex items-center gap-2.5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm font-medium text-red-800">
                <span aria-hidden="true" className="grid size-5 shrink-0 place-items-center rounded-full bg-red-100 text-xs font-bold">!</span>
                {errors.players}
              </div>
            )}

            <div className="overflow-hidden rounded-xl border border-zinc-200">
              <div className="max-h-72 divide-y divide-zinc-100 overflow-y-auto">
                {candidatePlayers.map((player) => {
                  const selected = form.playerIds.includes(player.id);
                  const assignedTeam = assignedTeamByPlayer.get(player.id);
                  const unavailable = assignedTeam && assignedTeam.id !== team?.id;

                  return (
                    <button key={player.id} type="button" disabled={unavailable} onClick={() => togglePlayer(player)} className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-45">
                      <span className={`grid size-8 shrink-0 place-items-center rounded-full text-[11px] font-bold ${selected ? "bg-zinc-950 text-white" : "bg-zinc-100 text-zinc-600"}`}>
                        {selected ? <CheckIcon className="size-4" /> : `${player.first_name?.[0] || ""}${player.last_name?.[0] || ""}`}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-zinc-900">{getPlayerName(player)}</span>
                        <span className="block truncate text-xs text-zinc-500">{player.position || "No position"} · {getPlayerTeam(player)}</span>
                      </span>
                      {unavailable && <span className="max-w-28 truncate text-[10px] font-semibold uppercase tracking-wider text-zinc-400">{assignedTeam.name}</span>}
                    </button>
                  );
                })}
                {!loading && candidatePlayers.length === 0 && <p className="px-4 py-10 text-center text-sm text-zinc-500">No player data is available.</p>}
                {loading && players.length === 0 && <p className="px-4 py-10 text-center text-sm text-zinc-500">Loading players…</p>}
              </div>
              {(hasData || apiError) && (
                <div className="border-t border-zinc-100 bg-zinc-50 p-3 text-center">
                  {apiError ? <p className="mb-2 text-xs text-red-700">{apiError}</p> : null}
                  <button type="button" onClick={onLoadMore} disabled={loading} className="text-xs font-semibold text-zinc-700 hover:text-zinc-950 disabled:opacity-50">{loading ? "Loading…" : apiError ? "Try again" : "Load 10 more players"}</button>
                </div>
              )}
            </div>
          </div>
        </div>

        <footer className="flex shrink-0 justify-end gap-3 border-t border-zinc-100 bg-zinc-50/70 px-6 py-4 sm:px-8">
          <button type="button" onClick={onClose} className="h-10 rounded-lg border border-zinc-200 bg-white px-4 text-sm font-semibold transition hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950">Cancel</button>
          <button type="submit" className="h-10 rounded-lg bg-zinc-950 px-5 text-sm font-semibold text-white transition hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950">{team ? "Save changes" : "Create team"}</button>
        </footer>
      </form>
    </Modal>
  );
}

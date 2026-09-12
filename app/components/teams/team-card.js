import { EditIcon, GlobeIcon, TrashIcon, UsersIcon } from "../ui/icons";

export default function TeamCard({ team, onEdit, onDelete, onViewPlayer }) {
  const initials = team.name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <article className="group flex min-h-64 flex-col rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-[0_12px_35px_-20px_rgba(0,0,0,0.28)]">
      <div className="flex items-start justify-between gap-4">
        <div className="grid size-11 place-items-center rounded-xl bg-zinc-950 text-sm font-bold tracking-[-0.03em] text-white">{initials || "T"}</div>
        <div className="flex gap-1 opacity-70 transition group-hover:opacity-100">
          <button type="button" onClick={() => onEdit(team)} aria-label={`Edit ${team.name}`} className="grid size-9 place-items-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-zinc-950">
            <EditIcon className="size-4" />
          </button>
          <button type="button" onClick={() => onDelete(team)} aria-label={`Delete ${team.name}`} className="grid size-9 place-items-center rounded-lg text-zinc-500 transition hover:bg-red-50 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-red-700">
            <TrashIcon className="size-4" />
          </button>
        </div>
      </div>

      <h3 className="mt-5 truncate text-lg font-semibold tracking-[-0.025em]">{team.name}</h3>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500">
        <span className="inline-flex items-center gap-1.5"><GlobeIcon className="size-3.5" />{team.region}, {team.country}</span>
        <span className="inline-flex items-center gap-1.5"><UsersIcon className="size-3.5" />{team.players.length} {team.players.length === 1 ? "player" : "players"}</span>
      </div>

      <div className="mt-auto border-t border-zinc-100 pt-4">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-400">Players</p>
        <div className="flex flex-wrap gap-1.5">
          {team.players.slice(0, 3).map((player) => (
            <button key={player.id} type="button" onClick={() => onViewPlayer(player)} className="max-w-36 truncate rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-medium text-zinc-700 transition hover:bg-zinc-200">
              {player.first_name} {player.last_name}
            </button>
          ))}
          {team.players.length > 3 && <span className="rounded-full bg-zinc-950 px-2.5 py-1 text-[11px] font-medium text-white">+{team.players.length - 3}</span>}
        </div>
      </div>
    </article>
  );
}

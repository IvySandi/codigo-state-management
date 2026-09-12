import { getPlayerName, getPlayerTeam } from "../../lib/players";
import Modal from "../ui/modal";

function Detail({ label, value }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3">
      <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">{label}</dt>
      <dd className="mt-1.5 truncate text-sm font-semibold text-zinc-900">{value || "Not available"}</dd>
    </div>
  );
}

export default function PlayerDetailsModal({ player, onClose }) {
  const initials = `${player.first_name?.[0] || ""}${player.last_name?.[0] || ""}`;

  return (
    <Modal title="Player details" description="Complete information provided by BALLDONTLIE." onClose={onClose} size="medium">
      <div className="overflow-y-auto px-6 py-6 sm:px-8">
        <div className="flex items-center gap-4 border-b border-zinc-100 pb-6">
          <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-zinc-950 text-sm font-bold text-white">{initials}</div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-xl font-semibold tracking-[-0.03em] text-zinc-950">{getPlayerName(player)}</h3>
              {player.jersey_number && <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-semibold text-zinc-600">#{player.jersey_number}</span>}
            </div>
            <p className="mt-1 truncate text-sm text-zinc-500">{getPlayerTeam(player)}</p>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Detail label="Player ID" value={player.id} />
          <Detail label="First name" value={player.first_name} />
          <Detail label="Last name" value={player.last_name} />
          <Detail label="Position" value={player.position} />
          <Detail label="Height" value={player.height} />
          <Detail label="Weight" value={player.weight ? `${player.weight} lbs` : null} />
          <Detail label="Jersey" value={player.jersey_number ? `#${player.jersey_number}` : null} />
          <Detail label="Country" value={player.country} />
          <Detail label="College" value={player.college} />
          <Detail label="Draft year" value={player.draft_year} />
          <Detail label="Draft round" value={player.draft_round} />
          <Detail label="Draft pick" value={player.draft_number} />
        </dl>

        <div className="mt-6 rounded-2xl bg-zinc-950 px-5 py-5 text-white">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">NBA team</p>
          <div className="mt-3 flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold">{getPlayerTeam(player)}</p>
              <p className="mt-1 text-xs text-zinc-400">{player.team?.city || "City not available"}</p>
            </div>
            {player.team?.abbreviation && <span className="rounded-lg bg-white/10 px-2.5 py-1 text-xs font-bold">{player.team.abbreviation}</span>}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/10 pt-4 text-xs">
            <div><span className="block text-zinc-500">Team ID</span><span className="mt-1 block font-medium">{player.team?.id || "Not available"}</span></div>
            <div><span className="block text-zinc-500">Team name</span><span className="mt-1 block font-medium">{player.team?.name || "Not available"}</span></div>
            <div><span className="block text-zinc-500">Conference</span><span className="mt-1 block font-medium">{player.team?.conference || "Not available"}</span></div>
            <div><span className="block text-zinc-500">Division</span><span className="mt-1 block font-medium">{player.team?.division || "Not available"}</span></div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

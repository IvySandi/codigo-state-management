import Modal from "../ui/modal";

export default function DeleteTeamModal({ team, onClose, onConfirm }) {
  return (
    <Modal title="Delete team?" description="This action removes the team and releases every assigned player." onClose={onClose} size="small">
      <div className="px-6 py-6 sm:px-8">
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3">
          <p className="font-semibold text-zinc-950">{team.name}</p>
          <p className="mt-0.5 text-sm text-zinc-500">{team.players.length} {team.players.length === 1 ? "player" : "players"} will become available.</p>
        </div>
      </div>
      <footer className="flex justify-end gap-3 border-t border-zinc-100 bg-zinc-50/70 px-6 py-4 sm:px-8">
        <button type="button" onClick={onClose} className="h-10 rounded-lg border border-zinc-200 bg-white px-4 text-sm font-semibold transition hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950">Cancel</button>
        <button type="button" onClick={() => onConfirm(team.id)} className="h-10 rounded-lg bg-red-700 px-4 text-sm font-semibold text-white transition hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700">Delete team</button>
      </footer>
    </Modal>
  );
}

"use client";

import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePlayers } from "../hooks/use-players";
import { actions } from "../store/store";
import LoginScreen from "./auth/login-screen";
import PlayerDetailsModal from "./players/player-details-modal";
import PlayerList from "./players/player-list";
import DeleteTeamModal from "./teams/delete-team-modal";
import TeamCard from "./teams/team-card";
import TeamModal from "./teams/team-modal";
import { LogoutIcon, PlusIcon, TeamIcon, UsersIcon } from "./ui/icons";

export default function Dashboard() {
  const username = useSelector((state) => state.auth.username);

  if (!username) return <LoginScreen />;

  return <TeamWorkspace username={username} />;
}

function TeamWorkspace({ username }) {
  const teams = useSelector((state) => state.teams.items);
  const dispatch = useDispatch();
  const playerQuery = usePlayers();
  const [modal, setModal] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const assignedPlayerIds = useMemo(
    () => new Set(teams.flatMap((team) => team.players.map((player) => player.id))),
    [teams],
  );

  function openCreateModal() {
    setSelectedTeam(null);
    setModal("team");
  }

  function openEditModal(team) {
    setSelectedTeam(team);
    setModal("team");
  }

  function openDeleteModal(team) {
    setSelectedTeam(team);
    setModal("delete");
  }

  function openPlayerModal(player) {
    const freshPlayer = playerQuery.players.find((loadedPlayer) => loadedPlayer.id === player.id);
    setSelectedPlayer(freshPlayer || player);
    setModal("player");
  }

  function closeModal() {
    setModal(null);
    setSelectedTeam(null);
    setSelectedPlayer(null);
  }

  function saveTeam(team) {
    dispatch(selectedTeam ? actions.updateTeam(team) : actions.createTeam(team));
    closeModal();
  }

  function deleteTeam(teamId) {
    dispatch(actions.deleteTeam(teamId));
    closeModal();
  }

  return (
    <div className="min-h-screen bg-[#f4f4f1] text-zinc-950">
      <header className="sticky top-0 z-30 border-b border-zinc-200/80 bg-[#f4f4f1]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950">
            <div className="grid size-8 place-items-center rounded-lg bg-zinc-950 text-[10px] font-black tracking-tighter text-white">TM</div>
            <span className="text-sm font-semibold tracking-[-0.02em]">Team Manager</span>
          </a>
          <nav className="hidden items-center gap-6 text-xs font-medium text-zinc-500 sm:flex" aria-label="Primary navigation">
            <a href="#teams" className="transition hover:text-zinc-950">Teams</a>
            <a href="#players" className="transition hover:text-zinc-950">Players</a>
          </nav>
          <div className="flex items-center gap-2">
            <div className="hidden text-right sm:block">
              <p className="text-[10px] uppercase tracking-wider text-zinc-400">Signed in as</p>
              <p className="max-w-32 truncate text-xs font-semibold">{username}</p>
            </div>
            <button type="button" onClick={() => dispatch(actions.logout())} aria-label="Log out" className="grid size-9 place-items-center rounded-lg border border-zinc-200 bg-white text-zinc-500 transition hover:border-zinc-300 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950">
              <LogoutIcon className="size-4" />
            </button>
          </div>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-7xl px-5 pb-16 pt-10 sm:px-8 sm:pt-14">
        <section className="flex flex-col gap-6 border-b border-zinc-200 pb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">Player management</p>
            <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">Welcome back, {username}.</h1>
            <p className="mt-4 max-w-xl text-[15px] leading-6 text-zinc-500">Build teams, manage every player, and explore.</p>
          </div>
          <button type="button" onClick={openCreateModal} className="group flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-zinc-950 px-5 text-sm font-semibold text-white transition hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:scale-[0.99]">
            <PlusIcon className="size-4 transition-transform group-hover:rotate-90" />
            Create team
          </button>
        </section>

        <section className="grid gap-3 py-8 sm:grid-cols-2">
          <div className="rounded-xl border border-zinc-200 bg-white p-4">
            <div className="flex items-center justify-between"><span className="text-xs font-medium text-zinc-500">Teams</span><TeamIcon className="size-4 text-zinc-400" /></div>
            <p className="mt-4 text-2xl font-semibold tracking-[-0.04em]">{teams.length}</p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-4">
            <div className="flex items-center justify-between"><span className="text-xs font-medium text-zinc-500">Assigned players</span><UsersIcon className="size-4 text-zinc-400" /></div>
            <p className="mt-4 text-2xl font-semibold tracking-[-0.04em]">{assignedPlayerIds.size}</p>
          </div>
        </section>

        <section id="teams" className="scroll-mt-24 pb-10">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400">Your organization</p>
              <h2 className="mt-1 text-xl font-semibold tracking-[-0.03em]">Teams</h2>
            </div>
            {teams.length > 0 && <button type="button" onClick={openCreateModal} className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 transition hover:text-zinc-950"><PlusIcon className="size-3.5" />New team</button>}
          </div>

          {teams.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {teams.map((team) => <TeamCard key={team.id} team={team} onEdit={openEditModal} onDelete={openDeleteModal} onViewPlayer={openPlayerModal} />)}
            </div>
          ) : (
            <div className="grid min-h-64 place-items-center rounded-2xl border border-dashed border-zinc-300 bg-white/60 px-6 py-12 text-center">
              <div>
                <div className="mx-auto grid size-11 place-items-center rounded-xl bg-zinc-100 text-zinc-500"><TeamIcon className="size-5" /></div>
                <h3 className="mt-4 text-sm font-semibold">No teams yet</h3>
                <p className="mt-1 text-sm text-zinc-500">Create your first team and select its players.</p>
                <button type="button" onClick={openCreateModal} className="mt-5 h-10 rounded-lg bg-zinc-950 px-4 text-sm font-semibold text-white transition hover:bg-zinc-800">Create a team</button>
              </div>
            </div>
          )}
        </section>

        <PlayerList {...playerQuery} teams={teams} onLoadMore={playerQuery.error ? playerQuery.retry : playerQuery.loadMore} onViewPlayer={openPlayerModal} />
      </main>

      {modal === "team" && (
        <TeamModal
          key={selectedTeam?.id || "new-team"}
          team={selectedTeam}
          teams={teams}
          players={playerQuery.players}
          loading={playerQuery.loading}
          apiError={playerQuery.error}
          hasData={playerQuery.hasData}
          onLoadMore={playerQuery.error ? playerQuery.retry : playerQuery.loadMore}
          onClose={closeModal}
          onSave={saveTeam}
        />
      )}
      {modal === "delete" && selectedTeam && <DeleteTeamModal team={selectedTeam} onClose={closeModal} onConfirm={deleteTeam} />}
      {modal === "player" && selectedPlayer && <PlayerDetailsModal player={selectedPlayer} onClose={closeModal} />}
    </div>
  );
}

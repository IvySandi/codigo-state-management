export function getPlayerName(player) {
  return `${player.first_name} ${player.last_name}`.trim();
}

export function getPlayerTeam(player) {
  return player.team?.full_name || player.team?.name || "Free agent";
}

export function compactPlayer(player) {
  if (!player) return null;

  return {
    id: player.id,
    first_name: player.first_name,
    last_name: player.last_name,
    position: player.position || "—",
    height: player.height || null,
    weight: player.weight || null,
    jersey_number: player.jersey_number || null,
    college: player.college || null,
    country: player.country || "—",
    draft_year: player.draft_year || null,
    draft_round: player.draft_round || null,
    draft_number: player.draft_number || null,
    team: player.team
      ? {
          id: player.team.id,
          conference: player.team.conference,
          division: player.team.division,
          city: player.team.city,
          name: player.team.name,
          full_name: player.team.full_name,
          abbreviation: player.team.abbreviation,
        }
      : null,
  };
}

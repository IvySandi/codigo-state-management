export function normalizeTeamName(name) {
  return name.trim().replace(/\s+/g, " ").toLowerCase();
}

export function validateTeam(form, teams, editingTeamId) {
  const errors = {};
  const normalizedName = normalizeTeamName(form.name);

  if (!form.name.trim()) errors.name = "Team name is required.";
  if (form.name.trim().length > 40) errors.name = "Use 40 characters or fewer.";
  if (!form.region.trim()) errors.region = "Region is required.";
  if (!form.country.trim()) errors.country = "Country is required.";
  if (form.playerIds.length === 0) errors.players = "Select at least one player.";

  const duplicate = teams.some(
    (team) =>
      team.id !== editingTeamId && normalizeTeamName(team.name) === normalizedName,
  );

  if (duplicate) errors.name = "Team's name already exists.";

  return errors;
}

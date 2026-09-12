const STORAGE_KEY = "team-manager-state";

export function loadAppState() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;

    const parsed = JSON.parse(saved);
    if (!parsed?.auth || !Array.isArray(parsed?.teams?.items)) return null;

    return parsed;
  } catch {
    return null;
  }
}

export function saveAppState(state) {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ auth: state.auth, teams: state.teams }),
    );
  } catch {
    console.log("storage not available")
  }
}

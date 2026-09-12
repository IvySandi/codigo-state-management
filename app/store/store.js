import { combineReducers, createStore } from "redux";

export const actions = {
  hydrate: (payload) => ({ type: "app/hydrate", payload }),
  login: (username) => ({ type: "auth/login", payload: username }),
  logout: () => ({ type: "auth/logout" }),
  createTeam: (team) => ({ type: "teams/create", payload: team }),
  updateTeam: (team) => ({ type: "teams/update", payload: team }),
  deleteTeam: (teamId) => ({ type: "teams/delete", payload: teamId }),
};

const initialAuthState = { username: null };

function authReducer(state = initialAuthState, action) {
  switch (action.type) {
    case "auth/login":
      return { username: action.payload };
    case "auth/logout":
      return initialAuthState;
    default:
      return state;
  }
}

const initialTeamsState = { items: [] };

function teamsReducer(state = initialTeamsState, action) {
  switch (action.type) {
    case "teams/create":
      return { items: [action.payload, ...state.items] };
    case "teams/update":
      return {
        items: state.items.map((team) =>
          team.id === action.payload.id ? action.payload : team,
        ),
      };
    case "teams/delete":
      return { items: state.items.filter((team) => team.id !== action.payload) };
    default:
      return state;
  }
}

const combinedReducer = combineReducers({
  auth: authReducer,
  teams: teamsReducer,
});

function rootReducer(state, action) {
  if (action.type === "app/hydrate") {
    return {
      auth: action.payload.auth || initialAuthState,
      teams: action.payload.teams || initialTeamsState,
    };
  }

  return combinedReducer(state, action);
}

export function createAppStore() {
  return createStore(rootReducer);
}

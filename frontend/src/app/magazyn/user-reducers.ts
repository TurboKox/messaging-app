import { Action, createReducer, on } from "@ngrx/store";
import { UserState } from "./user-state.model";
import { login, logout } from "./user-actions";

const stanPoczatkowy :UserState = JSON.parse(localStorage.getItem('userState') as string) ?? { czyZalogowany: false }

const _userReduktor = createReducer(
  stanPoczatkowy,
  on(login, (stan) => ({...stan, czyZalogowany: true}) ),
  on(logout, (stan) => ({...stan, czyZalogowany: false}) ),
)
export function userReduktor(state :UserState = stanPoczatkowy, action :Action) {
  const nowyStan = _userReduktor(state, action)

  localStorage.setItem('userState', JSON.stringify(nowyStan))

  return nowyStan
}



import { SET_VISIBILITY_FILTER } from '../actions/action-types';

import { SHOW_ALL } from '../constants/visibilityFilter';

// OBS.: Não está em uso. quem controla esse estado é o react-router

export const visibilityFilter = (state = SHOW_ALL, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}

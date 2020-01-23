import Types from '../../action/theme/types';
const defaultState = {
  theme: '#0080FF',
};
export default function onAction(state = defaultState, action) {
  switch (action.type) {
    case Types.THEME_CHANGE:
      return {
        ...state,
        theme: action.theme,
      };

    default:
      return state;
  }
}

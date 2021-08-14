import { RootState } from '../store';

export const selectMode = (state: RootState) => state.dashboard.mode;
export const selectCreateModeElementType = (state: RootState) =>
  state.dashboard.createModeElementType;

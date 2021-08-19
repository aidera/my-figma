import { RootState } from '../store';

export const selectElements = (state: RootState) => state.dashboard.elements;
export const selectCreatingElement = (state: RootState) =>
  state.dashboard.creatingElement;
export const selectSelectedElement = (state: RootState) =>
  state.dashboard.selectedElement;
export const selectMode = (state: RootState) => state.dashboard.mode;
export const selectCreateModeElementType = (state: RootState) =>
  state.dashboard.createModeElementType;

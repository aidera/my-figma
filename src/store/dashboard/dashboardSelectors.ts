import { RootState } from '../store';

export const selectElements = (state: RootState) => state.dashboard.elements;

export const selectCreatingElement = (state: RootState) =>
  state.dashboard.creatingElement;

export const selectSelectedElementId = (state: RootState) =>
  state.dashboard.selectedElementId;

export const selectSelectedElement = (state: RootState) => {
  return state.dashboard.elements.find(
    (element) => element.id === state.dashboard?.selectedElementId
  );
};

export const selectMovingElementId = (state: RootState) =>
  state.dashboard.movingElementId;

export const selectMovingElement = (state: RootState) => {
  return state.dashboard.elements.find(
    (element) => element.id === state.dashboard?.movingElementId
  );
};

export const selectMovingElementMouseStartCoords = (state: RootState) =>
  state.dashboard.movingElementMouseStartCoords;

export const selectResizingElementId = (state: RootState) =>
  state.dashboard.resizingElementId;

export const selectResizingElement = (state: RootState) => {
  return state.dashboard.elements.find(
    (element) => element.id === state.dashboard?.resizingElementId
  );
};

export const selectResizingElementMouseStartCoords = (state: RootState) =>
  state.dashboard.resizingElementMouseStartCoords;

export const selectMode = (state: RootState) => state.dashboard.mode;

export const selectCreateModeElementType = (state: RootState) =>
  state.dashboard.createModeElementType;

export const selectCreateModeDefaults = (state: RootState) =>
  state.dashboard.createModeDefaults;

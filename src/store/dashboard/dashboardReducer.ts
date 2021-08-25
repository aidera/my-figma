import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  DashboardCreateModeElementType,
  DashboardModeType,
  AnyDashboardElement,
  IDashboardCreatingElement,
  BasicCoords,
  DashboardResizeEnum,
} from '../../types/dashboard.types';

interface DashboardState {
  elements: AnyDashboardElement[];
  creatingElement: IDashboardCreatingElement | null;
  selectedElementId: string | null;
  movingElementId: string | null;
  movingElementStartCoords: BasicCoords | null;
  movingElementMouseStartCoords: BasicCoords | null;
  resizingElementId: string | null;
  resizeMode: DashboardResizeEnum | null;
  resizingElementMouseStartCoords: BasicCoords | null;
  mode: DashboardModeType;
  createModeElementType: DashboardCreateModeElementType;
}

const initialState: DashboardState = {
  elements: [],
  creatingElement: null,
  selectedElementId: null,
  movingElementId: null,
  movingElementStartCoords: null,
  movingElementMouseStartCoords: null,
  resizingElementId: null,
  resizeMode: null,
  resizingElementMouseStartCoords: null,
  mode: 'select' as DashboardModeType,
  createModeElementType: null as DashboardCreateModeElementType,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    addElement: (state, action: PayloadAction<AnyDashboardElement>) => {
      state.elements.unshift(action.payload);
      state.creatingElement = null;
    },

    updateElementPosition: (
      state,
      action: PayloadAction<{ id: string; from: number; to: number }>
    ) => {
      if (state.elements.length) {
        const elementToMove = state.elements.find(
          (element) => element.id === action.payload.id
        );
        if (elementToMove) {
          state.elements.splice(action.payload.from, 1);
          state.elements.splice(action.payload.to, 0, elementToMove);
        }
      }
    },

    setCreatingElement: (
      state,
      action: PayloadAction<IDashboardCreatingElement | null>
    ) => {
      state.creatingElement = action.payload;
    },

    setSelectedElement: (
      state,
      action: PayloadAction<AnyDashboardElement | null>
    ) => {
      if (action.payload) {
        state.selectedElementId = action.payload.id;
      } else {
        state.selectedElementId = null;
        state.movingElementId = null;
        state.resizingElementId = null;
      }
    },

    setCreatingElementDimensions: (
      state,
      action: PayloadAction<{ point2: BasicCoords }>
    ) => {
      if (state.creatingElement) {
        state.creatingElement.point2 = action.payload.point2;
      }
    },

    setMode: (state, action: PayloadAction<DashboardModeType>) => {
      state.mode = action.payload;
      if (action.payload !== 'create') {
        state.createModeElementType = null;
        state.creatingElement = null;
      }
      if (action.payload !== 'select') {
        state.selectedElementId = null;
        state.movingElementId = null;
        state.resizingElementId = null;
      }
    },

    setCreateModeElementType: (
      state,
      action: PayloadAction<DashboardCreateModeElementType>
    ) => {
      state.createModeElementType = action.payload;
    },

    setMovingElement: (
      state,
      action: PayloadAction<{
        startCoords: BasicCoords;
        mouseStartCoords: BasicCoords;
        element: AnyDashboardElement;
      } | null>
    ) => {
      state.movingElementId = action.payload ? action.payload.element.id : null;
      state.movingElementStartCoords = action.payload
        ? action.payload.startCoords
        : null;
      state.movingElementMouseStartCoords = action.payload
        ? action.payload.mouseStartCoords
        : null;
    },

    moveElement: (state, action: PayloadAction<BasicCoords>) => {
      if (
        state.movingElementId &&
        state.movingElementMouseStartCoords &&
        state.movingElementStartCoords
      ) {
        const id = state.movingElementId;

        const found = state.elements.findIndex((el) => el.id === id);
        if (found >= 0) {
          const startX = state.movingElementStartCoords.x;
          const startY = state.movingElementStartCoords.y;
          const mouseX = state.movingElementMouseStartCoords.x;
          const mouseY = state.movingElementMouseStartCoords.y;

          state.elements[found].x = action.payload.x + startX - mouseX;
          state.elements[found].y = action.payload.y + startY - mouseY;
        }
      }
    },

    setResizingElement: (
      state,
      action: PayloadAction<{
        mouseStartCoords: BasicCoords;
        element: AnyDashboardElement;
        mode: DashboardResizeEnum;
      } | null>
    ) => {
      state.resizingElementId = action.payload
        ? action.payload.element.id
        : null;
      state.resizingElementMouseStartCoords = action.payload
        ? action.payload.mouseStartCoords
        : null;
      state.resizeMode = action.payload ? action.payload.mode : null;
    },

    resizeElement: (
      state,
      action: PayloadAction<{
        mouseCoords: BasicCoords;
      }>
    ) => {
      if (state.resizingElementId && state.resizingElementMouseStartCoords) {
        const id = state.resizingElementId;

        const found = state.elements.findIndex((el) => el.id === id);

        if (found >= 0) {
          const heightDiff =
            state.elements[found].height -
            (action.payload.mouseCoords.y - state.elements[found].y);
          const widthDiff =
            state.elements[found].width -
            (action.payload.mouseCoords.x - state.elements[found].x);

          switch (state.resizeMode) {
            case DashboardResizeEnum.top:
              if (heightDiff > 0) {
                state.elements[found].height = heightDiff;
                state.elements[found].y = action.payload.mouseCoords.y;
              }
              break;

            case DashboardResizeEnum.topRight:
              if (heightDiff > 0) {
                state.elements[found].height = heightDiff;
                state.elements[found].y = action.payload.mouseCoords.y;
              }

              state.elements[found].width =
                action.payload.mouseCoords.x - state.elements[found].x;
              break;

            case DashboardResizeEnum.right:
              state.elements[found].width =
                action.payload.mouseCoords.x - state.elements[found].x;
              break;

            case DashboardResizeEnum.bottomRight:
              state.elements[found].height =
                action.payload.mouseCoords.y - state.elements[found].y;

              state.elements[found].width =
                action.payload.mouseCoords.x - state.elements[found].x;
              break;

            case DashboardResizeEnum.bottom:
              state.elements[found].height =
                action.payload.mouseCoords.y - state.elements[found].y;
              break;

            case DashboardResizeEnum.bottomLeft:
              state.elements[found].height =
                action.payload.mouseCoords.y - state.elements[found].y;

              if (widthDiff > 0) {
                state.elements[found].width = widthDiff;
                state.elements[found].x = action.payload.mouseCoords.x;
              }
              break;

            case DashboardResizeEnum.left:
              if (widthDiff > 0) {
                state.elements[found].width = widthDiff;
                state.elements[found].x = action.payload.mouseCoords.x;
              }
              break;

            case DashboardResizeEnum.topLeft:
              if (heightDiff > 0) {
                state.elements[found].height = heightDiff;
                state.elements[found].y = action.payload.mouseCoords.y;
              }
              if (widthDiff > 0) {
                state.elements[found].width = widthDiff;
                state.elements[found].x = action.payload.mouseCoords.x;
              }
              break;
          }

          if (state.elements[found].height < 1) {
            state.elements[found].height = 1;
          }

          if (state.elements[found].width < 1) {
            state.elements[found].width = 1;
          }
        }
      }
    },
  },
});

export const {
  addElement,
  updateElementPosition,
  setCreatingElement,
  setSelectedElement,
  setCreatingElementDimensions,
  setMode,
  setCreateModeElementType,
  setMovingElement,
  moveElement,
  setResizingElement,
  resizeElement,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;

declare module 'react-beautiful-dnd' {
  import { ReactElement, ReactNode } from 'react';

  export interface DraggableProvided {
    innerRef: (element: HTMLElement | null) => void;
    draggableProps: {
      style?: React.CSSProperties;
      'data-rbd-draggable-context-id': string;
      'data-rbd-draggable-id': string;
      onTransitionEnd?: () => void;
    };
    dragHandleProps: {
      'data-rbd-drag-handle-draggable-id': string;
      'data-rbd-drag-handle-context-id': string;
      'aria-labelledby': string;
      tabIndex: number;
      draggable: boolean;
      onDragStart: () => void;
    } | null;
  }

  export interface DroppableProvided {
    innerRef: (element: HTMLElement | null) => void;
    droppableProps: {
      'data-rbd-droppable-id': string;
      'data-rbd-droppable-context-id': string;
    };
    placeholder?: ReactElement | null;
  }

  export interface DraggableProps {
    draggableId: string;
    index: number;
    key?: string;
    children: (provided: DraggableProvided) => ReactElement;
  }

  export interface DroppableProps {
    droppableId: string;
    isDropDisabled?: boolean;
    isCombineEnabled?: boolean;
    ignoreContainerClipping?: boolean;
    children: (provided: DroppableProvided) => ReactElement;
  }

  export interface DragDropContextProps {
    onDragEnd: (result: any) => void;
    children: ReactNode;
  }

  export const DragDropContext: React.FC<DragDropContextProps>;
  export const Droppable: React.FC<DroppableProps>;
  export const Draggable: React.FC<DraggableProps>;
}

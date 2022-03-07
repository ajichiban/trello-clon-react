

export type ColumnDragItem = {
  index: number;
  id: string;
  text: string;
  type: 'COLUMN';
}

export type DragItem = ColumnDragItem;


export interface MoveTask {
  fromListIndex: number,
    toListIndex: number,
    fromIndex: number,
    toIndex: number
}
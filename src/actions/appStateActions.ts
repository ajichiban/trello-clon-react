import { DragItem, MoveTask } from './../interfaces/dragItem';
export type AppStateActions = 
| {type: 'ADD_LIST', payload: string}
| {type: 'ADD_TASK', payload: {listId: string, task: string}} 
| {type:'MOVE_LIST', payload: {dragIndex: number, hoverIndex: number}}
| {type: 'SET_DRAGGED_ITEM', payload: DragItem | null}
| {type:'MOVE_TASK', payload: MoveTask}

import { AppStateActions } from "../actions/appStateActions";
import { AppState, List, Task } from "../context/AppStateContext";

import { nanoid } from 'nanoid'
import { findItemIndexById, insertItemAtIndex, moveItem, overrideItemAtIndex, removeItemAtIndex } from "../utils/arrayUtils";

export const appStateReducer = (state: AppState, action: AppStateActions): AppState => {
  switch (action.type) {
    case 'ADD_LIST':
      return {
        ...state,
        lists: [
          ...state.lists,
          { id: nanoid(), text: action.payload, tasks: [] }
        ]
      }

    case 'ADD_TASK': {
      const targetLaneIndex = findItemIndexById(state.lists, action.payload.listId);

      const targetList = state.lists[targetLaneIndex];

      const updatedTargetList = {
        ...targetList,
        tasks: [
          ...targetList.tasks,
          { id: nanoid(), text: action.payload.task }
        ]
      }

      return {
        ...state,
        lists: overrideItemAtIndex(state.lists, updatedTargetList, targetLaneIndex)
        // lists: [...state.lists, updatedTargetList]
      }
    }

    case 'MOVE_LIST': {
      const { dragIndex, hoverIndex } = action.payload;
      return {
        ...state,
        lists: moveItem(state.lists, dragIndex, hoverIndex)
      }
    }

    case 'MOVE_TASK': {

      const { fromListIndex, toListIndex, fromIndex, toIndex } = action.payload;

      const listWithItemRemoved: List ={
        ...state.lists[fromListIndex],
        tasks: state.lists[fromListIndex].tasks.filter((_, index) => index !== fromIndex)
        }
      ;

      const item : Task = state.lists[fromListIndex].tasks[fromIndex]; 

      console.log('lists ::', state.lists[toListIndex])


      const listWithItemAdded :List = {
        ...state.lists[toListIndex],
        tasks: insertItemAtIndex<Task>(state.lists[toListIndex].tasks,item , toIndex)
      }

      const newLists = state.lists.map((list, index)=>{
        if(list.id === listWithItemRemoved.id){
          return listWithItemRemoved;
        }else if(list.id === listWithItemAdded.id){
          return listWithItemAdded;
        }
        return list
      });

      return {
        ...state,
        lists:[
          ...newLists
        ]
      }
    }

    // case "SET_DRAGGED_ITEM": {
    //   return { ...state, draggedItem: action.payload }
    // }
    
    default:
      return state;
  }
}
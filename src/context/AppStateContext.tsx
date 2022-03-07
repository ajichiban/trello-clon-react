import { createContext } from "react";
import { AppStateActions } from "../actions/appStateActions";
import { DragItem } from "../interfaces/dragItem";

export const appData = {
	lists: [
		{
			id: "0",
			text: "To Do",
			tasks: [{ id: "c0", text: "Generate app scaffold" }],
		},
		{
			id: "1",
			text: "In Progress",
			tasks: [{ id: "c2", text: "Learn Typescript" }],
		},
		{
			id: "2",
			text: "Done",
			tasks: [{ id: "c3", text: "Begin to use static typing" }],
		},
	],
};

export interface Task {
  id: string;
  text: string;
}

export interface List{
  id: string;
  text: string;
  tasks: Task[];
}

export interface AppState {
  lists: List[];
  draggedItem: DragItem | null;
}

interface AppStateContextProps {
  state: AppState;
  dispatch: React.Dispatch<AppStateActions>;
}

export const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps);

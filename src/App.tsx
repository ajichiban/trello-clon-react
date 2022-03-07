import { useState } from "react";
import { AddNewItem } from "./components/AddNewItem";
import { Card } from "./components/Card";
import { Column } from "./components/Column";
import { useAppState } from "./hooks/useAppState";
import { AppContainer } from "./styles";
import {
	DragDropContext,
	Droppable,
	Draggable,
	DropResult,
	DragStart,
	ResponderProvided,
	BeforeCapture,
} from "react-beautiful-dnd";
import { MoveTask } from "./interfaces/dragItem";

function App() {
	const { state, dispatch } = useAppState();
	const [blockColumns, setBlockColumns] = useState(true);

	const [isDragging, setIsDragging] = useState(false);

	const addNewList = (text: string): void => {
		dispatch({ type: "ADD_LIST", payload: text });
		console.log("dispatch desde column");
	};

	const handleDragEnd = (result: DropResult) => {
		if (result.type == "card") {
			if (result.destination) {
				const payload: MoveTask = {
					fromListIndex: parseInt(
						result.source.droppableId.replace("dro-list", "")
					),
					toListIndex: parseInt(
						result.destination.droppableId.replace("dro-list", "")
					),
					fromIndex: result.source.index,
					toIndex: result.destination.index,
				};

				dispatch({ type: "MOVE_TASK", payload });
			}
		} else {
			dispatch({
				type: "MOVE_LIST",
				payload: {
					dragIndex: result.source.index,
					hoverIndex: result.destination?.index ?? result.source.index,
				},
			});
		}

		setIsDragging(false);

		console.log("End", result);
	};

	const handleDragStart = (initial: DragStart) => {
		setIsDragging(true);
		console.log("Beffor", initial);
	};

	return (
		<DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
			<Droppable direction="horizontal" droppableId="columns" type="column">
				{(provided) => (
					<AppContainer {...provided.droppableProps} ref={provided.innerRef}>
						{state.lists.map((list, i) => (
							<Column
								isDragging={isDragging}
								blockColumns={blockColumns}
								setBlockColumns={setBlockColumns}
								list={list}
								listIndex={i}
								key={list.id}
							/>
						))}

						{provided.placeholder}

						<AddNewItem
							toggleButtonText="+ Add another list"
							onAdd={addNewList}
						/>
					</AppContainer>
				)}
			</Droppable>
		</DragDropContext>
	);
}

export default App;

import { useMemo} from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { List } from "../context/AppStateContext";
import { useAppState } from "../hooks/useAppState";
import { ColumnContainer, ColumnTitle } from "../styles";
import { AddNewItem } from "./AddNewItem";
import { Card } from "./Card";

interface ColumnProps {
	listIndex: number;
	list: List;
	blockColumns: boolean;
	setBlockColumns: React.Dispatch<React.SetStateAction<boolean>>;
  isDragging: boolean;
}

export const Column = ({
	list,
	listIndex,
	blockColumns,
	setBlockColumns,
  isDragging,
}: ColumnProps) => {
	const { state, dispatch } = useAppState();

	const { id, tasks, text } = list;

	const addNewList = (text: string): void => {
		dispatch({ type: "ADD_TASK", payload: { task: text, listId: id } });
		// console.log('dispatch desde column')
	};

	const ColumnTitleC = () => (
		<ColumnTitle
			onMouseOut={() => !isDragging && setBlockColumns(true)}
			onMouseOver={() => !isDragging && setBlockColumns(false)}
		>
			{text}
		</ColumnTitle>
	);

	useMemo(() => ColumnTitleC, []);

	return (
		<Draggable
			isDragDisabled={blockColumns}
			key={list.id}
			draggableId={"dra-list" + list.id}
			index={listIndex}
		>
			{(provided) => (
				<>
					<ColumnContainer
						{...provided.draggableProps}
						ref={provided.innerRef}
						{...provided.dragHandleProps}
					>
						<ColumnTitleC />
						<Droppable
							isDropDisabled={!blockColumns}
							droppableId={"dro-list" + listIndex}
							type="card"
						>
							{(provided) => (
								<section {...provided.droppableProps} ref={provided.innerRef}>
									{state.lists[listIndex].tasks.map((task, i) => (
										<Draggable
											isDragDisabled={!blockColumns}
											key={task.id}
											draggableId={"dra-card" + task.id}
											index={i}
										>
											{(provided) => (
												<div
													{...provided.draggableProps}
													ref={provided.innerRef}
													{...provided.dragHandleProps}
												>
													<Card text={task.text} />
												</div>
											)}
										</Draggable>
									))}
									{provided.placeholder}
								</section>
							)}
						</Droppable>
						<AddNewItem
							toggleButtonText="+ Add another task"
							onAdd={addNewList}
							dark
						/>
					</ColumnContainer>
				</>
			)}
		</Draggable>
	);
};

import { useState } from "react";
import { useFocus } from "../hooks/useFocus";
import { NewItemButton, NewItemFormContainer, NewItemInput } from "../styles";

interface Props {
	onAdd: (text: string) => void;
}

export const NewItemForm = ({ onAdd }: Props) => {
	const [text, setText] = useState<string>("");

	const inputRef = useFocus();

	const handleAddText = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			onAdd(text);
		}
	};

	return (
		<NewItemFormContainer>
			<NewItemInput
				ref={inputRef}
				value={text}
        onKeyPress={handleAddText}
				onChange={(e) => setText(e.target.value)}
			/>
			<NewItemButton onClick={() => onAdd(text)}>Create</NewItemButton>
		</NewItemFormContainer>
	);
};

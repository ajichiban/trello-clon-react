import { useState } from "react";
import { AddItemButton } from "../styles";
import { NewItemForm } from "./NewItemForm";

interface Props {
	onAdd: (text: string) => void;
	toggleButtonText: string;
	dark?: boolean;
}

export const AddNewItem = ({ onAdd, toggleButtonText, dark }: Props) => {
	const [showForm, setShowForm] = useState(false);

	if (showForm) {
		return <NewItemForm
			onAdd={(text) => {
				onAdd(text);
				setShowForm(false);
			}}
		/>;
	}

	return (
		<AddItemButton dark={dark} onClick={() => setShowForm(true)}>
			{toggleButtonText}
		</AddItemButton>
	);
};

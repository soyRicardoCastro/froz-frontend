import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import { PlusIcon } from '@heroicons/react/outline'
export default function CreateEventButton() {
  const { setShowEventModal } = useContext(GlobalContext);
  return (
    <button
      onClick={() => setShowEventModal(true)}
      className="border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl"
    >
      <PlusIcon className="text-gray-200 w-5 h-5" /> Create
    </button>
  );
}

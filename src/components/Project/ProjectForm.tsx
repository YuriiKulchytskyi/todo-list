import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProject } from "../../store/features/projects/projectSlice";
// import { useNavigate } from "react-router-dom";

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectForm = ({ isOpen, onClose }: ProjectFormModalProps) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    dispatch(
      addProject({
        id: Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tasks: [],
      })
    );

    setTitle("");
    setDescription("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
        >
          X
        </button>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="p-2 rounded-md border-2 border-neutral-700"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Project title"
            required
          />
          <textarea
            className="p-2 rounded-md border-2 border-neutral-700"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Project description"
          />
          <button
            type="submit"
            className="p-2 rounded-md bg-blue-500 text-white"
          >
            Add Project
          </button>
        </form>
      </div>
    </div>
  );
};

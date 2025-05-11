import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProject } from "../../store/features/projects/projectSlice";
import { useNavigate } from "react-router-dom";

export const ProjectForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

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
    navigate("/projects");
  };

  return (
    <div className="relative">
      <div
        className="absolute top-0 left-0 w-10 h-10 text-black flex items-center justify-center cursor-pointer"
        onClick={() => navigate("/projects")}
      >
        Back
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-4 rounded-lg w-1/2 mx-auto mt-10"
      >
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
  );
};

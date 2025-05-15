import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProject } from "../../store/features/projects/projectSlice";
import css from "./Project.module.scss";

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
    <div className={css.overlay}>
      <div className={css.modal}>
        <button onClick={onClose} className={css.closeButton}>
          X
        </button>

        <form onSubmit={handleSubmit} className={css.form}>
          <input
            className={css.input}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Project title"
            required
          />
          <textarea
            className={css.textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Project description"
          />
          <button type="submit" className={css.submitButton}>
            Add Project
          </button>
        </form>
      </div>
    </div>
  );
};

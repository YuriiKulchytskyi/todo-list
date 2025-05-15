import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ProjectCard } from "./ProjectCard";
import { useState } from "react";
import { selectProjectsByTaskCompletion } from "../../store/features/projects/projectSlice";
import css from "./Project.module.scss";

export type FilterType = "all" | "completed" | "pending";

export const ProjectList = ({ onOpenForm }: { onOpenForm: () => void }) => {
  const [titleFilter, setTitleFilter] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const projects = useSelector((state: RootState) => state.projects.projects || []);
  const completedProjects = useSelector(selectProjectsByTaskCompletion(true));
  const pendingProjects = useSelector(selectProjectsByTaskCompletion(false));

  const filteredProjects = () => {
    switch (filter) {
      case "completed":
        return completedProjects;
      case "pending":
        return pendingProjects;
      default:
        return projects;
    }
  };

  const handleTitleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleFilter(event.target.value);
  };

  const filteredProjectsByTitle = () => {
    return filteredProjects().filter((project) =>
      project.title.toLowerCase().includes(titleFilter.toLowerCase())
    );
  };

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h2 className={css.title}>Dream list</h2>
        {projects.length !== 0 && (
          <div className={css.filters}>
            <input
              type="text"
              value={titleFilter}
              onChange={handleTitleFilter}
              placeholder="Search by title"
              className={css.input}
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as FilterType)}
              className={css.select}
            >
              <option value="all">All Projects</option>
              <option value="completed">Completed Projects</option>
              <option value="pending">Pending Projects</option>
            </select>
          </div>
        )}
      </div>

      {filteredProjects().length > 0 ? (
        <div className={css.projectList}>
          {filteredProjectsByTitle().map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className={css.emptyMessage}>Let`s plan some dreams</div>
      )}

      <button onClick={onOpenForm} className={css.addButton}>
        {filteredProjects().length === 0 ? "Your first dream" : "Add new dream"}
      </button>
    </div>
  );
};

import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { RootState } from "../../store/store";
import { ProjectCard } from "./ProjectCard";
import { useState } from "react";
import { selectProjectsByTaskCompletion } from "../../store/features/projects/projectSlice";

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
    return filteredProjects().filter((project) => {
      return project.title.toLowerCase().includes(titleFilter.toLowerCase());
    });
  };


  return (
    <div className="p-4 relative flex flex-col gap-2">
      <div className="flex justify-between items-center mb-4 w-full flex-col gap-2">
        <h2 className="text-2xl font-bold">Dream list</h2>
        {filteredProjects().length !== 0 && <div className="flex gap-2">
          <input
            type="text"
            value={titleFilter}
            onChange={handleTitleFilter}
            placeholder="Search by title"
            className="border rounded px-2 py-1"
          />
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value as FilterType)}
            className="border rounded px-2 py-1"
          >
            <option value="all">All Projects</option>
            <option value="completed">Completed Projects</option>
            <option value="pending">Pending Projects</option>
          </select>
    
        </div>}
      </div>
      {filteredProjects().length > 0 ? (
        <div className="flex flex-row flex-wrap gap-4 max-h-[350px] overflow-y-auto">
          {filteredProjectsByTitle().map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center text-neutral-900">Let`s plan some dreams</div>
      )}
          <button
            onClick={onOpenForm}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {filteredProjects().length === 0 ? "Your first dream" : "Add new dream"}
          </button>

    </div>
  );
};

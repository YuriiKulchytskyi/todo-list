import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../store/store";
import { ProjectCard } from "./ProjectCard";
import { useState } from "react";
import { selectProjectsByTaskCompletion } from "../../store/features/projects/projectSlice";

export type FilterType = "all" | "completed" | "pending";

export const ProjectList = () => {

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


  // useEffect(() => {
  //   const persistedState = JSON.parse(localStorage.getItem("persist:root") || "{}");
  //   const projectsData = JSON.parse(persistedState.projects || "{}");
  //   console.log("Projects from localStorage:", projectsData.projects || []);
  // }, [projects]);

  return (
    <div className="p-4 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Projects</h2>
        <div className="flex gap-2">
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
    
          <Link
            to="/new"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            New Project
          </Link>
        </div>
      </div>
      {filteredProjects().length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjectsByTitle().map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center text-neutral-900">No projects found</div>
      )}
    </div>
  );
};

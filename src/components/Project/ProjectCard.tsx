import { Link } from "react-router-dom";
import { deleteProject, Project } from "../../store/features/projects/projectSlice";
import { useDispatch } from "react-redux";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {

    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteProject(project.id));
    }

  return (
    <div className="relative">
        <Link
      to={`/dreams/${project.id}`}
      key={project.id}
      className="block p-4 bg-pink-300 rounded-lg shadow-md hover:bg-pink-500 transition-colors"
    >
      <h3 className="text-lg font-semibold text-neutral-700">
        {project.title} 
      </h3>
      <p className="text-neutral-600 mt-2">{project.description}</p>
      <p className="text-sm text-neutral-500 mt-2">
        Created: {new Date(project.createdAt).toLocaleDateString()}
        </p>
      </Link>
      <button className="absolute top-2 right-2 text-neutral-400 hover:text-neutral-100 transition-colors" onClick={handleDelete}>
        X
      </button>
    </div>
  );
};

import { Link } from "react-router-dom";
import { deleteProject, Project } from "../../store/features/projects/projectSlice";
import { useDispatch } from "react-redux";
import css from "./Project.module.scss";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteProject(project.id));
  };

  return (
    <div className={css.projectCard}>
      <Link to={`/dreams/${project.id}`} className={css.link}>
        <h3 className={css.title}>{project.title}</h3>
        <p className={css.description}>{project.description}</p>
        <p className={css.created}>
          Created: {new Date(project.createdAt).toLocaleDateString()}
        </p>
      </Link>
      <button className={css.delete} onClick={handleDelete}>
        X
      </button>
    </div>
  );
};

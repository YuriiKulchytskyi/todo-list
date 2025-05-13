import { Link } from "react-router-dom";
import QISO from "./images/QISO.png";
import css from "./App.module.scss";
import { ProjectList } from "./components/Project/ProjectList";
import quotes from "./quotes.json";
import { useEffect, useState } from "react";
import { ProjectForm } from "./components/Project/ProjectForm";

export function App() {
  const [quote, setQuote] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    const randomQuote = quotes.quotes[Math.floor(Math.random() * quotes.quotes.length)];
    setQuote(randomQuote.text);
  }, []);
  return (
    <div>
      {/* <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Welcome to Task Manager
          </h1>
          <p className="text-xl text-white mb-12">
            Organize your projects and tasks efficiently
          </p>
          <div className="space-y-4">
            <Link
              to="/projects"
              className="inline-block bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 transition-colors"
            >
              View All Projects
            </Link>
            <div>
              <Link
                to="/new"
                className="inline-block text-blue-500 hover:text-blue-600 mt-4"
              >
                Create New Project →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div> */}
      <div className={css.bookWrapper}>
        <div className={css.book}>
          <div className={`${css.front} ${css.page}`}>
            <div className={css.frontBack}>
              <img src={QISO} alt="Logo" className={css.logo} />
              <div className={css.text}>
                <p className={css.quote}>
                  {quote}
                </p>
              </div>
            </div>
          </div>
          <div className={`${css.back} ${css.page}`}>
            <div className={css.taskList}>
              <ProjectList onOpenForm={() => setIsOpen(true)}/>
            </div>
          </div>
        </div>
      </div>
      <ProjectForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

// Фільтрацію задач
// Пошук по проектах
// Сортування задач за датою

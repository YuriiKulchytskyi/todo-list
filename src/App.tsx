import { Link } from "react-router-dom";


export function App() {
 return (
  <div>
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
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
    </div>
  </div>
 )
}

// Фільтрацію задач
// Пошук по проектах
// Сортування задач за датою


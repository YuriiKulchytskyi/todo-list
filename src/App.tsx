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
    const randomQuote =
      quotes.quotes[Math.floor(Math.random() * quotes.quotes.length)];
    setQuote(randomQuote.text);
  }, []);
  return (
    <div>

      <div className={css.bookWrapper}>
        <div className={css.book}>
          <div className={`${css.front} ${css.page}`}>
            <div className={css.frontBack}>
              <img src={QISO} alt="Logo" className={css.logo} />
              <div className={css.text}>
                <p className={css.quote}>{quote}</p>
              </div>
            </div>
          </div>
          <div className={`${css.back} ${css.page}`}>
            <div className={css.taskList}>
              <ProjectList onOpenForm={() => setIsOpen(true)} />
            </div>
          </div>
        </div>
      </div>
      <ProjectForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}


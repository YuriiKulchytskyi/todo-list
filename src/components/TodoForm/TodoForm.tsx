import { Formik, Field, Form, FormikHelpers } from "formik";
import { useDispatch } from "react-redux";
import { addTask } from "../../redux/todo";
import { nanoid } from "nanoid";
import { AppDispatch } from "../../redux/store";

export const TodoForm = () => {
  interface Values {
    task: string;
    priority: string;
  }

  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <h1>Add Task</h1>

      <Formik
        initialValues={{
          task: "",
          priority: "low",
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          dispatch(
            addTask({
              id: nanoid(),
              task: values.task,
              priority: values.priority,
            })
          );
          setSubmitting(false);
        }}
      >
        <Form>
          <div>
            <label htmlFor="task">Task</label>
            <Field id="task" name="task" placeholder="Task" type="text" />
          </div>

          <div>
            <label htmlFor="priority">Priority</label>
            <Field as="select" name="priority" id="priority">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Field>
          </div>

          <button type="submit">Add task</button>
        </Form>
      </Formik>
    </>
  );
};

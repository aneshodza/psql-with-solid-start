// TODO: This is terribly broken with HMR. Should use real persistent storage.
import { Todo } from "~/types";
import postgres from "postgres";

const sql= postgres({
  host: "localhost",
  port: 5432,
  database: "psql_with_solid_start",
  username: "anes"
});

let COUNTER = 0;
let TODOS: Todo[] = [];
const DELAY = 120;

function delay<T>(fn: () => T) {
  return new Promise<T>((res) => setTimeout(() => res(fn()), DELAY));
}

export default {
  getTodos():any {
    return (sql`SELECT * FROM todos`);
    // return delay(() => TODOS);
  },
  addTodo(title: string) {
    return sql`INSERT INTO todos (title, completed) VALUES (${title}, false)`;
    // return delay(() => TODOS.push({ id: COUNTER++, title, completed: false }));
  },
  removeTodo(id: number) {
    return sql`DELETE FROM todos WHERE id = (${id})`;
    // return delay(() => (TODOS = TODOS.filter((todo) => todo.id !== id)));
  },
  toggleTodo(id: number) {
    return sql`UPDATE todos SET completed = NOT completed WHERE id = (${id})`;
    // return delay(() =>

    //   TODOS.forEach(
    //     (todo) => todo.id === id && (todo.completed = !todo.completed)
    //   )
    // );
  },
  editTodo(id: number, title: string) {
    return sql`UPDATE todos SET title = (${title}) WHERE id = (${id})`;
    // return delay(() =>
    //   TODOS.forEach((todo) => {
    //     if (todo.id === id) todo.title = title;
    //   })
    // );
  },
  clearCompleted() {
    return sql`DELETE FROM todos WHERE completed = true`;
    // return delay(() => (TODOS = TODOS.filter((todo) => !todo.completed)));
  },
  toggleAll(completed: boolean) {
    return sql`UPDATE todos SET completed = (${completed})`;
    // return delay(() => TODOS.forEach((todo) => (todo.completed = !completed)));
  },
};

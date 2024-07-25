import { useStore } from "effector-react";
import { $todos, createTodoFx, update } from "../../models/todos/todosStore";
import { Button, Container, ListGroup, ListGroupItem } from "react-bootstrap";

// const initialTodos = [
//   { id: 1, title: "Задача 1" },
//   { id: 2, title: "Задача 2" },
//   { id: 3, title: "Задача 3" },
// ];

// Компонент Todo-листа
export function Todos() {
  const todos = useStore($todos);

  return (
    <Container className="mt-5">
      <Button
        variant="primary"
        onClick={() =>
          createTodoFx({
            userId: 1,
            id: 1,
            title: "Новая тудушка",
            completed: false,
          })
        }
      >
        Add Todo
      </Button>
      <ListGroup className="mt-3">
        {todos.map((todo) => (
          <ListGroupItem key={todo.id}>{todo.title}</ListGroupItem>
        ))}
      </ListGroup>
    </Container>
  );
}

import { useQuery } from "@tanstack/react-query";

// Данные для нашего todo-листа
const initialTodos = [
  { id: 1, title: "Задача 1" },
  { id: 2, title: "Задача 2" },
  { id: 3, title: "Задача 3" },
];

// Компонент Todo-листа
export function Todos() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["todos"],
    queryFn: () => initialTodos,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  <ul>
    {data.map((todo) => (
      <li key={todo.id}>{todo.title}</li>
    ))}
  </ul>;

  return (
    <div>
      <ul>
        {data.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

// Создаем хранилище, в котором будет лежать массив пользователей

import { createEffect, createEvent, createStore } from "effector";
import { TTodo } from "./todosStore.type";
import axios from "axios";

// TTodo — тип, описывающий пользователя (имя, фамилия и т.п.)
export const $todos = createStore<TTodo[]>([]);

// Создаем событие, принимающее параметр IUser
export const update = createEvent<TTodo>();

// Обычный хендлер на обновление. Добавляем или изменяем пользователя
const updateTodos = (state: TTodo[], data: TTodo) => {
  const userIndex = state.findIndex((user) => user.id === data.id);

  // Изменяем стейт
  if (userIndex > -1) {
    state.splice(userIndex, 1, data);
  } else {
    state.push(data);
  }

  // Возвращаем измененный стейт
  return [...state];
};

export const fetchTodosFx = createEffect<void, TTodo[], Error>(() => {
  return axios
    .get("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.data);
});

export const createTodoFx = createEffect<TTodo, TTodo, Error>((todo) => {
  return axios
    .post("https://jsonplaceholder.typicode.com/todos", todo)
    .then((response) => response.data);
});

// Подписываемся на эффект в хранилище
$todos.on(fetchTodosFx.done, (state, todos) => [...state, ...todos.result]);

$todos.on(createTodoFx.done, (state, todo) => [...state, todo.result]);

// Подписываемся на событие в хранилище
$todos.on(update, updateTodos);

fetchTodosFx();

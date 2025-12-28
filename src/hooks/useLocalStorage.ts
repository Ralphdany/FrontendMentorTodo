import { useEffect, useState } from "react";

interface Todo {
  name: string;
  completed: boolean;
  id: string;
}

export const useLocalStorage = (key: string) => {
  const [storedTodos, setStoredTodos] = useState<Todo[]>(() => {
    const todos = localStorage.getItem(key);
    return todos !== null ? JSON.parse(todos) : [];
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedTodos));
  }, [key, storedTodos]);

  return [storedTodos, setStoredTodos] as const;
};
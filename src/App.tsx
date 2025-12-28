import Background from "./components/Background";
import images from "./constants/images";
import Header from "./components/Header";
import { useState } from "react";
import { useViewport } from "./hooks/useViewport";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useTheme } from "./hooks/useTheme";
import TodoItems from "./components/TodoItems";
import AddTodo from "./components/AddTodo";

type Filter = "all" | "active" | "completed";

function App() {
  const [todos, setTodos] = useLocalStorage("todos");
  const [name, setName] = useState<string>("");
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const width = useViewport();
  const { toggleTheme, theme } = useTheme();
  const isMobile = width < 768;
  const {
    bgDesktopLight,
    iconMoon,
    iconSun,
    bgDesktopDark,
    bgMobileDark,
    bgMobileLight,
  } = images;
  const imageUrl = isMobile
    ? theme === "dark"
      ? bgMobileDark
      : bgMobileLight
    : theme === "dark"
    ? bgDesktopDark
    : bgDesktopLight;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: e.target.checked } : todo
      )
    );
  };

  const getFilteredTodos = () => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => todo.completed === false);
      case "completed":
        return todos.filter((todo) => todo.completed === true);
      default:
        return todos;
    }
  };

  const handleAddTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && name.trim() !== "") {
      const newTodo = {
        name: name.trim(),
        completed: false,
        id: crypto.randomUUID(),
      };
      setTodos((prevTodos) => {
        return [...prevTodos, newTodo];
      });
      setName("");
    }
  };
  const handleCheckTodo = () => {
    if (name.trim()) {
      const newTodo = {
        name: name.trim(),
        completed: false,
        id: crypto.randomUUID(),
      };
      setTodos((prevTodos) => {
        return [...prevTodos, newTodo];
      });
      setName("");
    }
  };

  const handleActive = () => {
    setFilter("active");
  };
  const handleClearCompleted = () => {
    setTodos((prevState) => {
      return prevState.filter((todo) => !todo.completed);
    });
  };

  const handleCompleted = () => {
    setFilter("completed");
  };

  const handleAllTodos = () => {
    setFilter("all");
  };

  const handleDragStart = (
    index: number,
    e: React.DragEvent<HTMLLIElement>
  ) => {
    setDraggedIndex(index);
    e.currentTarget.classList.add("dragging");
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const handleDragEnd = (e: React.DragEvent<HTMLLIElement>) => {
    e.currentTarget.classList.remove("dragging");
  };

  const handleDrop = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) return;
    const updatedTodos = [...todos];
    const [removed] = updatedTodos.splice(draggedIndex, 1);
    updatedTodos.splice(index, 0, removed);
    setTodos(updatedTodos);
    setDraggedIndex(null);
  };

  return (
    <>
      <Background imageUrl={imageUrl} />
      <main className="absolute top-[10%] left-1/2 -translate-x-1/2 md:w-[55%] w-[95%] z-10 flex flex-col">
        <Header
          title="TODO"
          imageTheme={theme === "dark" ? iconSun : iconMoon}
          onThemeToggle={toggleTheme}
        />
        <AddTodo
          name={name}
          onValueChange={handleInputChange}
          onAddEnter={handleAddTodo}
          onAdd={handleCheckTodo}
        />
        <TodoItems
          items={getFilteredTodos().map((todo, index) => ({
            ...todo,
            onCheck: (e: React.ChangeEvent<HTMLInputElement>) =>
              handleCheck(e, todo.id),
            onDragOver: (e: React.DragEvent<HTMLLIElement>) =>
              handleDragOver(e),
            onDragStart: (e: React.DragEvent<HTMLLIElement>) =>
              handleDragStart(index, e),
            onDragEnd: (e: React.DragEvent<HTMLLIElement>) => handleDragEnd(e),
            onDrop: () => handleDrop(index),
          }))}
          count={todos.filter((todo) => todo.completed === false).length}
          onActive={handleActive}
          onClear={handleClearCompleted}
          onCompleted={handleCompleted}
          onSelectAll={handleAllTodos}
          filter={filter}
        />
      </main>
    </>
  );
}

export default App;

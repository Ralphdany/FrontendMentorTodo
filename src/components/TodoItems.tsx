import type { TodoProps } from "./Todo";
import Todo from "./Todo";
interface TodoItemsProps {
  items: TodoProps[];
  count: number;
  onClear: () => void;
  onActive: () => void;
  onCompleted: () => void;
  onSelectAll: () => void;
  filter: "all" | "active" | "completed";
}

const TodoItems = ({
  items,
  count,
  onClear,
  onActive,
  onSelectAll,
  onCompleted,
  filter,
}: TodoItemsProps) => {
  return (
    <div className="my-10 shadow-md">
      <ul className="bg-white rounded-md dark:bg-navy-900">
        {items.map((item) => (
          <Todo key={item.id} {...item} />
        ))}
      </ul>
      <div className="lg:flex lg:justify-between dark:bg-navy-900 flex justify-center p-4 bg-white rounded-br-md rounded-bl-md">
        <p className="hidden lg:block border-none cursor-pointer max-sm:text-sm text-gray-600">
          {" "}
          {count} items left
        </p>
        <div className="flex justify-between gap-4">
          <p
            className={`border-none cursor-pointer max-sm:text-sm ${
              filter === "all" ? "text-primary" : ""
            } hover:text-navy-850 dark:hover:text-gray-50 text-gray-600 font-bold`}
            onClick={onSelectAll}
          >
            All
          </p>
          <p
            className={`border-none cursor-pointer max-sm:text-sm dark:hover:text-gray-50 hover:text-navy-850 text-gray-600 font-bold ${
              filter === "active" ? "text-primary" : ""
            } `}
            onClick={onActive}
          >
            Active
          </p>
          <p
            className={`border-none cursor-pointer max-sm:text-sm dark:hover:text-gray-50 hover:text-navy-850 text-gray-600 font-bold ${
              filter === "completed" ? "text-primary" : ""
            }`}
            onClick={onCompleted}
          >
            Completed
          </p>
        </div>
        <button
          className="cursor-pointer hidden lg:block max-sm:text-sm hover:text-navy-850 dark:hover:text-gray-300 text-gray-600"
          onClick={onClear}
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
};

export default TodoItems;

export interface TodoProps {
  name: string;
  completed: boolean;
  id: string;
  onCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDragStart: (e: React.DragEvent<HTMLLIElement>) => void;
  onDragEnd: (e: React.DragEvent<HTMLLIElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLLIElement>) => void;
  onDrop: () => void;
}

const Todo = ({
  name,
  completed,
  onCheck,
  onDragOver,
  onDragEnd,
  onDragStart,
  onDrop,
}: TodoProps) => {
  return (
    <li
      className={`flex items-center cursor-pointer dark:text-gray-50 py-4 px-4 gap-4 ${
        completed ? "line-through text-gray-300 dark:text-navy-850" : ""
      } active:opacity-[1] border-b border-b-gray-300 dark:border-b-navy-850`}
      draggable={true}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <input
        type="checkbox"
        size={25}
        checked={completed}
        onChange={onCheck}
        aria-label={`Mark ${name} as completed`}
      />
      <span>{name}</span>
    </li>
  );
};

export default Todo;

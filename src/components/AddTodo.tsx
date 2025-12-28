interface AddTodoProps {
  name: string;
  onValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onAdd: (e: React.MouseEvent<HTMLInputElement>) => void;
}

const AddTodo = ({ name, onValueChange, onAddEnter, onAdd }: AddTodoProps) => {
  return (
    <div className="relative">
      <input
        onClick={onAdd}
        type="checkbox"
        className="absolute inset-0 mr-auto my-auto ml-2"
      />
      <input
        placeholder="Create a new todo..."
        aria-label="Add new todo"
        type="text"
        value={name}
        onKeyDown={onAddEnter}
        className="w-full bg-white dark:text-gray-300 dark:bg-navy-900 border-none px-10 py-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-navy-850"
        onChange={onValueChange}
      />
    </div>
  );
};

export default AddTodo;

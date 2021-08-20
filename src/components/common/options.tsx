interface Props<T> {
  label?: string;
  options: { value: T; label: string }[];
  currentOptions: T;
  setCurrentOptions: (option: T) => void;
}

export default function SelectOptions<T>(props: Props<T>): JSX.Element {
  return (
    <div className="border-b-2 flex justify-between px-4">
      <select
        className="pr-2 outline-none w-full"
        value={JSON.stringify(props.currentOptions)}
        onChange={(e) => props.setCurrentOptions(JSON.parse(e.target.value))}
      >
        {props.options.map((option) => (
          <option value={JSON.stringify(option.value)} key={option.label}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

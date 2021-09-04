interface Props<T> {
  label?: string;
  options: { value: T; label: string }[];
  currentOptions: T;
  setCurrentOptions: (option: T) => void;
}

export default function SelectOptions<T>(props: Props<T>): JSX.Element {
  return (
    <div className="flex flex-wrap md:flex-nowrap justify-between w-full">
      {props.label && <div className="py-1">{props.label}</div>}
      <select
        className="px-4 py-1 outline-none w-full border-b-2"
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

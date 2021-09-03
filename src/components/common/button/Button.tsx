interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disable?: boolean;
}

export default function Button(props: Props): JSX.Element {
  return (
    <div
      onClick={() => props.onClick && props.onClick()}
      className={[
        'flex justify-center text-center items-center p-2 rounded-xl w-full h-full font-semibold uppercase',
        props.disable
          ? 'bg-gray-200 text-gray-500 select-none'
          : 'text-brown-700 bg-brown-200 hover:bg-brown-600 hover:text-brown-100',
        props.className,
      ].join(' ')}
    >
      {props.children}
    </div>
  );
}

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Button(props: Props): JSX.Element {
  return (
    <div
      onClick={() => props.onClick && props.onClick()}
      className={[
        'flex justify-center items-center rounded-xl w-full h-full',
        'text-brown-700 bg-brown-200 font-semibold uppercase',
        'hover:bg-brown-600 hover:text-brown-100',
        props.className,
      ].join(' ')}
    >
      {props.children}
    </div>
  );
}

interface Props {
  children: React.ReactNode;
}

export default function Popup(props: Props): JSX.Element {
  return (
    <div className="fixed top-0 left-0 w-full min-h-full bg-gray bg-opacity-80 flex justify-center items-center z-30">
      {props.children}
    </div>
  );
}

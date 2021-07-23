import React from 'react';
import { Link } from 'react-router-dom';
import { IImageTag } from 'interfaces/image-tag.interface';

interface Props {
  data: IImageTag;
  width: number;
}

const Wrapper = (props: {
  children: React.ReactNode;
  width: number;
  href?: string;
}): JSX.Element => {
  return (
    <div className="px-2 relative" style={{ width: `${props.width}%` }}>
      {props.href ? (
        <Link className="cursor-pointer" to={props.href}>
          {props.children}
        </Link>
      ) : (
        <div>{props.children}</div>
      )}
    </div>
  );
};

export default function ImageTag(props: Props): JSX.Element {
  return (
    <Wrapper width={props.width} href={props.data.href}>
      <img
        src={props.data.path}
        className={[
          'h-80 w-full rounded-xl shadow bg-brown-200 object-cover',
          props.data.href
            ? 'opacity-80 hover:shadow-2xl hover:opacity-100'
            : 'opacity-90',
        ].join(' ')}
        alt={props.data._id}
      />
      <span className="absolute bottom-4 left-5 text-l text-white font-bold uppercase drop-shadow-xl">
        {props.data.title}
      </span>
    </Wrapper>
  );
}

import React from 'react';
import Navbar from './navbar';
import Footer from './footer';

type Props = {
  children: React.ReactNode;
  allowSearch?: boolean;
};

export default function Layout(props: Props): JSX.Element {
  return (
    <div className="min-h-full flex flex-col">
      <Navbar allowSearch={props.allowSearch} />
      <div className="p-8">{props.children}</div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}

import React, { FC, ReactNode } from 'react';
import Aside from './Aside';
import Nav from './Nav';
import Raside from './Raside';
import { userid_context } from '../home_component/Home';
import { useContext } from 'react';
import bg from './bg.gif';

interface SlotContainerProps {
  children: ReactNode;
}

export const Newslot: FC<SlotContainerProps> = ({ children }) => {
  return (
    <div className="flex flex-row justify-center px-10 pt-10 gap-16 bg-darkblue max-lg:bg-gray-800 max-lg:grid-cols-1">
      <Nav />
      <div className="grid grid-cols-8 gap-7 w-11/12  max-lg:grid-cols-1">
        <Aside />
        {children}
        <Raside />
      </div>
      <footer className='h-14 bg-gray-800 w-screen'>
        <div className=''>jefhwjefhwejf</div>
      </footer>
    </div>
  );
};

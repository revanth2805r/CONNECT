import  { FC, ReactNode } from 'react';
import Aside from './Aside';
import Nav from './Nav';
import Raside from './Raside';


interface SlotContainerProps {
  children: ReactNode;
}

export const DashboardLayout: FC<SlotContainerProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center px-10 pt-10 gap-16 bg-darkblue  max-lg:grid-cols-1 max-first:p-2">
      <Nav/>
      <div className="grid grid-cols-8 gap-7 w-11/12  max-lg:grid-cols-1">
        <Aside/>
        {children}
        <Raside/>
      </div>
      <footer className=" text-white text-center py-4">
      <div className="container mx-auto">
        <p>&copy; 2024 Connect. All rights reserved.</p>
      </div>
    </footer>
    </div>
  );
};

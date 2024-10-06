import React from "react";
import { Navbar } from "./navbar";

export interface IHasChildrenProps {
  children?: React.ReactNode;
}
  
const Layout: React.FC<IHasChildrenProps> = (props) => {
    return (
        <main>
          <div className="max-h-screen">
            <div className='relative h-full'>
              <Navbar/>
              <div className='relative justify-items-center p-8 pb-20 sm:p-20 '>
                <div className='flex flex-col items-center'>
                  <section>
                      {props.children}
                  </section>
                </div>
              </div>
            </div>
          </div>
        </main>
      );
}
export default Layout;

export const HorizontalSection: React.FC<IHasChildrenProps> = (props) => {
  return <div className="max-w-screen-xl mx-auto px-4 py-28 gap-12 overflow-hidden items-center md:px-8 md:flex">{props.children}</div>
}

export const VerticalSection: React.FC<IHasChildrenProps> = (props) => {
  return <div className='flex-none space-y-5 max-w-xl'>{props.children}</div>
}




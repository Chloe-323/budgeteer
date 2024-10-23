import React from "react";
import { Navbar } from "./navbar";
import { BudgetSidebar, SelfLoadingBudgetSidebar } from "./budgetsidebar";

export interface IHasChildrenProps {
  children?: React.ReactNode;
}

export interface ILayoutProps extends IHasChildrenProps {
  sidebar?: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = (props) => {
  return (
    <main className="h-full flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        {props.sidebar}
        <div className={`flex-1 flex items-center justify-center p-8 pb-20 sm:p-20 ${props.sidebar ? "md:w-[calc(100%-256px)] md:ml-64" : ""}`}>
          <div className="flex flex-col items-center">
            <section>
              {props.children}
            </section>
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
  return <div className="flex-none space-y-5 max-w-xl">{props.children}</div>
}

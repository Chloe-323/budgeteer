import { useEffect, useState } from "react";
import { IBudgetMetadata } from "./budget";
import { PlusIcon } from "@heroicons/react/24/outline";

export interface IBudgetSidebarProps {
    budgets: IBudgetMetadata[];
    currentBudget?: number;
}

export const BudgetSidebar: React.FC<IBudgetSidebarProps> = (props: IBudgetSidebarProps) => {
    console.log(props.budgets);
    
    //a function to display a modal popup with a form to create a new budget
    const handleCreateBudget = () => {
        console.log('Create budget');
    }

    return (<div id="sidebar" className="sidebar-menu lg:block hidden bg-cascade-100 w-64 h-screen fixed rounded-none border-none">
         <div className="p-4 space-y-4">
            <a onClick={handleCreateBudget} className="px-4 py-3 flex items-center space-x-4 cursor-pointer rounded-md text-cascade-700 hover:bg-cascade-400 hover:text-foreground group">
                <PlusIcon className="w-6 h-6" />
                <span>Create Budget</span>
            </a>

          {
            props.budgets.map((budget, index) => {
            return index === props.currentBudget ? 
            <a href="#" aria-label="dashboard" className="relative px-4 py-3 flex items-center space-x-4 rounded-lg text-foreground bg-cascade-400">
                <span className="-mr-1 font-medium">{budget.name}</span>
            </a> :
            <a key={index} href="#" className="px-4 py-3 flex items-center space-x-4 rounded-md text-cascade-700 hover:bg-cascade-400 hover:text-foreground group">
                <span>{budget.name}</span>
            </a>
          })}
         </div>
    </div>);
}

export const SelfLoadingBudgetSidebar: React.FC = () => {
    const [budgets, setBudgets] = useState<IBudgetMetadata[]>([]);
    useEffect(() => {
        const fetchData = async () => {
          const result = await fetch('/api/get_budgets',{
          method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(!result.ok) {
            console.log('Error fetching budgets');
            return;
        }
        const data = await result.json();
        setBudgets(data.returnValue);
      };
      fetchData();
      }, [])

      console.log(budgets);
      return <BudgetSidebar budgets={budgets} />;
}
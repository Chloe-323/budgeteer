import { useEffect, useState } from "react";
import { IBudgetMetadata } from "./budget";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Modal } from "./modal";
import Form from "./form";
import { Card } from "./elements";
import { getJsonFromResponse } from "../_app";

export interface IBudgetSidebarProps {
    budgets: IBudgetMetadata[];
    currentBudget?: number;
    modalOpen?: boolean;
    setModalOpen?: (open: boolean) => void;
}


export const BudgetSidebar: React.FC<IBudgetSidebarProps> = (props: IBudgetSidebarProps) => {
    console.log(props.budgets);
    const [open, setOpen] = (props.modalOpen !== undefined && props.setModalOpen !== undefined ? [props.modalOpen, props.setModalOpen] : useState(false));
    const [responseMessage, setResponseMessage] = useState('');

    //a function to display a modal popup with a form to create a new budget
    const openCreateBudgetModal = () => {
        console.log('Create budget');
        //display modal
        setOpen(true);
    }

    const handleCreateBudget = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const startDate = formData.get('startDate') as string;
        const endDate = formData.get('endDate') as string;

        const response = await fetch('/api/create_budget', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, startDate, endDate })
        });

        const data = await getJsonFromResponse(response);

        if (!response.ok) {
            if(data && 'error' in data){
                setResponseMessage(data.error);
            } else {
                setResponseMessage('An unknown error occurred');
            }
            return;
        }
        setOpen(false);
    }

    return (<div id="sidebar" className="sidebar-menu lg:block hidden bg-cascade-100 w-64 h-screen fixed rounded-none border-none">
         <div className="p-4 space-y-4">
            <a onClick={openCreateBudgetModal} className="px-4 py-3 flex items-center space-x-4 cursor-pointer rounded-md text-cascade-700 hover:bg-cascade-400 hover:text-foreground group">
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
         <Modal open={open} setOpen={setOpen}>
            <div className="p-4">
            <Form items={[
                {
                    type: 'text',
                    placeholder: 'Budget Name',
                    id: 'name',
                },
                {
                    type: 'date',
                    placeholder: 'Start Date',
                    id: 'startDate',
                    label: 'Start Date',
                },
                {
                    type: 'date',
                    placeholder: 'End Date',
                    id: 'endDate',
                    label: 'End Date',
                }
            ]} 
                onSubmit={handleCreateBudget}
            />
            </div>
            {responseMessage && 
                        <div className="bg-red-500 mt-0 mb-0 text-white p-4 rounded shadow-lg" style={{ marginTop: 0, marginBottom: 0 }}>
                            {responseMessage}
                        </div>
            }
        </Modal>
    </div>);
}

export const SelfLoadingBudgetSidebar: React.FC = () => {
    const [budgets, setBudgets] = useState<IBudgetMetadata[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch('/api/get_budgets',{
          method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(!response.ok) {
            console.log('Error fetching budgets');
            return;
        }
        const data = await getJsonFromResponse(response);
        if(Array.isArray(data)) {
            setBudgets(data);
        }
      };
      fetchData();
      }, [modalOpen])

      console.log(budgets);
      return <BudgetSidebar budgets={budgets} modalOpen={modalOpen} setModalOpen={setModalOpen} />;
}
import { useState, useEffect } from "react";
import { getJsonFromResponse } from "../_app";

export interface IBudgetViewProps {
    metadata: IBudgetMetadata;
}
export interface IBudgetMetadata {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
}

export interface IBudgetCategory {
    name: string;
    budgetedAmount: number;
    subCategories?: IBudgetSubCategory[];
}

export interface IBudgetSubCategory {
    name: string;
    budgetedAmount: number;
}

export interface IBudgetTransaction {
    date: string;
    description: string;
    amount: number;
    category: string;
    subCategory?: string;
}

export interface IBudgetData {
    expenseCategories: IBudgetCategory[],
    incomeCategories: IBudgetCategory[],
    transactions: IBudgetTransaction[]
}
export class Budget {
    constructor(
        public metadata: IBudgetMetadata,
        public data: IBudgetData,
    ) {}
}

async function decryptBudget(encryptedBudget: string, key: string): Promise<IBudgetData> {
    // Decrypt the budget using the key
    // Return the decrypted budget
    // Not implemented

    return {
        expenseCategories: [
            {
                name: "Housing",
                budgetedAmount: 1000,
                subCategories: [
                    {
                        name: "Rent",
                        budgetedAmount: 800
                    },
                    {
                        name: "Utilities",
                        budgetedAmount: 200
                    }
                ]
            },
            {
                name: "Transportation",
                budgetedAmount: 200
            }
        ],
        incomeCategories: [
            {
                name: "Salary",
                budgetedAmount: 2000
            }
        ],
        transactions: [
            {
                date: "2022-01-01",
                description: "Rent",
                amount: 800,
                category: "Housing",
                subCategory: "Rent"
            },
            {
                date: "2022-01-02",
                description: "Utilities",
                amount: 200,
                category: "Housing",
                subCategory: "Utilities"
            },
            {
                date: "2022-01-03",
                description: "Salary",
                amount: 2000,
                category: "Salary"
            }
        ]
    };
}

async function getBudget(metadata: IBudgetMetadata): Promise<Budget | null> {
    // Get the encrypted budget from the database
    // Get the key from the session
    // Decrypt the budget
    // Return the decrypted budget

    const response = await fetch('/api/get_budget_blob', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: metadata.id }),
    });

    if (!response.ok) {
        return null;
    }

    const data = await getJsonFromResponse(response);

    return new Budget(metadata, await decryptBudget(data.encryptedBudget, localStorage.getItem('privatePin') as string));
}

async function saveBudget(id: number, budget: Budget): Promise<boolean> {
    // Encrypt the budget
    // Save the encrypted budget to the database
    // Not implemented

    return true;
}

export const BudgetView: React.FC<IBudgetViewProps> = (props: IBudgetViewProps) => {
    const [budget, setBudget] = useState<Budget | null>(null);

    useEffect(() => {
        getBudget(props.metadata).then((budget) => {
            setBudget(budget);
        });
    }, [props.metadata.id]);

    if (!budget) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{budget.metadata.name}</h1>
            <h2>Start Date: {budget.metadata.startDate}</h2>
            <h2>End Date: {budget.metadata.endDate}</h2>
            <h2>Income</h2>
            <ul>
                {budget.data.incomeCategories.map((category) => (
                    <li key={category.name}>
                        {category.name}: {category.budgetedAmount}
                    </li>
                ))}
            </ul>
            <h2>Expenses</h2>
            <ul>
                {budget.data.expenseCategories.map((category) => (
                    <li key={category.name}>
                        {category.name}: {category.budgetedAmount}
                        {category.subCategories && (
                            <ul>
                                {category.subCategories.map((subCategory) => (
                                    <li key={subCategory.name}>
                                        {subCategory.name}: {subCategory.budgetedAmount}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
            <h2>Transactions</h2>
            <ul>
                {budget.data.transactions.map((transaction) => (
                    <li key={transaction.description}>
                        {transaction.date}: {transaction.description} - {transaction.amount}
                    </li>
                ))}
            </ul>
        </div>
    );

}
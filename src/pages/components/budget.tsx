'use client'

import { useState, useEffect } from "react";
import { getJsonFromResponse } from "../_app";
import * as CryptoJS from 'crypto-js';
import { assert } from "console";
import { Header1 } from "./elements";

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

function assertIsIBudgetData(data: any): asserts data is IBudgetData {
    if (!data.expenseCategories || !data.incomeCategories || !data.transactions) {
        throw new Error('Invalid budget data');
    }
    if(!Array.isArray(data.expenseCategories) || !Array.isArray(data.incomeCategories) || !Array.isArray(data.transactions)) {
        throw new Error('Invalid budget data');
    }
    //TODO: Stronger type checking
}

async function decryptBudget(encryptedBudget: string, key: string): Promise<IBudgetData | null> {
    // Decrypt the budget using the key
    // Return the decrypted budget
    // Not implemented

    const retval = JSON.parse(CryptoJS.AES.decrypt(encryptedBudget, key).toString(CryptoJS.enc.Utf8));
    return retval as IBudgetData;
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

async function encryptBudget(budgetData: IBudgetData, key: string): Promise<string> {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(budgetData), key).toString();
    return encrypted;
}

async function saveBudget(id: number, budget: Budget): Promise<boolean> {
    // Encrypt the budget
    // Save the encrypted budget to the database
    // Not implemented

    const encrypted = await encryptBudget(budget.data, localStorage.getItem('privatePin') as string);
    const response = await fetch('/api/save_budget_blob', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, blob: encrypted }),
    });

    if (!response.ok) {
        return false;
    }
    return true;
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
    if(!data){
        return null;
    }

    if(data.blob === null) {
        //Empty budget
        return new Budget(metadata, {
            expenseCategories: [],
            incomeCategories: [],
            transactions: []
        });
    }
    const budgetData = await decryptBudget(data.blob, localStorage.getItem('privatePin') as string);
    if(!budgetData) {
        return null;
    }
    return new Budget(metadata, budgetData);
}


export const BudgetView: React.FC<IBudgetViewProps> = (props: IBudgetViewProps) => {
    const [budget, setBudget] = useState<Budget | null>(null);

    console.log(props.metadata);
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
            <Header1>{budget.metadata.name}</Header1>
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
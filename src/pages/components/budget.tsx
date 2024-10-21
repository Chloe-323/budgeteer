export interface IBudgetMetadata {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
}

export interface IBudgetCategory {
    name: string;
    budgetedAmount: number;
    subCategories?: IBudgetCategory[];
}

export interface IBudgetTransaction {
    date: string;
    description: string;
    amount: number;
    category: string;
    subCategory?: string;
}

export interface IBudget {
    metadata: IBudgetMetadata;
    expenseCategories: IBudgetCategory[];
    incomeCategories: IBudgetCategory[];
    transactions: IBudgetTransaction[];
}


async function decryptBudget (encryptedBudget: string, key: string): Promise<IBudget> {
    // Decrypt the budget using the key
    // Return the decrypted budget
    // Not implemented

    return {
        metadata: {
            id: "1",
            name: "Budget 1",
            startDate: "2022-01-01",
            endDate: "2022-01-31"
        },
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
    }
}
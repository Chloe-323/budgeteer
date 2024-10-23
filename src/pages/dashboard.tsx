import { BudgetView, IBudgetMetadata } from "./components/budget";
import { SelfLoadingBudgetSidebar } from "./components/budgetsidebar";
import Layout, { HorizontalSection, VerticalSection } from "./components/layout";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [selectedBudget, setSelectedBudget] = useState<IBudgetMetadata | undefined>(undefined);
    return (
        <Layout sidebar={<SelfLoadingBudgetSidebar selectedBudget={selectedBudget} setSelectedBudget={setSelectedBudget}/>}>
            <HorizontalSection>
                <VerticalSection>
                    {selectedBudget ? 
                    <BudgetView metadata={selectedBudget} />
                     : <h1>No budget selected</h1>}
                </VerticalSection>
            </HorizontalSection>
        </Layout>
    );
}

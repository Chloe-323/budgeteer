import Layout, { HorizontalSection, VerticalSection } from "./components/layout";
import { useEffect, useState } from "react";

export default function Dashboard() {
  return (
    <Layout sidebar>
        <HorizontalSection>
          <VerticalSection>
            <h1>No budgets yet</h1>
          </VerticalSection>
        </HorizontalSection>
    </Layout>
  );
}

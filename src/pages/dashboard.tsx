import Layout, { HorizontalSection, VerticalSection } from "./components/layout";
import { useEffect, useState } from "react";

export default function Home() {
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('/api/hello',{
      method: 'POST'
    });
    const data = await result.json();
    setResponseMessage(data.name);
  };
  fetchData();
  }, [])

  return (
    <Layout>
        <HorizontalSection>
          <VerticalSection>
          {responseMessage ? <p>{responseMessage}</p> : <p>Loading...</p>}
          </VerticalSection>
        </HorizontalSection>
    </Layout>
  );
}

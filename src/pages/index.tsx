import Image from "next/image";
import localFont from "next/font/local";
import Layout, { HorizontalSection, VerticalSection } from "./components/layout";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const raleway = localFont({
  src: "./fonts/Raleway.ttf",
  variable: "--font-raleway",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <Layout>
          <HorizontalSection>
        <VerticalSection>
          Some placeholder for a home page
        </VerticalSection>
        </HorizontalSection>

    </Layout>
  );
}

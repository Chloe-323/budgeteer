import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Raleway } from 'next/font/google'

const raleway = Raleway({ subsets: ["latin"] })

export default function App({ Component, pageProps }: AppProps) {
    return <main className={raleway.className}><Component {...pageProps} /></main>;
}

export const clientSalt = "EOKQZhBpgT/mVI/HX060XdG8WqUdGu3ErL1TDgUZ7KE=";

export async function getJsonFromResponse(response: Response): Promise<any> {
    //check if response has JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
        return null;
    }
    const data = await response.json();
    return data;
}

export function getCookie(name: string): string {
    let cookieName = name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return "";
}

export function cookieExists(name: string): boolean {
    return getCookie(name) !== "";
}
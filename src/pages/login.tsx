import Layout, { HorizontalSection, VerticalSection } from "./components/layout";
import { useEffect, useState } from "react";
import { Card } from "./components/elements";
import * as CryptoJS from 'crypto-js';
import { clientSalt, getJsonFromResponse } from "./_app";
import { Form } from "./components/form";

export async function hashPassword(password: string, salt: string): Promise<string> {
    const hash = CryptoJS.SHA256(password + salt).toString();
    return hash;
}

export default function Login() {

    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const pin = formData.get('pin') as string;

        //Yes, this salt is visible to anyone, and anyone can prepare a rainbow table for it, but this is just so
        //that we don't send the plaintext password to the server. The server will hash it again properly.
        const prelimHashedPassword = await hashPassword(password, clientSalt);

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password: prelimHashedPassword })
        });

        const data = await getJsonFromResponse(response);

        if (!response.ok) {
            setResponseMessage(data.error ?? 'An unknown error occurred');
            return;
        }

        const privatePin = await hashPassword(password, pin);
        localStorage.setItem('privatePin', privatePin);

        window.location.href = '/dashboard';
    }

    return (
        <Layout>
            <HorizontalSection>
                <VerticalSection>
                    <Card>
                        <h2 className="text-2xl font-bold text-center">Log In</h2>
                        <Form onSubmit={handleSubmit} items={
                            [
                                {
                                    id: 'email',
                                    type: 'email',
                                    placeholder: 'Email',
                                },
                                {
                                    id: 'password',
                                    type: 'password',
                                    placeholder: 'Password',
                                },
                                {
                                    id: 'pin',
                                    type: 'password',
                                    placeholder: 'PIN',
                                }
                            ]
                        } />
                        {responseMessage && 
                        <div className="bg-red-500 mt-0 mb-0 text-white p-4 rounded shadow-lg" style={{ marginTop: 0, marginBottom: 0 }}>
                            {responseMessage}
                        </div>
                        }
                        <p className="text-sm text-cascade-900 ">Don't have an account? <a className="italic text-cascade-700 hover:text-cascade-900" href="/signup">Sign up here</a></p>

                    </Card>
                </VerticalSection>
            </HorizontalSection>
        </Layout>
    );
}

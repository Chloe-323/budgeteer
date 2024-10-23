import Layout, { HorizontalSection, VerticalSection } from "./components/layout";
import { useEffect, useState } from "react";
import { Card } from "./components/elements";
import * as CryptoJS from 'crypto-js';
import { clientSalt, getJsonFromResponse } from "./_app";
import { Form } from "./components/form";
import { hashPassword } from "./login";

export default function Signup() {

    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const pin = formData.get('pin') as string;

        //Yes, this salt is visible to anyone, and anyone can prepare a rainbow table for it, but this is just so
        //that we don't send the plaintext password to the server. The server will hash it again properly.
        const prelimHashedPassword = await hashPassword(password, clientSalt);

        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password: prelimHashedPassword })
        });

        const data = await getJsonFromResponse(response);

        if (data.error) {
            setResponseMessage(data.error);
            return;
        }

        window.location.href = '/login';
    }

    return (
        <Layout>
            <HorizontalSection>
                <VerticalSection>
                    <Card>
                        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
                        <Form onSubmit={handleSubmit} items={
                            [
                                {
                                    id: 'name',
                                    type: 'text',
                                    placeholder: 'Name',
                                },
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
                                    tooltip: 'This is a second password that will be used to encrypt your data. It will not be stored on the server, and it will not be recoverable if you forget it.',
                                }
                            ]
                        } />
                        {responseMessage && 
                        <div className="bg-red-500 mt-0 mb-0 text-white p-4 rounded shadow-lg" style={{ marginTop: 0, marginBottom: 0 }}>
                            {responseMessage}
                        </div>
                        }
                        <p className="text-sm text-cascade-900 ">Already have an account? <a className="italic text-cascade-700 hover:text-cascade-900" href="/login">Log in here</a></p>

                    </Card>
                </VerticalSection>
            </HorizontalSection>
        </Layout>
    );
}

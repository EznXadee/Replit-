import "./styles.scss";
import { TextInput } from '@mantine/core';
import { Button, Alert } from '@mantine/core';
import { useState } from 'react';
import axios from 'axios';

export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://18.205.153.235:8000/api/login', { email, password
            });
            console.log('Login response:', response.data);
            if (response.data.token) {
                window.location.href = '/dashboard';
            }
        }
        catch (error) {
            console.error('Login error:', error);
            setError('Invalid email or password');
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Email and Password are required');
        } else {
            setError('');
            console.log('Form submitted with:', { email, password });
            handleLogin();
        }
    };

    return (
        <main id="login" className="flex justify-center items-center bg-[#edeef0] w-[100svw] h-[100svh]">
            <div className="flex w-[90%] h-[500px] bg-[#fff] rounded-[20px] max-w-[800px]">
                <section className="flex flex-col w-[50%] p-[40px]" >
                    <h1 className="text-3xl font-bold items-center">CRM AI Watchdog</h1><span className=""></span>
                    <h1 className="mt-2">Login to Your Account!</h1>
                    <div className="grow"></div>
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <TextInput
                            label="Email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <TextInput
                            className="mt-5"
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <hr className="mt-8 mb-8" />
                        <Button type="submit" className="!w-[100%]" variant="filled">Login to Your Account</Button>
                    </form>
                    {error && (
                        <Alert className="!p-[7px] mt-5 text-center" variant="light" color="red">
                            <span className="!text-[#f54254]">{error}</span>
                        </Alert>
                    )}
                    <div className="grow"></div>
                    <p className="text-center">Dont have an account? <a className="text-[#424bf5]" href="/register">Register</a></p>
                </section>
                <section className="w-[50%] "></section>
            </div>
        </main>
    );
}

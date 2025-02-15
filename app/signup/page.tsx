"use client"
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { Form } from "../components/Form";
import { redirect, useRouter } from "next/navigation";
import Card from "../components/Card";
import findUser from "../lib/serverActions/findUserExists";
import { toast } from "react-toastify";
import { addUsername } from "../lib/serverActions/addUsername";

export default function SignUp() {
    const { data: session, status } = useSession();
    const [step, setStep] = useState(1);
    const router = useRouter();

    // Handle session changes
    useEffect(() => {
       
        if (status === "authenticated" ) {
             //@ts-ignore
            if(!session.user.onboarded)
            setStep(2);
            else redirect('/')
        }
    }, [status, session]);

    const handleGoogleSignIn = async () => {
        try {
            const result = await signIn('google', {
                redirect: false,
                callbackUrl: window.location.href
            });

            if (result?.error) {
                toast.error("Failed to sign in with Google");
                return;
            }
            
            // Don't set step here - let the useEffect handle it
        } catch (error) {
            toast.error("Error signing in with Google");
            console.error("Sign in error:", error);
        }
    };

    const registerUser = async (data: { username: string }) => {
        const { username } = data;
        
        try {
            const exists = await findUser("username", username);
            
            if (exists) {
                toast.error("User with username already exists");
                return;
            }

            const email = session?.user?.email;
            if (!email) {
                toast.error("No email found in session");
                return;
            }

            const res = await addUsername(email, username);
            if (res) {
                toast.success("Username set successfully");
                router.push('/');
            } else {
                toast.error("Failed to set username");
            }
        } catch (error) {
            console.error("Error registering user:", error);
            toast.error("Error creating the user");
        }
    };

    return (
        <div className="w-screen h-[80%] flex items-center justify-center">
            <div>
            <div className="text-slate-100 w-full flex sm:text-3xl text-2xl justify-center">
                Login To Account
            </div>
            <div className="flex flex-col h-full justify-center">
                <Card className="bg-slate-700">
                    {step === 1 ? (
                        <button
                            onClick={handleGoogleSignIn}
                            className="w-full"
                        >
                            <div className="flex justify-center items-center p-4">
                                <svg width="40px" height="40px" viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
                                    <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"/>
                                    <path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"/>
                                    <path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"/>
                                    <path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"/>
                                </svg>
                                <div className="px-3 mx-2 md:text-lg text-sm font-bold text-slate-300">
                                    CONTINUE WITH GOOGLE
                                </div>
                            </div>
                        </button>
                    ) : step === 2 ? (
                        <Form
                            formName="Select a Username"
                            fields={[{
                                name: "username",
                                type: "text",
                                label: "Username",
                                placeholder: "Enter your Username"
                            }]}
                            ButtonName="Create Account"
                            onSubmit={registerUser}
                        />
                    ) : null}
                    
                </Card>
                </div>
            </div>
        </div>
    );
}
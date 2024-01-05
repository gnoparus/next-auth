"use client"

import Link from "next/link"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';

export default function LoginPage() {
    const router = useRouter()
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(true)
    const [loading, setLoading] = React.useState(false)

    useEffect(() => {
        console.log("useEffect")
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])


    const onLogin = async () => {
        console.log("onLogin")
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", user)
            console.log("Login success", response.data)
            toast.success("Login success")
            router.push("/profile")

        } catch (error: any) {
            console.log("Login failed", error.message)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (<div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Loading" : "Login"}</h1>
        <hr />
        <div><Toaster /></div>
        <label htmlFor="email">email</label>
        <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" id="email" type="text" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder="email" />
        <label htmlFor="email">password</label>
        <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" id="password" type="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder="password" />
        <button onClick={onLogin} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" type="button" disabled={buttonDisabled}>Login</button>
        <Link href="/signup">Visit Signup page</Link>
    </div>)
}
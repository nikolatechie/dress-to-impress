import loginBgImage from "../../assets/img/login/signin-bg.jpg";
import {FormEvent, useState} from "react";
import {z} from "zod";
import {Alert} from "react-bootstrap";
import axios from "axios";
// import {useMutation} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";

function LoginPage() {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const navigate = useNavigate();

    const loginSchema = z.object({
        email: z.string().email(),
        password: z.string().min(8),
        rememberMe: z.boolean()
    })

    const sendLoginRequest = async () => {
        return await axios.post("/api/login", {
            email,
            password,
            rememberMe,
        })
    }

    const login = async (e: FormEvent) => {
        e.preventDefault();
        const data = {
            email,
            password,
            rememberMe
        }
        const result = loginSchema.safeParse(data);

        if(!result.success) {
            setError("Invalid data provided. Please fill in all fields.");
            setTimeout(() => {
                setError(undefined);
            }, 5000);
            return;
        }

        //Send API
        const resp = await sendLoginRequest();
        //Save JWT
        const jwt = resp.data.jwt;

        if(jwt) {
            localStorage.setItem("jwt", jwt);
            navigate("/");
            return;
        }
        alert("There was an error retrieving the token. Please try again.");
    }

    return (
        <>
            <section className="position-relative h-100 pt-5 pb-4">
                <div className="container d-flex flex-wrap justify-content-center justify-content-xl-start h-100 pt-5">
                    <div className="w-100 align-self-end pt-1 pt-md-4 pb-4" style={{maxWidth: "526px"}}>
                        { error && <Alert variant="danger">{error}</Alert> }
                        <h1 className="text-center text-xl-start">Welcome Back</h1>
                        <p className="text-center text-xl-start pb-3 mb-3">Don’t have an account yet? <a
                            href="/register">Register here.</a></p>
                        <form className="needs-validation mb-2" onSubmit={login} noValidate>
                            <div className="position-relative mb-4">
                                <label htmlFor="email" className="form-label fs-base">Email</label>
                                <input type="email" id="email" className="form-control form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                <div className="invalid-feedback position-absolute start-0 top-100">Please enter a valid
                                    email address!
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="form-label fs-base">Password</label>
                                <div className="password-toggle">
                                    <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} id="password" className="form-control form-control-lg"
                                           required/>
                                    <label className="password-toggle-btn" aria-label="Show/hide password">
                                        <input className="password-toggle-check" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)} type="checkbox"/>
                                        <span className="password-toggle-indicator"></span>
                                    </label>
                                    <div className="invalid-feedback position-absolute start-0 top-100">Please enter
                                        your password!
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="form-check">
                                    <input type="checkbox" id="remember" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="form-check-input"/>
                                    <label htmlFor="remember" className="form-check-label fs-base">Remember me</label>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary shadow-primary btn-lg w-100">Sign in
                            </button>
                        </form>
                        <a href="#" className="btn btn-link btn-lg w-100">Forgot your password?</a>
                        <hr className="my-4"/>
                    </div>
                    <div className="w-100 align-self-end">
                        <p className="fs-xs text-center text-xl-start pb-5 mb-0">
                            &copy; All rights reserved.
                        </p>
                    </div>
                </div>

                <div
                    className="position-absolute top-0 end-0 w-50 h-100 bg-position-center bg-repeat-0 bg-size-cover d-none d-xl-block"
                    style={{backgroundImage: `url(${loginBgImage})`}}></div>
            </section>
        </>
    );
}

export default LoginPage;
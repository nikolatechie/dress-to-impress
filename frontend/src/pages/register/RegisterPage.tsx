import loginBgImage from "../../assets/img/login/signin-bg.jpg";
import {FormEvent, useState} from "react";
import {z} from "zod";
import {useNavigate} from "react-router-dom";
import {Alert} from "react-bootstrap";
import axios from "axios";
import {useMutation} from "@tanstack/react-query";

function RegisterPage() {
    const [fullName, setFullName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [confirmPassword, setConfirmPassword] = useState<string>();
    const [tosAgree, setTosAgree] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const navigate = useNavigate();

    const registerSchema = z.object({
        fullName: z.string(),
        email: z.string().email(),
        password: z.string().min(8),
        confirmPassword: z.string().min(8)
    })

    const sendRegisterRequest = async () => {
        return await axios.post("/api/register", {
            firstName: fullName!.split(" ")[0],
            lastName: fullName!.split(" ")[1],
            email: email,
            password: password
        })
    }

    const registerMutation = useMutation({
        mutationFn: sendRegisterRequest,
        onSuccess: () => {
            navigate("/login")
        },
        onError: (e) => {
            setError(e.message)
        }
    })

    const register = (e: FormEvent) => {
        e.preventDefault();
        if(!tosAgree) {
            setError("Please agree to the Terms and Service.");
            setTimeout(() => {
                setError(undefined);
            }, 5000)
            return;
        }
        const data = {
            fullName,
            email,
            password,
            confirmPassword
        }
        const validationResult = registerSchema.safeParse(data);

        if(!validationResult.success) {
            setError("Invalid data provided. Please fill in all fields.");
            setTimeout(() => {
                setError(undefined);
            }, 5000)
            return;
        }

        if(password !== confirmPassword) {
            setError("Passwords do not match.");
            setTimeout(() => {
                setError(undefined);
            }, 5000)
            return;
        }

        registerMutation.mutate();
    }

    return (
        <>
            <section className="position-relative h-100 pt-5 pb-4">
                <div className="container d-flex flex-wrap justify-content-center justify-content-xl-start h-100 pt-5">
                    <div className="w-100 align-self-end pt-1 pt-md-4 pb-4" style={{maxWidth: "526px"}}>
                        {error && <Alert variant="danger">{error}</Alert> }
                        <h1 className="text-center text-xl-start">Create Account</h1>
                        <p className="text-center text-xl-start pb-3 mb-3">Already have an account? <a
                            href="/login">Sign in here.</a></p>
                        <form className="needs-validation" onSubmit={register} noValidate>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="position-relative mb-4">
                                        <label htmlFor="name" className="form-label fs-base">Full name</label>
                                        <input type="text" id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="form-control form-control-lg" required/>
                                        <div className="invalid-feedback position-absolute start-0 top-100">Please enter
                                            your name!
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="position-relative mb-4">
                                        <label htmlFor="email" className="form-label fs-base">Email</label>
                                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control form-control-lg"
                                               required/>
                                        <div className="invalid-feedback position-absolute start-0 top-100">Please enter
                                            a valid email address!
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 mb-4">
                                    <label htmlFor="password" className="form-label fs-base">Password</label>
                                    <div className="password-toggle">
                                        <input type={`${showPassword ? "text" : "password"}`} id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control form-control-lg"
                                               required/>
                                        <label className="password-toggle-btn" aria-label="Show/hide password">
                                            <input className="password-toggle-check" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)} type="checkbox"/>
                                            <span className="password-toggle-indicator"></span>
                                        </label>
                                        <div className="invalid-feedback position-absolute start-0 top-100">Please enter
                                            a password!
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 mb-4">
                                    <label htmlFor="password-confirm" className="form-label fs-base">Confirm
                                        password</label>
                                    <div className="password-toggle">
                                        <input type={`${showConfirmPassword ? "text" : "password"}`}   value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} id="password-confirm"
                                               className="form-control form-control-lg" required/>
                                        <label className="password-toggle-btn" aria-label="Show/hide password">
                                            <input className="password-toggle-check" checked={showConfirmPassword} onChange={(e) => setShowConfirmPassword(e.target.checked)} type="checkbox"/>
                                            <span className="password-toggle-indicator"></span>
                                        </label>
                                        <div className="invalid-feedback position-absolute start-0 top-100">Please enter
                                            a password!
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="form-check">
                                    <input type="checkbox" checked={tosAgree} onChange={(e) => setTosAgree(e.target.checked)} id="terms" className="form-check-input"/>
                                    <label htmlFor="terms" className="form-check-label fs-base">I agree to <a
                                        href="#">Terms &amp; Conditions</a></label>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary shadow-primary btn-lg w-100">Sign up
                            </button>
                        </form>
                        <hr className="my-4"/>
                    </div>
                    <div className="w-100 align-self-end">
                        <p className="fs-xs text-center text-xl-start pb-2 mb-0">
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

export default RegisterPage;
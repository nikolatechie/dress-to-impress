import {Spinner} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import {MutationFunction, useMutation} from "@tanstack/react-query";
import axios from "axios";
import {useEffect} from "react";

function VerifyEmailPage() {

    const location = useLocation();
    const navigate = useNavigate();

    const sendToken = async (): Promise<MutationFunction<unknown, void>> => {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get("token");

        if(!token) {
            alert("Invalid token.");
            navigate("/");
        }
        console.log(token);
        return await axios.get("/api/verify-email?token="+token)
    }

    const verificationMutation = useMutation({
        mutationFn: sendToken,
        onSuccess: () => {
            navigate("/login");
        },
        onError: (e) => {
            alert(e.message);
            navigate("/");
        }
    })

    useEffect(() => {
        verificationMutation.mutate();
    }, [])

    return (
        <>
            <Spinner animation="border"></Spinner>
        </>
    );
}

export default VerifyEmailPage;
import { useMutation } from "@tanstack/react-query"
import { register } from "../../services/authServices"

const useRegister = () => {
    return useMutation({
        mutationFn: register,
    });
}

export default useRegister;
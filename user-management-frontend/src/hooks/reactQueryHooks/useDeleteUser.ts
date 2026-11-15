import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../../services/userService";

const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"]
            });
        },
    })
}

export default useDeleteUser;
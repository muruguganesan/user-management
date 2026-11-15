import { useQuery } from "@tanstack/react-query";
import { viewUser } from "../../services/userService";


const useVewUser = (
    id: number
) => {
    return useQuery({
        queryKey: ["user", id],
        queryFn: () => viewUser(id),
        placeholderData: (previousData) => previousData
    });
};

export default useVewUser;
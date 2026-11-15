import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/userService";

const useUsers = (
    page: number,
    limit: number,
    search: string,
) => {
    return useQuery({
        queryKey: ["users", page, limit, search],
        queryFn: () => getUsers(page, limit, search),
        placeholderData: (previousData) => previousData
    });
};

export default useUsers;
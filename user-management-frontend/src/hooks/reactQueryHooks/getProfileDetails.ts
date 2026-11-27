import { useQuery } from "@tanstack/react-query"
import { getProfile } from "../../services/userService";

const useProfileDetails = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: () => getProfile(),
        // placeholderData: (previousData) => previousData
    });
}


export default useProfileDetails
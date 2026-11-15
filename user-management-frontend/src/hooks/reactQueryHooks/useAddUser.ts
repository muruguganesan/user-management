import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUser } from "../../services/userService";
// import { addUser } from "../../services/userServices";

const useAddUser = () => {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"]
      });
    }
  });
};

export default useAddUser;
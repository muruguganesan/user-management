import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editUser } from "../../services/userService";
// import { editUser } from "../../services/userServices";

const useEditUser = () => {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"]
      });
    }
  });
};

export default useEditUser;
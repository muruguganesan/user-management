import type { IndividualUserResponse, UserResponse } from "../types/userServicesTypes";
import api from "../api/axios";
// import type { CreateUserOutput, EditUserOutput } from "../components/AddUserForm.tsx/AddUserForm";
import type { UserOutput } from "../schemas/userValidation";

export type CreateUserPayload = Omit<UserOutput, "photo"> & {
  photo: File;
};

export type EditUserPayload = UserOutput;


export const getUsers = async (page: number, limit: number, search: string): Promise<UserResponse> => {
    const response = await api.get("/users", {
        params: {
            page,
            limit,
            search,
        },
    });
    return response.data;
};

export const deleteUser = async (id: number) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
};

export const viewUser = async (id: number): Promise<IndividualUserResponse> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
};

// export const addUser = async (data: CreateUserOutput) => {

//     console.log("Services data", data);
//     const formData = new FormData();

//     formData.append("name", data.name);
//     formData.append("email", data.email);
//     formData.append("age", String(data.age));
//     formData.append("photo", data.photo);

//     const response = await api.post("/users", formData);
//     console.log("services response", response);
//     return response.data;
// };

// export const editUser = async (id: number, data: EditUserOutput) => {

//     console.log("Services data", data);
//     const formData = new FormData();

//     formData.append("name", data.name);
//     formData.append("email", data.email);
//     formData.append("age", String(data.age));
//       // Append photo only when a new photo is selected
//   if (data.photo) {
//     formData.append("photo", data.photo);
//   }

//     const response = await api.put(`/users/${id}`, formData);
//     console.log("services response", response);
//     return response.data;
// };

export const addUser = async (data: CreateUserPayload) => {

  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("age", String(data.age));
  formData.append("photo", data.photo);

  const response = await api.post("/users", formData);

  return response.data;
};

export const editUser = async ({
  id,
  data
}: {
  id: number;
  data: EditUserPayload;
}) => {

  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("age", String(data.age));

  if (data.photo) {
    formData.append("photo", data.photo);
  }

    // Debug FormData
  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

  const response = await api.put(`/users/${id}`, formData);

  return response.data;
};
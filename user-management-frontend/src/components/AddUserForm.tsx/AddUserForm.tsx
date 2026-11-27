import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";

import ErrorWrapper from "./ErrorWrapper/ErrorWrapper";
import Required from "./Required/Required";
import Button from "../Button/Button";
import LinkButton from "../Button/LinkButton";
import ReusableSnackbar from "../ReusableSnackbar/ReusableSnackbar";

import styles from "./add_user_form.module.css";
import no_img_fnd from "/no_img_fnd.png";

import useAddUser from "../../hooks/reactQueryHooks/useAddUser";
import useEditUser from "../../hooks/reactQueryHooks/useEditUser";
import useVewUser from "../../hooks/reactQueryHooks/useViewUser";
import { userSchema, type UserInput, type UserOutput } from "../../schemas/userValidation";

// import {
//   userSchema,
//   type UserInput,
//   type UserOutput
// } from "../../schemas/userValidation";
// import { userSchema, type UserInput,type UserOutput  } from "../../schemas/userValidation";

type CreateUserPayload = Omit<UserOutput, "photo"> & {
  photo: File;
};

type AddUserFormProps = {
  formType?: "add" | "edit" | "view";
};

const AddUserForm = ({
  formType = "add"
}: AddUserFormProps) => {

  const PORT = import.meta.env.VITE_PORT;
  console.log("PORT", PORT);

  const navigate = useNavigate();
  const { id } = useParams();

  const [preview, setPreview] = useState<string>(no_img_fnd);
  const [popOverOpen, setPopOverOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setError
  } = useForm<UserInput, unknown, UserOutput>({
    resolver: zodResolver(userSchema)
  });

  // React Query mutations
  const { mutate: addUser } = useAddUser();
  const { mutate: editUser } = useEditUser();

  // Fetch individual user
  const { data: viewUserData } = useVewUser(Number(id));
  console.log("viewUserData",viewUserData);

  const individualData = viewUserData?.data?.[0];

  // Watch selected photo
  const selectedPhoto = watch("photo");

  // Populate form when API data arrives
  useEffect(() => {
    if (formType === "edit" && individualData) {
      reset({
        name: individualData.name,
        age: String(individualData.age),
        email: individualData.email,
      });
    }
  }, [formType, individualData, reset]);

  // Generate photo preview
  useEffect(() => {
    if (selectedPhoto instanceof FileList && selectedPhoto.length > 0) {
      const objectUrl = URL.createObjectURL(selectedPhoto[0]);

      setPreview(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }

    if (individualData?.photo) {
      setPreview(
        `http://localhost:${PORT}/uploads/${individualData.photo}`
      );
    } else {
      setPreview(no_img_fnd);
    }
  }, [selectedPhoto, individualData?.photo]);

  // Snackbar functions
  const popOverOpenFn = () => setPopOverOpen(true);
  const popOverCloseFn = () => setPopOverOpen(false);

  // Common success callback
  const handleSuccess = () => {
    popOverOpenFn();

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  // Form submission
  const onSubmit = (data: UserOutput) => {

    // ADD USER
    if (formType === "add") {

      // Photo is mandatory during Add
      if (!data.photo) {
        setError("photo", {
          type: "manual",
          message: "Photo is required"
        });

        return;
      }

      const payload: CreateUserPayload = {
        name: data.name,
        age: data.age,
        email: data.email,
        photo: data.photo
      };

      addUser(payload, {
        onSuccess: handleSuccess,
        onError: (error) => {
          console.error("Failed to add user", error);
        }
      });

    }

    // EDIT USER
    else if (formType === "edit") {

      editUser(
        {
          id: Number(id),
          data: {
            name: data.name,
            age: data.age,
            email: data.email,
            photo: data.photo
          }
        },
        {
          onSuccess: handleSuccess,
          onError: (error) => {
            console.error("Failed to update user", error);
          }
        }
      );
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className={styles.form_row}>

          {/* BASIC INFORMATION */}
          <div className={styles.form_col}>

            <h2 className={styles.form_tit}>
              Basic Information
            </h2>

            {/* NAME */}
            <div className={styles.form_control}>

              <label htmlFor="name">
                Name {formType !== "view" && <Required />}
              </label>

              {formType === "view" ? (
                <p>{individualData?.name ?? "Nil"}</p>
              ) : (
                <>
                  <div>
                    <input
                      id="name"
                      type="text"
                      autoComplete="off"
                      placeholder="Enter name"
                      className={styles.form_input}
                      {...register("name")}
                    />
                  </div>

                  <ErrorWrapper>
                    {errors.name?.message}
                  </ErrorWrapper>
                </>
              )}

            </div>

            {/* AGE */}
            <div className={styles.form_control}>

              <label htmlFor="age">
                Age {formType !== "view" && <Required />}
              </label>

              {formType === "view" ? (
                <p>{individualData?.age ?? "Nil"}</p>
              ) : (
                <>
                  <div>
                    <input
                      id="age"
                      type="text"
                      autoComplete="off"
                      placeholder="Enter age"
                      className={styles.form_input}
                      {...register("age")}
                    />
                  </div>

                  <ErrorWrapper>
                    {errors.age?.message}
                  </ErrorWrapper>
                </>
              )}

            </div>

            {/* EMAIL */}
            <div className={styles.form_control}>

              <label htmlFor="email">
                Email {formType !== "view" && <Required />}
              </label>

              {formType === "view" ? (
                <p>{individualData?.email ?? "Nil"}</p>
              ) : (
                <>
                  <div>
                    <input
                      id="email"
                      type="text"
                      autoComplete="off"
                      placeholder="Enter email"
                      className={styles.form_input}
                      {...register("email")}
                    />
                  </div>

                  <ErrorWrapper>
                    {errors.email?.message}
                  </ErrorWrapper>
                </>
              )}

            </div>

            {/* SUBMIT BUTTON */}
            {formType !== "view" && (
              <div className={styles.btn_wrap}>
                <Button text="Save and Continue" />
              </div>
            )}

          </div>

          {/* PHOTO */}
          <div className={styles.form_col}>

            <div>

              <div className={styles.photo_wrap}>

                {formType === "view" ? (
                  <img
                    className={styles.photo}
                    src={
                      individualData?.photo
                        ? `http://localhost:${PORT}/uploads/${individualData.photo}`
                        : no_img_fnd
                    }
                    alt="User"
                  />
                ) : (
                  <img
                    className={styles.photo}
                    src={preview}
                    alt="User preview"
                  />
                )}

              </div>

              {/* FILE INPUT */}
              {formType !== "view" && (
                <div className={styles.file_label_wrap}>

                  <label
                    htmlFor="photo"
                    className={`${styles.photo_label} ${styles.blue_gradient_btn}`}
                  >

                    <input
                      className={styles.photo_inp}
                      id="photo"
                      type="file"
                      accept="image/png,image/jpeg"
                      {...register("photo")}
                    />

                    Upload Photo

                    {formType === "add" && <Required />}

                  </label>

                </div>
              )}

            </div>

            {/* PHOTO ERROR */}
            {formType !== "view" && (
              <div className={styles.file_error_wrap}>
                <ErrorWrapper>
                  {errors.photo?.message}
                </ErrorWrapper>
              </div>
            )}

          </div>

        </div>

      </form>

      {/* VIEW / SUCCESS MESSAGE */}
      {formType === "view" ? (

        <div className={styles.btn_wrap}>
          <LinkButton
            text="Edit User"
            href={`/edit-user/${id}`}
          />
        </div>

      ) : (

        <ReusableSnackbar
          isOpen={popOverOpen}
          onClose={popOverCloseFn}
        >
          {formType === "add" ? (
            <span>User Added Successfully</span>
          ) : (
            <span>User Updated Successfully</span>
          )}
        </ReusableSnackbar>

      )}

    </>
  );
};

export default AddUserForm;
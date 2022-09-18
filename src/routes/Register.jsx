import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { erroresFirebase } from "../utils/erroresFirebase";
import { formValidate } from "../utils/formValidate";

import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import Button from "../components/Button";
import ButtonGoogle from "../components/ButtonGoogle";

const Register = () => {
  const navegate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { registerUser, user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      navegate("/");
    }
  }, [user]);

  const {
    required,
    patternEmail,
    minLength,
    maxLength,
    validateTrim,
    validateEquals,
  } = formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      setLoading(true);
      await registerUser(email, password);
      navegate("/login");
    } catch (error) {
      const { code, message } = erroresFirebase(error.code);
      setError(code, {
        message: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return user ? (
    <></>
  ) : (
    <>
      <Title text="Registrate" />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            type="text"
            placeholder="Ingrese un nombre"
            label="Nombre"
            {...register("nombre", {
              required,
              minLength,
              maxLength,
            })}
            error={errors.nombre}
          >
            <FormError error={errors.nombre} />
          </FormInput>
          <FormInput
            type="email"
            placeholder="Ingrese un email"
            label="Correo"
            {...register("email", {
              required,
              pattern: patternEmail,
            })}
            error={errors.email}
          >
            <FormError error={errors.email} />
          </FormInput>
          <FormInput
            label="Contraseña"
            type="password"
            placeholder="Ingrese una Contraseña"
            {...register("password", {
              minLength,
              validate: validateTrim,
            })}
            error={errors.password}
          >
            <FormError error={errors.password} />
          </FormInput>
          <FormInput
            label="Repetir contraseña"
            type="password"
            placeholder="Repita su contraseña"
            {...register("repassword", {
              validate: validateEquals(getValues("password")),
            })}
            error={errors.repassword}
          >
            <FormError error={errors.repassword} />
          </FormInput>
          <div className="flex justify-center">
            <Button text="Registrate" type="submit" loading={loading} />
          </div>
          <div className="flex justify-center align-center mt-8 mb-8 w-full">
            <div
              style={{
                display: "flex",
                background: "rgb(209 213 219)",
                height: "1px",
                width: "45%",
              }}
            ></div>
            <p
              style={{
                display: "flex",
                width: "10%",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "-0.8rem",
              }}
            >
              O
            </p>
            <div
              style={{
                display: "flex",
                background: "rgb(209 213 219)",
                height: "1px",
                width: "45%",
              }}
            ></div>
          </div>
        </form>
        <div className="flex justify-center">
          <ButtonGoogle />
        </div>
      </div>
    </>
  );
};
export default Register;

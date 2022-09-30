import { useEffect, useState, useContext } from "react";
import { useFirestore } from "../hooks/useFirestore";
import { formValidate } from "../utils/formValidate";
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";
import withAuth from "/src/utils/withAuth";
import { UserContext } from "/src/context/UserProvider";

import Button from "../components/Button";
import Title from "../components/Title";
import FormInput from "../components/FormInput";
import FormError from "../components/FormError";
import FormTextArea from "../components/FormTextArea";

const Home = () => {
  const { userData } = useContext(UserContext);

  const { required, minLength, maxLength } = formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setError,
    setValue,
  } = useForm();

  const { data, error, loading, getData, addData, deletNota, updateData } =
    useFirestore();
  const [titulo, setTitulo] = useState("");
  const [nota, setNota] = useState("");
  const [newId, setNewId] = useState();

  useEffect(() => {
    getData(userData.uid);
  }, []);

  if (loading.getData) return <p>Loading data...</p>;
  if (error) return <p>{error}</p>;

  const onSubmit = async ({ titulo, nota }) => {
    try {
      if (newId) {
        await updateData(newId, titulo, nota, userData.uid);
        setNewId("");
        setTitulo("");
        setNota("");
      } else {
        await addData(titulo, nota, userData.uid);
      }
      resetField("titulo");
      resetField("nota");
    } catch (error) {
      const { code, message } = erroresFirebase(error.code);
      setError(code, {
        message: message,
      });
    }
  };

  const handleDelete = async (id) => {
    await deletNota(id, userData.uid);
  };

  const handleEdit = (item) => {
    setValue("titulo", item.titulo);
    setValue("nota", item.nota);
    setNewId(item.id);
  };

  return (
    <div>
      <div className="w-96 mx-auto mt-10">
        <Title text="Tus Notas" />

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="Título"
            type="text"
            placeholder="Ingrese título"
            {...register("titulo", {
              required,
              minLength,
              maxLength,
            })}
            error={errors.titulo}
          >
            <FormError error={errors.titulo} />
          </FormInput>

          <FormTextArea
            label="Nota"
            type="text"
            placeholder="Ingrese Nota"
            {...register("nota", {
              required,
              minLength,
              maxLength,
            })}
            error={errors.nota}
          >
            <FormError error={errors.nota} />
          </FormTextArea>
          <div className="flex justify-center">
            {newId ? (
              <Button
                type="submit"
                text="Editar Nota"
                loading={loading.updateData}
              />
            ) : (
              <Button
                type="submit"
                text="Agregar Nota"
                loading={loading.addData}
              />
            )}
          </div>
        </form>
      </div>
      <div className="flex flex-row justify-center flex-wrap my-10 gap-4 ">
        {data.map((item) => (
          <div
            key={item.id}
            className="p-6 bg-yellow-100 rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700 mb-2"
          >
            <div className="flex content-center gap-10">
              <div>
                <p className=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white capitalize">
                  {item.titulo}
                </p>
                <div>
                  <h1 className="text-xs">{item.fecha}</h1>
                </div>
              </div>
              <div>
                <button type="button" onClick={() => handleDelete(item.id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="red"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
                <button type="button" onClick={() => handleEdit(item)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <p className="mb-3  text-gray-700 dark:text-gray-400 font-bold">
                {item.nota}
              </p>
              <br />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default withAuth(Home);

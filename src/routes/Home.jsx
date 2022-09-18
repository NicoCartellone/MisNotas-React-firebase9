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
      <div className="flex flex-row justify-center flex-wrap my-10 gap-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="p-6 bg-yellow-100 rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700 mb-2 "
          >
            <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {item.titulo}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {item.nota}
            </p>
            <br />
            <div className="flex space-x-1">
              <Button
                type="button"
                text="Eliminar"
                loading={loading[item.id]}
                color="red"
                onClick={() => handleDelete(item.id)}
              />
              <Button
                type="button"
                text="Editar"
                onClick={() => handleEdit(item)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default withAuth(Home);

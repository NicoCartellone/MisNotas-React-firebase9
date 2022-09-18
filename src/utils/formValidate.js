export const formValidate = () => {
    return {
        required: {
            value: true,
            message: "Campo obligatorio",
        },
        patternEmail: {
            value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
            message: "Formato de email incorrecto",
        },
        minLength: {
            value: 3,
            message: "Mínimo 6 carácteres",
        },
        maxLength: {
            value: 200,
            message: "Máximo 200 carácteres",
        },
        validateTrim: {
            trim: (v) => {
                if (!v.trim()) {
                    return "No se admiten espacion es blanco";
                }
                return true;
            },
        },
        validateEquals(velue) {
            return {
                equals: (v) =>
                    v === velue ||
                    "No coinciden las contraseñas",
            };
        },
    };
};
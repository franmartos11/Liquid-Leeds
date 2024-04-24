"use client";
import { Button, Snackbar, TextField } from "@mui/material";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SnackbarCustom from "../snackbar/SnackbarCustom";
import HorizontalLinearAlternativeLabelStepper from "../steper/HorizontalLinearAlternativeLabelStepper";

interface FormData {
    customer: {
        name: string;
        lastname: string;
        email: string;
        address: {
            country: string;
            cityfilter: string | null;
            city: string;
            business: string;
        };
    };
    card: {
        number: string;
        cvc: string;
        expDate: string;
        nameOnCard: string;
    };
}

const schema = yup
    .object({
        name: yup.string().required("El Nombre es requerido."),
        lastName: yup.string().required("El Apellido es requerido."),
        email: yup
            .string()
            .email("Debe contener un formato correcto.")
            .required("El Email es requerido."),
        country: yup.string().required("El pais es requerido."),
        cityFilter: yup.string(),
        city: yup.string().required("La Ciudad es requerida."),
        business: yup.string().required("El tipo de negocio es requerido."),
        number: yup.string().required("El Número de la Tarjeta es requerido."),
        nameOnCard: yup
            .string()
            .required("El Nombre de la Tarjeta es requerido."),
        expDate: yup.string().required("La Fecha de Expiración es requerida."),
        cvc: yup.string().required("El Código de Seguridad es requerido."),
    })
    .required();

export default function Checkout() {
    const [snackbarKey, setSnackbarKey] = useState(0);
    let [stage, setStage] = useState(0);
    let [snackbarMsg, setSnackbarMsg] = useState("");
    let [snackbarStatus, setSnackbarStatus] = useState(false);

    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const handleIncreaseStage = async () => {
        if (stage !== 2) {
            if (stage === 0) {
                checkFirstStage();
            } else if (stage === 1) {
                checkSecondStage();
            }
        }
    };
    const handleDecreaseStage = () => {
        if (stage != 0) {
            setStage(stage - 1);
        }
    };

    const checkFirstStage = async () => {
        const nameIsValid = await trigger("name");
        const surnameIsValid = await trigger("lastName");
        const emailIsValid = await trigger("email");
        if (nameIsValid && surnameIsValid && emailIsValid) {
            setStage(1);
            console.log(stage);
        }
    };
    const checkSecondStage = async () => {
        const direccionIsValid = await trigger("country");
        const departamentoIsValid = await trigger("cityFilter");
        const ciudadIsValid = await trigger("city");
        const provinciaIsValid = await trigger("business");

        if (
            direccionIsValid &&
            departamentoIsValid &&
            ciudadIsValid &&
            provinciaIsValid
        ) {
            setStage(2);
        }
    };
    const checkThirdStage = async () => {
        const numeroTarjeta = await trigger("number");
        const nombreTarjeta = await trigger("nameOnCard");
        const fechaExpiracion = await trigger("expDate");
        const codigoSeguridad = await trigger("cvc");
        if (
            numeroTarjeta &&
            nombreTarjeta &&
            fechaExpiracion &&
            codigoSeguridad
        ) {
            return true;
        } else {
            return false;
        }
    };

    const onSubmit: SubmitHandler<FieldValues> = async (formData: any) => {
        try {
            if (await checkThirdStage()) {
                const formattedData: FormData = {
                    customer: {
                        name: formData.name,
                        lastname: formData.lastname,
                        email: formData.email,
                        address: {
                            country: formData.country,
                            cityfilter: formData.cityfilter,
                            city: formData.city,
                            business: formData.business,
                        },
                    },
                    card: {
                        number: formData.number,
                        cvc: formData.cvc,
                        expDate: formData.expDate,
                        nameOnCard: formData.nameOnCard,
                    },
                };
                console.log(formattedData);
                const response = await fetch("/api/checkout", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formattedData),
                });

                if (response.ok) {
                    console.log("felicidades");
                } else {
                    const errorData = await response.json();
                    console.log(errorData);
                    setSnackbarMsg(errorData.message);
                    setSnackbarStatus(true);
                    setSnackbarKey((prevKey) => prevKey + 1);
                }
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    return (
        <div className=" bg-white text-black flex justify-center align-middle">
            <div>
                <div>
                    <h2>Completa Datos de Pago</h2>
                    <div>
                        <HorizontalLinearAlternativeLabelStepper
                            activeStep={stage}
                        ></HorizontalLinearAlternativeLabelStepper>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {stage === 0 && (
                                <div>
                                    <div>
                                        <TextField
                                            {...register("name", {
                                                required: true,
                                            })}
                                            label="Nombre"
                                            style={{ margin: "8px" }}
                                            error={!!errors?.name}
                                            helperText={errors?.name?.message}
                                        />
                                        <TextField
                                            {...register("lastName", {
                                                required: true,
                                            })}
                                            label="Apellido"
                                            style={{ margin: "8px" }}
                                            error={!!errors?.lastName}
                                            helperText={
                                                errors?.lastName?.message
                                            }
                                        />

                                        <TextField
                                            {...register("email", {
                                                required: true,
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                    message:
                                                        "Dirección de correo electrónico no válida",
                                                },
                                            })}
                                            label="Email"
                                            style={{ margin: "8px" }}
                                            error={!!errors?.email}
                                            helperText={errors?.email?.message}
                                        />
                                    </div>
                                    <div className="flex align-middle justify-center">
                                        <Button
                                            onClick={() =>
                                                handleIncreaseStage()
                                            }
                                        >
                                            Siguiente
                                        </Button>
                                    </div>
                                </div>
                            )}
                            {stage === 1 && (
                                <div>
                                    <div>
                                        <TextField
                                            {...register("country", {
                                                required: true,
                                            })}
                                            id="outlined-required"
                                            label="Pais"
                                            style={{ margin: "8px" }}
                                            error={!!errors?.country}
                                            helperText={
                                                errors?.country?.message
                                            }
                                        />

                                        <TextField
                                            {...register("cityFilter", {
                                                required: false,
                                            })}
                                            id="outlined-required"
                                            label="Filtro Localidad"
                                            style={{ margin: "8px" }}
                                            error={!!errors?.cityFilter}
                                            helperText={
                                                errors?.cityFilter?.message
                                            }
                                        />

                                        <TextField
                                            {...register("city", {
                                                required: true,
                                            })}
                                            id="outlined-required"
                                            label="Provincia"
                                            style={{ margin: "8px" }}
                                            error={!!errors?.city}
                                            helperText={errors?.city?.message}
                                        />

                                        <TextField
                                            {...register("business", {
                                                required: true,
                                            })}
                                            id="outlined-required"
                                            label="Tipo Negocio"
                                            style={{ margin: "8px" }}
                                            error={!!errors?.business}
                                            helperText={
                                                errors?.business?.message
                                            }
                                        />
                                    </div>
                                    <div className="flex align-middle justify-center">
                                        <Button
                                            onClick={() =>
                                                handleDecreaseStage()
                                            }
                                        >
                                            Anterior
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                handleIncreaseStage()
                                            }
                                        >
                                            Siguiente
                                        </Button>
                                    </div>
                                </div>
                            )}
                            {stage === 2 && (
                                <div>
                                    <div>
                                        <TextField
                                            {...register("number", {
                                                required: true,
                                            })}
                                            id="outlined-required"
                                            label="Numero de tarjeta"
                                            style={{ margin: "8px" }}
                                            error={!!errors?.number}
                                            helperText={errors?.number?.message}
                                        />

                                        <TextField
                                            {...register("nameOnCard", {
                                                required: true,
                                            })}
                                            id="outlined-required"
                                            label="Nombre en tarjeta"
                                            style={{ margin: "8px" }}
                                            error={!!errors?.nameOnCard}
                                            helperText={
                                                errors?.nameOnCard?.message
                                            }
                                        />

                                        <TextField
                                            {...register("expDate", {
                                                required: true,
                                            })}
                                            id="outlined-required"
                                            label="Fecha de expiración"
                                            style={{ margin: "8px" }}
                                            error={!!errors?.expDate}
                                            helperText={
                                                errors?.expDate?.message
                                            }
                                        />
                                        <label className="inline-flex items-center mb-5 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                value=""
                                                className="sr-only peer"
                                            />
                                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                linkedin
                                            </span>
                                        </label>
                                        <TextField
                                            {...register("cvc", {
                                                required: true,
                                            })}
                                            id="outlined-password-input"
                                            label="Codigo tarjeta"
                                            type="password"
                                            style={{ margin: "8px" }}
                                            error={!!errors?.cvc}
                                            helperText={errors?.cvc?.message}
                                        />
                                    </div>
                                    <div className="flex align-middle justify-center">
                                        <Button
                                            onClick={() =>
                                                handleDecreaseStage()
                                            }
                                        >
                                            Anterior
                                        </Button>
                                        <Button
                                            type="submit"
                                            onClick={() => console.log("aaaa")}
                                        >
                                            Generar Documento
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                    <SnackbarCustom
                        key={snackbarKey}
                        onClose={() => setSnackbarStatus(false)}
                        message={snackbarMsg}
                        status={snackbarStatus}
                    ></SnackbarCustom>
                </div>
            </div>
        </div>
    );
}

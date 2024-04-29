"use client";
import { Button, Checkbox, Snackbar, TextField } from "@mui/material";
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
        exelname: string;
        webScraping: boolean;   
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
        exelname: yup.string().required("El Nobre del archivo es requerido."),
        webScraping: yup
            .string()
            .required("El Nobre del archivo es requerido."),
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
        const numeroTarjeta = await trigger("exelname");
        const webScraping = await trigger("webScraping");
        if (numeroTarjeta && webScraping) {
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
                        exelname: formData.exelname,
                        webScraping: formData.webScraping,
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
        <div className=" text-black flex justify-center align-middle pt-[5rem] pb-[5rem]">
            <div>
                <div className=" text-center ">
                    <h2>Generador de Leeds</h2>
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
                                    <div className=" flex align-middle justify-center">
                                        <TextField
                                            {...register("exelname", {
                                                required: true,
                                            })}
                                            id="outlined-required"
                                            label="Nombre del exel"
                                            style={{ margin: "8px" }}
                                            error={!!errors?.exelname}
                                            helperText={
                                                errors?.exelname?.message
                                            }
                                        />

                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                {...register("webScraping")} // Registra el estado del checkbox
                                                className="sr-only peer"
                                            />
                                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                            <p className="ms-3  font-medium text-gray-900">
                                                Web Scrapping
                                            </p>
                                        </label>

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

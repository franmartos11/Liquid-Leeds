export default function Form(service: { service: string }) {
    return (
        <section className=" pt-[3rem]">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-white">
                    Rellena el formulario
                </h2>
                <p className="mb-8 lg:mb-16 font-light text-center text-gray-400 sm:text-xl">
                    ¡Haznos saber cómo podemos ayudarte! Completa el formulario
                    de contacto y estaremos encantados de responder a tus
                    preguntas, discutir colaboraciones o simplemente charlar
                    sobre tus ideas.
                </p>
                <form
                    action="https://formsubmit.co/aspasoftwaredevelopment@gmail.com"
                    method="POST"
                    className="space-y-8"
                >
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-300">
                            Pais
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="shadow-sm  border   text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500 shadow-sm-light"
                            placeholder="nombre@gmail.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-300">
                            Ciudad
                        </label>
                        <input
                            type="telefono"
                            id="telefono"
                            name="telefono"
                            className="block p-3 w-full text-sm rounded-lg border  shadow-sm focus:ring-primary-500 focus:border-primary-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500 shadow-sm-light"
                            placeholder="Numero de telefono..."
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-300">
                            Tipo de Negocio
                        </label>
                        <input
                            type="telefono"
                            id="telefono"
                            name="telefono"
                            className="block p-3 w-full text-sm rounded-lg border  shadow-sm focus:ring-primary-500 focus:border-primary-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500 shadow-sm-light"
                            placeholder="Numero de telefono..."
                            required
                        />
                    </div>
                    <div>
                        <label className="inline-flex items-center mb-5 cursor-pointer">
                            <input
                                type="checkbox"
                                value=""
                                className="sr-only peer"
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Toggle me
                            </span>
                        </label>
                    </div>

                    <input
                        type="hidden"
                        name="service"
                        value={service.service}
                    />

                    <div className=" text-center ">
                        <button
                            type="submit"
                            className="py-3 px-9 text-sm font-medium text-center  text-white rounded-lg bg-blue-500 sm:w-fit hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-primary-300 "
                        >
                            Enviar Mensaje
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

import fastifyCors from "@fastify/cors";
import fastify from "fastify";
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import { getProfileRoute } from "./routes/get-profile.route";
import { getCarrerRoute } from "./routes/get-carrer.route";
import { getAboutRoute } from "./routes/get-about.route";
import { getProjectRoute } from "./routes/get-projects.route";
import { getCertificateRoute } from "./routes/get-certificate.route";

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
    origin: '*'
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(getProfileRoute)
app.register(getCarrerRoute)
app.register(getAboutRoute)
app.register(getProjectRoute)
app.register(getCertificateRoute)

app.listen({
    port: 3333,
}).then(() => {
    console.log('HTTP server runing on http://localhost:3333/')
})



//https://luscv-web-portifolio.vercel.app/#/
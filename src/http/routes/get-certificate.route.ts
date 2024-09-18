import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getCertificate } from "../../services/get-certificate.service";

export const getCertificateRoute: FastifyPluginAsyncZod = async (app) => {
    app.get('/certificates', async () => {
        const {certificates} = await getCertificate()

        return {
            certificates
        }
    })
}
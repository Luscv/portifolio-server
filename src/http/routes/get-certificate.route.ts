import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getCertificate } from "../../services/get-certificate.service";
import z from "zod";

export const getCertificateRoute: FastifyPluginAsyncZod = async (app) => {
    app.get('/certificates',{
        schema: {
            querystring: z.object({
                lang: z.string()
            })
        }
    }, async (request) => {
        const {lang} = request.query
        const {certificates} = await getCertificate({lang})

        return {
            certificates
        }
    })
}
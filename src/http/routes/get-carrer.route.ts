import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getCarrer } from "../../services/get-carrer.service";
import z from "zod";

export const getCarrerRoute: FastifyPluginAsyncZod = async (app) => {
    app.get('/carrer', {
        schema: {
            querystring: z.object({
                lang: z.string()
            })
        }
    }, async (request) => {
        const {lang} = request.query
        const {carrer} = await getCarrer({lang})

        return {
            carrer
        }
    })
}
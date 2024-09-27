import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getAbout } from "../../services/get-about.service";
import z from "zod";

export const getAboutRoute: FastifyPluginAsyncZod = async (app) => {
    app.get('/about', {
        schema: {
            querystring: z.object({
                lang: z.string()
            })
        }
    }, async (request) => {
        const {lang} = request.query
        const about = await getAbout({lang})
        return about

    })
}
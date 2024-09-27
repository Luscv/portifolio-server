import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getProfile } from "../../services/get-profile.service";
import z from "zod";

export const getProfileRoute: FastifyPluginAsyncZod = async (app) => {
    app.get('/profile', {
        schema: {
            querystring: z.object({
                lang: z.string()
            })
        }
    }, async (request) => {
        const {lang} = request.query
        const {profile} = await getProfile({lang})

        return {
            profile
        }
    })
}
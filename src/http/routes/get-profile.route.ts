import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getProfile } from "../../services/get-profile.service";

export const getProfileRoute: FastifyPluginAsyncZod = async (app) => {
    app.get('/profile', async () => {
        const {profile} = await getProfile()

        return {
            profile
        }
    })
}
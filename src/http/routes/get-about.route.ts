import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getAbout } from "../../services/get-about.service";

export const getAboutRoute: FastifyPluginAsyncZod = async (app) => {
    app.get('/about', async () => {
        const {about} = await getAbout()

        return {
            about
        }
    })
}
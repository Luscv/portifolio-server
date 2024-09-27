import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getProject } from "../../services/get-projects-service";
import z from "zod";

export const getProjectRoute: FastifyPluginAsyncZod = async (app) => {
    app.get('/projects',{
        schema: {
            querystring: z.object({
                lang: z.string()
            })
        }
    }, async (request) => {
        const {lang} = request.query
        const {projects} = await getProject({lang})

        return {
            projects
        }
    })
}
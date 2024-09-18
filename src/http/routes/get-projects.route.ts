import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getProject } from "../../services/get-projects-service";

export const getProjectRoute: FastifyPluginAsyncZod = async (app) => {
    app.get('/projects', async () => {
        const {projects} = await getProject()

        return {
            projects
        }
    })
}
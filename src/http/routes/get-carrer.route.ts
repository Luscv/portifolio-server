import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getCarrer } from "../../services/get-carrer.service";

export const getCarrerRoute: FastifyPluginAsyncZod = async (app) => {
    app.get('/carrer', async () => {
        const {carrer} = await getCarrer()

        return {
            carrer
        }
    })
}
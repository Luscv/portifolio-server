import { eq, sql } from "drizzle-orm";
import { db } from "../db";
import { carrer } from "../db/schema";
import { langRequest } from "../models/lang.interface";

interface CarrerResponse {
    carrer: {
        title: string;
        institution: string;
        description: string;
        period: unknown;
        icon: string;
        carrerSection: "job" | "education";
    }[]
}

export async function getCarrer({lang}: langRequest): Promise<CarrerResponse>{
    const titleCol = lang === "en-US" ? carrer.titleEn : carrer.title 
    const descriptionCol= lang === "en-US" ? carrer.descriptionEn : carrer.description

    const result = await db
        .select({
            title: titleCol,
            institution: descriptionCol,
            description: carrer.description,
            period: sql /*sql */`
                JSON_BUILD_OBJECT(
                    'startDate', ${carrer.startDate},
                    'endDate', ${carrer.endDate}
                )
            `.as('period'),
            icon: carrer.icon,
            carrerSection: carrer.carrerSection
        }).from(carrer)
        .where(eq(carrer.profileId, 'edf0znxwmblg5fkvaqlls621'))

    return{
        carrer: result
    }
}
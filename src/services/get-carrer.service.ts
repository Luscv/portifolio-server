import { eq, name, sql } from "drizzle-orm";
import { db } from "../db";
import { carrer, extraInfo, profile } from "../db/schema";

export async function getCarrer(){
    const result = await db
        .select({
            title: carrer.title,
            institution: carrer.institution,
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
        .where(eq(carrer.profileId, 'v5f2j45n8s1x64n5p4jv73gp'))

    return{
        carrer: result
    }
}
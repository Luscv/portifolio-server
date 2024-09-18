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
        .where(eq(carrer.profileId, 'w85fznym5ip4yjptqov2gumt'))

    return{
        carrer: result
    }
}
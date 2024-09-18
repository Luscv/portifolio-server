import { eq, name, sql } from "drizzle-orm";
import { db } from "../db";
import { extraInfo, profile, tech } from "../db/schema";

export async function getAbout(){
    const result = await db
        .select({
            bio: profile.bio,
            goals: profile.goals,
            techs: sql /*sql*/`
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'title', ${tech.title},
                        'description', ${tech.description},
                        'icon', ${tech.icon}
                    )
                )
            `.as('techs')
        }).from(profile)
        .innerJoin(tech, eq(tech.profileId, profile.id))
        .groupBy(profile.bio, profile.goals)
        .where(eq(profile.id, 'w85fznym5ip4yjptqov2gumt'))

    return{
        about: result[0]
    }
}
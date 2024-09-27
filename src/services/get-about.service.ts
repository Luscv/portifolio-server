import { eq, sql } from "drizzle-orm";
import { db } from "../db";
import { profile, tech } from "../db/schema";
import { langRequest } from "../models/lang.interface";

interface AboutResponse {
    about: {
        bio: string;
        goals: string;
        techs: unknown;
    }
}

export async function getAbout({lang}: langRequest): Promise<AboutResponse> {
    
    const bioCol =  lang === "en-US" ? profile.bioEn : profile.bio
    const goalCol =  lang === "en-US" ? profile.goalsEn : profile.goals

    const result = await db
        .select({
            bio: bioCol,
            goals: goalCol,
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
        .groupBy(profile.bio, profile.goals, profile.bioEn, profile.goalsEn)
        .where(eq(profile.id, 'edf0znxwmblg5fkvaqlls621'))

        
    

    
    return {
        about: result[0]
    };
}
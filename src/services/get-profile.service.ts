import { eq, name, sql } from "drizzle-orm";
import { db } from "../db";
import { extraInfo, profile } from "../db/schema";

export async function getProfile(){
    const result = await db
        .select({
            name: profile.name,
            role: profile.role,
            extraInfo: sql/*sql*/ `
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'name', ${extraInfo.name},
                        'content', ${extraInfo.content},
                        'icon', ${extraInfo.icon}
                    )
                )
            `.as('extra_info'),
            // socials: sql /*sql*/`
            //     JSON_AGG(
            //         JSON_BUILD_OBJECT(
            //             'name','LinkedIn',
            //             'content', ${profile.linkedIn}
            //         )
            //     ) 
            //     JSON_AGG(
            //         JSON_BUILD_OBJECT(
            //             'name','GitHub',
            //             'content', ${profile.github}
            //         )
            //     )
            // `.as('socials') CORRIGIR SOCIALS!!!!!!!
        }).from(profile)
        .innerJoin(extraInfo, eq(extraInfo.profileId, profile.id))
        .groupBy(profile.name, profile.role)
        .where(eq(profile.id, 'v5f2j45n8s1x64n5p4jv73gp'))

    return{
        profile: result[0]
    }
}
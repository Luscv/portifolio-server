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
            linkedin: profile.linkedIn,
            github: profile.github,
        }).from(profile)
        .innerJoin(extraInfo, eq(extraInfo.profileId, profile.id))
        .groupBy(profile.name, profile.role, profile.linkedIn, profile.github)
        .where(eq(profile.id, 'w85fznym5ip4yjptqov2gumt'))

    return{
        profile: result[0]
    }
}
import { eq, sql } from "drizzle-orm";
import { db } from "../db";
import { extraInfo, profile } from "../db/schema";
import { langRequest } from "../models/lang.interface";

interface profileReponse {
    profile: {
        name: string;
        role: string;
        extraInfo: unknown;
        linkedin: string;
        github: string;
    }
}

export async function getProfile({lang}: langRequest): Promise<profileReponse>{

    const roleCol = lang === "en-US" ? profile.roleEn : profile.role
    const extraInfoNameCol = lang === "en-US" ? extraInfo.nameEn : extraInfo.name

    const result = await db
        .select({
            name: profile.name,
            role: roleCol,
            avatarUrl: profile.avatarUrl,
            extraInfo: sql/*sql*/ `
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'name', ${extraInfoNameCol},
                        'content', ${extraInfo.content},
                        'icon', ${extraInfo.icon}
                    )
                )
            `.as('extra_info'),
            linkedin: profile.linkedIn,
            github: profile.github,
        }).from(profile)
        .innerJoin(extraInfo, eq(extraInfo.profileId, profile.id))
        .groupBy(profile.name, profile.role, profile.roleEn, profile.linkedIn, profile.github)
        .where(eq(profile.id, 'edf0znxwmblg5fkvaqlls621'))

    return{
        profile: result[0]
    }
}
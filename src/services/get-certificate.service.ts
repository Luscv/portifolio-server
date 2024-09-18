import { eq, name, sql } from "drizzle-orm";
import { db } from "../db";
import { certificate, certificateTech, extraInfo, profile, tech } from "../db/schema";

export async function getCertificate(){
    const result = await db
        .select({
            url: certificate.url,
            img: certificate.img,
            techs: sql/*sql*/`
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                      'title', ${tech.title}  
                    )
                )
            `.as('techs')
        }).from(certificate)
        .leftJoin(certificateTech, eq(certificateTech.certificateId, certificate.credentials))
        .leftJoin(tech, eq(tech.id, certificateTech.techId))
        .groupBy(certificate.credentials)
        .where(eq(certificate.profileId, 'v5f2j45n8s1x64n5p4jv73gp'))

    return{
        certificates: result
    }
}
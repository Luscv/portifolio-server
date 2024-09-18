import { eq, name, sql } from "drizzle-orm";
import { db } from "../db";
import { certificate, certificateTech, extraInfo, profile, tech } from "../db/schema";

export async function getCertificate(){
    const result = await db
        .select({
            title: certificate.title,
            category: certificate.category,
            issuedAt: certificate.issuedAt,
            url: certificate.url,
            img: certificate.img,
            techs: sql/*sql*/`
                JSON_AGG(
                    ${tech.title}
                )
            `.as('techs')
        }).from(certificate)
        .leftJoin(certificateTech, eq(certificateTech.certificateId, certificate.credentials))
        .leftJoin(tech, eq(tech.id, certificateTech.techId))
        .groupBy(certificate.credentials)
        .where(eq(certificate.profileId, 'w85fznym5ip4yjptqov2gumt'))

    return{
        certificates: result
    }
}
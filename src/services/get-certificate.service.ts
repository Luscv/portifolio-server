import { eq, sql } from "drizzle-orm";
import { db } from "../db";
import { certificate, certificateTech, tech } from "../db/schema";
import { langRequest } from "../models/lang.interface";

interface CertificateResponse {
    certificates: {
        title: string;
        category: "desenvolvimento de software" | "idiomas" | "variados" | null;
        issuedAt: Date | null;
        url: string;
        img: string | null;
        techs: unknown;
    }[]
}

export async function getCertificate({lang}: langRequest): Promise<CertificateResponse>{
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
        .where(eq(certificate.profileId, 'edf0znxwmblg5fkvaqlls621'))

    return{
        certificates: result
    }
}
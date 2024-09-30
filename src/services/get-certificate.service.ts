import { eq, sql } from "drizzle-orm";
import { db } from "../db";
import { certificate, certificateTech, tech } from "../db/schema";
import { langRequest } from "../models/lang.interface";
import dayjs from "dayjs";

interface CertificateResponse {
    certificates: {
        title: string;
        category: "desenvolvimento de software" | "idiomas" | "variados" | null;
        issuedAt: string;
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

        const formattedResult = result.map(item => {
            const issuedAtFormatted = dayjs(item.issuedAt).format("MM/YYYY");
    
            return {
                title: item.title,
                category: item.category,
                issuedAt: issuedAtFormatted,
                url: item.url,
                img: item.img,
                techs: item.techs
            };
        });

    return{
        certificates: formattedResult
    }
}
import { eq, desc, asc } from "drizzle-orm";
import { db } from "../db";
import { carrer } from "../db/schema";
import { langRequest } from "../models/lang.interface";
import dayjs from "dayjs";
import 'dayjs/locale/pt-br'; // Importando o local pt-br
import 'dayjs/locale/en'; // Garantindo que o inglês está disponível

interface CarrerResponse {
    carrer: {
        title: string;
        institution: string;
        description: string;
        period: unknown;
        icon: string;
        carrerSection: "job" | "education";
    }[]
}

export async function getCarrer({lang}: langRequest): Promise<CarrerResponse>{
    const titleCol = lang === "en-US" ? carrer.titleEn : carrer.title 
    const descriptionCol = lang === "en-US" ? carrer.descriptionEn : carrer.description
    const endIncompleteMsg = lang === "en-US" ? 'Present' : 'O momento'

    const locale = lang === "en-US" ? 'en' : 'pt-br';

    const result = await db
        .select({
            title: titleCol,
            institution: carrer.institution,
            description: descriptionCol,
            startDate: carrer.startDate,
            endDate: carrer.endDate,
            icon: carrer.icon,
            carrerSection: carrer.carrerSection
        }).from(carrer)
        .where(eq(carrer.profileId, 'edf0znxwmblg5fkvaqlls621'))
        .orderBy(asc(carrer.startDate))

        const formattedResult = result.map(item => {
            const startDateFormatted = dayjs(item.startDate).locale(locale).format("MMM/YYYY"); 
            const endDateFormatted = item.endDate ? dayjs(item.endDate).locale(locale).format("MMM/YYYY") : endIncompleteMsg;
    
            return {
                title: item.title,
                institution: item.institution,
                description: item.description,
                period: `${startDateFormatted} - ${endDateFormatted}`,
                icon: item.icon,
                carrerSection: item.carrerSection
            };
        });

    return{
        carrer: formattedResult
    }
}
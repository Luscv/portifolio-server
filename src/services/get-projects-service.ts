import { eq, sql } from "drizzle-orm";
import { db } from "../db";
import { project, projectTech, tech } from "../db/schema";
import { langRequest } from "../models/lang.interface";

interface ProjectsResponse {
    projects: {
        description: string;
        repoUrl: string;
        url: string;
        img: string | null;
        techs: unknown;
        type: "front-end" | "back-end" | "mobile" | "extras";
    }[]
}

export async function getProject({lang}: langRequest): Promise<ProjectsResponse>{
    const result = await db
        .select({
            description: project.description,
            repoUrl: project.repoUrl,
            url: project.url,
            img: project.img,
            techs: sql/*sql*/`
                JSON_AGG(
                    ${tech.title}
                )
            `.as('techs'),
            type: project.type
        }).from(project)
        .leftJoin(projectTech, eq(projectTech.projectId, project.id))
        .leftJoin(tech, eq(tech.id, projectTech.techId))
        .groupBy(project.id)
        .where(eq(project.profileId, 'edf0znxwmblg5fkvaqlls621'))

    return{
        projects: result
    }
}
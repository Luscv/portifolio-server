import { eq, name, sql } from "drizzle-orm";
import { db } from "../db";
import { extraInfo, profile, project, projectTech, tech } from "../db/schema";

export async function getProject(){
    const result = await db
        .select({
            description: project.description,
            repoUrl: project.repoUrl,
            url: project.url,
            img: project.img,
            techs: sql/*sql*/`
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                      'title', ${tech.title}  
                    )
                )
            `.as('techs'),
            type: project.type
        }).from(project)
        .leftJoin(projectTech, eq(projectTech.projectId, project.id))
        .leftJoin(tech, eq(tech.id, projectTech.techId))
        .groupBy(project.id)
        .where(eq(project.profileId, 'v5f2j45n8s1x64n5p4jv73gp'))

    return{
        projects: result
    }
}
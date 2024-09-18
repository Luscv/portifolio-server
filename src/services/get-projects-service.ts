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
                    ${tech.title}
                )
            `.as('techs'),
            type: project.type
        }).from(project)
        .leftJoin(projectTech, eq(projectTech.projectId, project.id))
        .leftJoin(tech, eq(tech.id, projectTech.techId))
        .groupBy(project.id)
        .where(eq(project.profileId, 'w85fznym5ip4yjptqov2gumt'))

    return{
        projects: result
    }
}
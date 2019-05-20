import { EntityRepository, Repository } from "typeorm";
//
import { RolePermision } from "./role-permision.entity";

@EntityRepository(RolePermision)
export class RolePermisionRepository extends Repository<RolePermision> {

    createRolePermision(permisionId: string, roleId: string) {
        const rolePermision: RolePermision = this.create();
        rolePermision.permision = <any>{ id: permisionId };
        rolePermision.role = <any>{ id: roleId };
        return this.save(rolePermision);
    }

    createRolePermisions(roleId: string, permisions: string[]) {
        return Promise.all(permisions.map((permisionId: string) => {
            return this.createRolePermision(permisionId, roleId).then((rolePermision) => {
                return rolePermision;
            });
        }));
    }

    deleteOldQuestionnaireSubject(questionnaireId: string) {
        return this.createQueryBuilder("questionnaire_subject")
            .select()
            .leftJoinAndSelect("questionnaire_subject.questionnaire", "questionnaire")
            .where("questionnaire_subject.questionnaire.id = :questionnaireId", { questionnaireId })
            .getMany().then((questionnaireSubjects: RolePermision[]) => {
                return this.remove(questionnaireSubjects);
            });
    }
}

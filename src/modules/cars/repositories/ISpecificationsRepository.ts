import { Specification } from "../infra/typeorm/entities/Specification";

interface ICreateSpecificationDTO{
    name: string;
    description: string;
}


interface ISpecificationsRepository{
    create({description, name}: ICreateSpecificationDTO): Promise<Specification | undefined>;
    findByName(name: string): Promise <Specification | undefined>;
    findByIds(ids: string[]): Promise<Specification[] | undefined>;
}

export {ISpecificationsRepository, ICreateSpecificationDTO};

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";


class UsersRepositoryInMemory implements IUsersRepository {
    users: User[] = [];

    async create({name, email, driver_license, password, avatar, id }: ICreateUserDTO): Promise<void> {
        const user = new User();
        
        Object.assign(user, {
            name, email, driver_license, password, avatar, id 

        });

        this.users.push(user);
    }

    async findByEmail(email: string): Promise<User | undefined> { 

        return this.users.find((users) => users.email === email);

        
    }

    async findById(id: string): Promise<User | undefined> { 

        return this.users.find((users) => users.id === id);

        
    }



}

export {UsersRepositoryInMemory};

import {inject, injectable} from 'tsyringe'
import {hash} from  'bcryptjs';
import { AppError } from '@shared/errors/AppError';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';


interface IRequest {
    name: string;
    password: string;
    email: string;
    driver_license: string;
}

@injectable()
class CreateUserUseCase{

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository) {
    }

    async execute({name, email, driver_license, password}: IRequest): Promise <void> {

        const passwordHash = await hash(password, 8); 

        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if (userAlreadyExists){
            throw new AppError("user already exists!");
        }

       await this.usersRepository.create({name, email, driver_license, password: passwordHash });
    }
}

export {CreateUserUseCase};

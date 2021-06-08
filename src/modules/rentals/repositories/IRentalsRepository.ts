import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";


interface IRentalsRepository {
    findOpenRentalByUser(user_id: string): Promise<Rental | undefined>;
    findOpenRentalByCar(car_id: string): Promise<Rental | undefined>;
    create(data: ICreateRentalDTO): Promise<Rental>;
}

export {IRentalsRepository};

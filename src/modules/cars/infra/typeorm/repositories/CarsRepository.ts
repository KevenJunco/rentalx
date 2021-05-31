import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Car";


class CarsRepository implements ICarsRepository {
    private reporsitory: Repository<Car>;

    constructor() {
        this.reporsitory = getRepository(Car);
    }

    async create({ brand, category_id, daily_rate, description, fine_amount, name, license_plate }: ICreateCarDTO): Promise<Car> {
        const car = this.reporsitory.create({
            brand, category_id, daily_rate, description, fine_amount, name, license_plate
        });

        await this.reporsitory.save(car);

        return car;

    }
    async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
        const car = await this.reporsitory.findOne({ license_plate });
        
        return car;

    }


}

export { CarsRepository };

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

interface IRequest {
    id: string;
};

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];

    async create({ brand, category_id, daily_rate, description, fine_amount, license_plate, name }: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign({
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate, name

        })

        this.cars.push(car);

        return car;

    };

    async findByLicensePlate(license_plate: string): Promise<Car | undefined> {

        const car = this.cars.find((car) => car.license_plate ===license_plate);

        return car;
         
    };
}

export { CarsRepositoryInMemory };

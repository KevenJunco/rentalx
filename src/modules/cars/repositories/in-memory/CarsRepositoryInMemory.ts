import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";


class CarsRepositoryInMemory implements ICarsRepository {

    cars: Car[] = [];

    async create({ brand, category_id, daily_rate, description, fine_amount, license_plate, name, id }: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign({
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate, 
            name,
            id

        })

        this.cars.push(car);

        return car;

    };

    async findByLicensePlate(license_plate: string): Promise<Car | undefined> {

        const car = this.cars.find((car) => car.license_plate === license_plate);

        return car;

    };

    async findAvailable(
        brand?: string,
        category_id?: string,
        name?: string
      ): Promise<Car[]> {
        let availableCars = this.cars.filter((car) => car.available);
    
        if (!name && !brand && !category_id) return availableCars;
    
        availableCars = availableCars.filter((car) => {
          if (car.name === name) return true;
          if (car.brand === brand) return true;
          if (car.category_id === category_id) return true;
    
          return false;
        });
    
        return availableCars;
    }

    async findById(id: string): Promise<Car | undefined> {
        const car =  await this.cars.find((car) => car.id === id);

        return car;
    };
    
}

export { CarsRepositoryInMemory };

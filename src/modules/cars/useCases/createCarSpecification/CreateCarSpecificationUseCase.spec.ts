import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
 

describe("Create car specification", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
    });

    it("should not be able to add a new specification to a non existent car", async () => {
       expect(async () => {
        const car_id = "1234";
        const specifications_id = ["54321"];

        await createCarSpecificationUseCase.execute({car_id, specifications_id});
       }).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to add a new specification to the car", async () => {

        const car = await carsRepositoryInMemory.create({
            name: "string1",
            description: "string",
            daily_rate: 123,
            license_plate: "string",
            fine_amount: 123,
            brand: "string",
            category_id: "string",
        });

        const specification = await specificationsRepositoryInMemory.create({
            description: "test",
            name: "test"
        });

        const specifications_id = [specification.id];
        
    

        const specificationsCars = await createCarSpecificationUseCase.execute({car_id: car.id, specifications_id});
        
        expect(specificationsCars).toHaveProperty("specifications");
    });



});

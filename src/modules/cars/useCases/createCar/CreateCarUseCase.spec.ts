import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;


describe("Create Car ", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new (CarsRepositoryInMemory);
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "string",
            description: "string",
            daily_rate: 123,
            license_plate: "string",
            fine_amount: 123,
            brand: "string",
            category_id: "string",
        });

        expect(car).toHaveProperty("id");

    });

    it("should not be able to create a car with a existent license plate", () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: "string",
                description: "string",
                daily_rate: 123,
                license_plate: "string",
                fine_amount: 123,
                brand: "string",
                category_id: "string",
            });

            await createCarUseCase.execute({
                name: "string1",
                description: "string",
                daily_rate: 123,
                license_plate: "string",
                fine_amount: 123,
                brand: "string",
                category_id: "string",
            });
            
        }).rejects.toBeInstanceOf(AppError);
    });        

    it("should be able to create a car with available true by default", async () => {
       
        const car = await createCarUseCase.execute({
        name: "string1",
        description: "string",
        daily_rate: 123,
        license_plate: "string",
        fine_amount: 123,
        brand: "string",
        category_id: "string",
       });

       expect(car.available).toBe(true);
    });   

});

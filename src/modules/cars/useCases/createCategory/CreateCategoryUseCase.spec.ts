import { AppError } from "@shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe("Create Category Use Case", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("Should be able to create a category", async () => {
    const category = {
      name: "Category Teste",
      description: "Category description Teste",
    };

    await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
    });



    const categoryCreated = await categoriesRepositoryInMemory.findByName(
     category.name
    );


    expect(categoryCreated).toHaveProperty("id");
  });

  it("Should not be able to create a category with a name who already exists", async () => {
  
    expect( async () => {

        const category = {
            name: "Category Teste",
            description: "Category description Teste",
          };
      
          await createCategoryUseCase.execute({
              name: category.name,
              description: category.description,
          });
      
          await createCategoryUseCase.execute({
              name: category.name,
              description: category.description,
          });

    }).rejects.toBeInstanceOf(AppError);
  });

});

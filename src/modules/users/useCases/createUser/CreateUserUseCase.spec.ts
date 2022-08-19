import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"
import { CreateUserUseCase } from "./CreateUserUseCase"
import { CreateUserError } from "./CreateUserError";


let createUserUseCase: CreateUserUseCase
let userRepositoryInMemory: InMemoryUsersRepository

describe("Create User", () => {
  beforeAll(() => {
    userRepositoryInMemory = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
  })

  it("Should be able to create a new User", async () => {
    const user = await createUserUseCase.execute({
      name: "Giovani",
      email: "giovani@hotmail.com",
      password: "40028922"
    })

    expect(user).toHaveProperty('id')
  })

  it("Should not be able to create an user with an email that already exists", () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: "User",
        email: "email.user@test.com",
        password: "1234"
      });

      await createUserUseCase.execute({
        name: "User 2",
        email: "email.user@test.com",
        password: "password1234"
      });
    }).rejects.toBeInstanceOf(CreateUserError);
  });
})

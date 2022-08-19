import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";


let userRepositoryInMemory: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase
let showUserProfileUseCase: ShowUserProfileUseCase

describe("Show User Profile", () => {
  beforeAll(async () => {
    userRepositoryInMemory = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
    showUserProfileUseCase = new ShowUserProfileUseCase(userRepositoryInMemory)
  })

  it("Should be able to show a user profile", async () => {
    const user = await createUserUseCase.execute({
      name: "user",
      email: "user.spec@test.com",
      password: "senhahard"
    })

    const userProfile = await showUserProfileUseCase.execute(user.id)
  })
})

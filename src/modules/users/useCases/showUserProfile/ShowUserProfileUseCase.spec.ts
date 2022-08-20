import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ShowUserProfileError } from "./ShowUserProfileError";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";


let userRepositoryInMemory: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase
let showUserProfileUseCase: ShowUserProfileUseCase

describe("Show User Profile", () => {
  beforeEach(async () => {
    userRepositoryInMemory = new InMemoryUsersRepository()
    showUserProfileUseCase = new ShowUserProfileUseCase(userRepositoryInMemory)
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
  })

  it("Should be able to show a user profile", async () => {
    const user = await createUserUseCase.execute({
      name: "user Test",
      email: "user.spec@test.com",
      password: "senhahard"
    })

    const user_id = user.id as string

    const userProfile = await showUserProfileUseCase.execute(user_id)

    expect(user).toHaveProperty("id")
    expect(userProfile).toEqual(user)
  })

  it("Should return error if the user does not exist", () => {
    expect(async () => {
      const user_id = "1234"

      await showUserProfileUseCase.execute(user_id)
    }).rejects.toBeInstanceOf(ShowUserProfileError)
  })
})

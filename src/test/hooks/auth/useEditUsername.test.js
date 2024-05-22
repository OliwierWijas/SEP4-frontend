import { useEditUsername } from "../../../hooks/auth/useEditUsername.js"
import { useLogin } from "../../../hooks/auth/useLogin.js"

global.alert = jest.fn()

describe('useEditUsername integration test', () => {
    beforeEach(async () => {
        localStorage.clear()
        const username = 'testUser2'
        const password = 'testPassword'

        const user = {
            username: username,
            password: password
        }

        await useLogin(user)
    })

    afterEach(() => {
        jest.clearAllMocks()
        localStorage.clear()
    })

    /*it('should edit username successfully', async () => {
        expect(localStorage.getItem("jwt")).not.toBeUndefined()

        const editedAccount = {
            newUsername: "newTestUser2",
            password: "testPassword"
          }

        const editedAccount1 = {
            newUsername: "testUser2",
            password: "testPassword"
        }

        const editUsername = useEditUsername()
        await editUsername("testUser2", editedAccount)

        expect(localStorage.getItem("username")).toBe("newTestUser2")
        expect(global.alert).toHaveBeenNthCalledWith(1, "Username changed.")

        await editUsername("newTestUser2", editedAccount1)

        expect(localStorage.getItem("username")).toBe("testUser2")
        expect(global.alert).toHaveBeenNthCalledWith(2, "Username changed.")
    })

    it('should return error when password is incorrect', async () => {
        expect(localStorage.getItem("jwt")).not.toBeUndefined()
        
        const editedAccount = {
            newUsername: "newTestUser2",
            password: "incorrectPassword"
          }

        const editUsername = useEditUsername()
        await editUsername("testUser2", editedAccount)

        expect(localStorage.getItem("username")).toBe("testUser2")
        expect(global.alert).toHaveBeenCalledWith("Password mismatch")
    })*/

    it('should return error when username is incorrect', async () => {
        expect(localStorage.getItem("jwt")).not.toBeUndefined()
        
        const editedAccount = {
            newUsername: "newTestUsername",
            password: "testPassword"
        }

        const editUsername = useEditUsername()
        await editUsername("invalidUsername", editedAccount)

        expect(global.alert).toHaveBeenCalledWith("Invalid username or password")
    })
})

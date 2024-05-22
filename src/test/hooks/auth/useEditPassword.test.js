import { useEditPassword } from "../../../hooks/auth/useEditPassword.js"
import { useLogin } from "../../../hooks/auth/useLogin.js"

global.alert = jest.fn()

describe('useEditPassword integration test', () => {
    beforeEach(async () => {
        localStorage.clear()
        const username = 'testUser'
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

    it('should edit password successfully', async () => {
        expect(localStorage.getItem("jwt")).not.toBeUndefined()

        const editedAccount = {
            username: "testUser",
            oldPassword: "testPassword",
            newPassword: "newTestPassword"
        }

        const editedAccount1 = {
            username: "testUser",
            oldPassword: "newTestPassword",
            newPassword: "testPassword"
        }

        const editPassword = useEditPassword()
        await editPassword("testUser", editedAccount)

        expect(localStorage.getItem("password")).toBe("newTestPassword")
        expect(global.alert).toHaveBeenNthCalledWith(1, "Password changed.")

        await editPassword("testUser", editedAccount1)

        expect(localStorage.getItem("password")).toBe("testPassword")
        expect(global.alert).toHaveBeenNthCalledWith(2, "Password changed.")
    })

    it('should return error when oldPassword is incorrect', async () => {
        expect(localStorage.getItem("jwt")).not.toBeUndefined()
        
        const editedAccount = {
            username: "testUser",
            oldPassword: "invalidPassword",
            newPassword: "newTestPassword"
        }

        const editPassword = useEditPassword()
        await editPassword("testUser", editedAccount)

        expect(localStorage.getItem("password")).toBe("testPassword")
        expect(global.alert).toHaveBeenCalledWith("Password mismatch")
    })

    it('should return error when username is incorrect', async () => {
        expect(localStorage.getItem("jwt")).not.toBeUndefined()
        
        const editedAccount = {
            username: "invalidUsername",
            oldPassword: "testPassword",
            newPassword: "newTestPassword"
        }

        const editPassword = useEditPassword()
        await editPassword("invalidUsername", editedAccount)

        expect(localStorage.getItem("password")).toBe("testPassword")
        expect(global.alert).toHaveBeenCalledWith("User with username invalidUsername doesn't exist")
    })
})

import { useDeleteAccount } from "../../../hooks/auth/useDeleteAccount.js"
import { useRegister } from "../../../hooks/auth/useRegister.js"
import { useLogin } from "../../../hooks/auth/useLogin.js"

global.alert = jest.fn()

describe('useDeleteAccount integration test', () => {
    beforeEach(async () => {

    })

    afterEach(() => {
        jest.clearAllMocks()
        localStorage.clear()
    })

    it('should deleteAccount successfully', async () => {
        const username = 'testUser123123'
        const password = 'testPassword1'

        await useRegister(username, password)

        expect(global.alert).toHaveBeenNthCalledWith(1, 'Account has been created.')

        localStorage.clear()

        const user = {
            username: username,
            password: password
        }

        await useLogin(user)

        expect(localStorage.getItem("jwt")).not.toBeUndefined()

        localStorage.clear()

        //cros origin error
        await useDeleteAccount("testUser123123", "testPassword1")

        expect(localStorage.getItem("role")).not.toBeDefined()
        expect(localStorage.getItem("username")).not.toBeDefined()
        expect(localStorage.getItem("password")).not.toBeDefined()
        expect(global.alert).toHaveBeenNthCalledWith(2, "Account has been deleted.")
    })

    /*it('should return error when oldPassword is incorrect', async () => {
        localStorage.setItem("houseId", 1)
        expect(localStorage.getItem("jwt")).not.toBeUndefined()
        expect(localStorage.getItem("houseId")).not.toBeUndefined()
        
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
        localStorage.setItem("houseId", 1)
        expect(localStorage.getItem("jwt")).not.toBeUndefined()
        expect(localStorage.getItem("houseId")).not.toBeUndefined()
        
        const editedAccount = {
            username: "invalidUsername",
            oldPassword: "testPassword",
            newPassword: "newTestPassword"
        }

        const editPassword = useEditPassword()
        await editPassword("invalidUsername", editedAccount)

        expect(localStorage.getItem("password")).toBe("testPassword")
        expect(global.alert).toHaveBeenCalledWith("User with username invalidUsername doesn't exist")
    })*/
})

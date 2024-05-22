import { useAddMember } from "../../../hooks/home/useAddMember.js"
import { useLogin } from "../../../hooks/auth/useLogin.js"

global.alert = jest.fn()

describe('useAddMember integration test', () => {
    beforeEach(async () => {
        localStorage.clear()
        const username = 'adminUser'
        const password = 'adminPassword'

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

    it('should add member successfully', async () => {
        localStorage.setItem("houseId", 1)
        expect(localStorage.getItem("jwt")).not.toBeUndefined()
        expect(localStorage.getItem("houseId")).not.toBeUndefined()

        const refresh = jest.fn()

        const addMember = useAddMember()
        await addMember("testUser", refresh)

        expect(global.alert).toHaveBeenCalledWith("Member added to house.")
    })

    it('should return error when member with the given username already exists in home', async () => {
        localStorage.setItem("houseId", 1)
        expect(localStorage.getItem("jwt")).not.toBeUndefined()
        expect(localStorage.getItem("houseId")).not.toBeUndefined()

        const refresh = jest.fn()
        
        const addMember = useAddMember()
        await addMember("testUser", refresh)

        expect(global.alert).toHaveBeenCalledWith("Error while adding member.")
    })
})

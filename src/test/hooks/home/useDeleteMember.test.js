import { useDeleteMember } from "../../../hooks/home/useDeleteMember.js"
import { useLogin } from "../../../hooks/auth/useLogin.js"

global.alert = jest.fn()

describe('useDeleteMember integration test', () => {
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

    it('should delete member successfully', async () => {
        localStorage.setItem("houseId", 1)
        expect(localStorage.getItem("jwt")).not.toBeUndefined()
        expect(localStorage.getItem("houseId")).not.toBeUndefined()

        const refresh = jest.fn()

        const deleteMember = useDeleteMember()
        await deleteMember("testUser", refresh)

        expect(global.alert).toHaveBeenCalledWith("Member removed.")
    })
})

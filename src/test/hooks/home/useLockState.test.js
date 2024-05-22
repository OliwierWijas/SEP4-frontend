import { useLockState } from "../../../hooks/home/useLockState.js"
import { useLogin } from "../../../hooks/auth/useLogin.js"

global.alert = jest.fn()

describe('useLockState integration test', () => {
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

    //from route instead from query in webapi, to be solved by backend

    /*it('should add member successfully', async () => {
        localStorage.setItem("houseId", 1)
        expect(localStorage.getItem("jwt")).not.toBeUndefined()
        expect(localStorage.getItem("houseId")).not.toBeUndefined()

        const getLockState = useLockState()
        const state = await getLockState(localStorage.getItem("houseId"))

        expect(state).toBeFalsy()
    })*/
})

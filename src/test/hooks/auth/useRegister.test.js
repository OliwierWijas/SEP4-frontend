import { useRegister } from "../../../hooks/auth/useRegister.js"
import { useDeleteAccount } from "../../../hooks/auth/useDeleteAccount.js"
import { useLogin } from "../../../hooks/auth/useLogin.js"

global.alert = jest.fn()

describe('useRegister integration test', () => {
    afterEach(() => {
        jest.clearAllMocks();
    })

    it('should create an account successfully', async () => {
        const username = 'testUser123'
        const password = 'testPassword1'

        await useRegister(username, password)

        expect(global.alert).toHaveBeenCalledWith('Account has been created.')

        await useDeleteAccount({ username, password })

        expect(global.alert).toHaveBeenCalledWith('Account has been deleted.')

        await useLogin({ username, password })

        expect(global.alert).toHaveBeenCalledWith('')
    })

    it('should handle registration failure', async () => {
        const username = 'testUser'
        const password = 'testPassword'

        await useRegister(username, password)

        expect(global.alert).toHaveBeenCalledWith('User with username testUser is already registered')
    })
})

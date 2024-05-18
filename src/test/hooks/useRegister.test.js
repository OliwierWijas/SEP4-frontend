import { useRegister } from "../../hooks/useRegister.js"

global.alert = jest.fn()

describe('useRegister integration test', () => {
    afterEach(() => {
        jest.clearAllMocks();
    })

    it('should create an account successfully', async () => {
        const username = 'testUser'
        const password = 'testPassword'

        await useRegister(username, password)

        expect(global.alert).toHaveBeenCalledWith('Account has been created.')
    })

    it('should handle registration failure', async () => {
        const username = 'testUser'
        const password = 'testPassword'

        await useRegister(username, password)

        expect(global.alert).toHaveBeenCalledWith('An error occurred during signing up.')
    })
})

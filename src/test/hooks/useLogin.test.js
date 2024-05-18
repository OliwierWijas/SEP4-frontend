import { useLogin } from "../../hooks/useLogin";

global.alert = jest.fn()

describe('useLogin integration test', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    afterEach(() => {
        jest.clearAllMocks()
        localStorage.clear()
    })

    it('should login into an existing account successfully', async () => {
        const username = 'testUser'
        const password = 'testPassword'

        const user = {
            username: username,
            password: password
        }

        await useLogin(user)

        expect(localStorage.getItem("jwt")).not.toBeNull()
    })

    it('should handle login failure', async () => {
        const username = 'etklnghlkerngkjenrg'
        const password = 'eklrngjkerngjkenrjgnk'

        const user = {
            username: username,
            password: password
        }

        await useLogin(user)

        expect(global.alert).toHaveBeenCalledWith('Invalid username or password')
    })

    it('checks if member claims are returned', async () => {
        const username = 'testUser'
        const password = 'testPassword'

        const user = {
            username: username,
            password: password
        }

        await useLogin(user)

        expect(localStorage.getItem("jwt")).not.toBeNull()
        expect(localStorage.getItem('role')).toBe('Member')
    })

    it('checks if admin claims are returned', async () => {
        const username = 'adminUser'
        const password = 'adminPassword'

        const user = {
            username: username,
            password: password
        }

        await useLogin(user)

        expect(localStorage.getItem("jwt")).not.toBeNull()
        expect(localStorage.getItem('role')).toBe('Admin')
    })

    it('allows to access an authorized endpoint with the generated token', async () => {
        const username = 'testUser'
        const password = 'testPassword'

        const user = {
            username: username,
            password: password
        }

        await useLogin(user)
    })
})

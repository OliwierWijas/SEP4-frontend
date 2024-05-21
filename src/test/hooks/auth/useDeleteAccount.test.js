import { useDeleteAccount } from "../../../hooks/auth/useDeleteAccount.js";

global.alert = jest.fn()

describe('useDeleteAccount integration test', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    afterEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });
})

import { mock } from '../utils'

export const UserRepository = {
    auth(payload) {
        return mock(payload);
    }
}
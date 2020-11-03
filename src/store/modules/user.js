import { LocalStorageDB } from '../../services/storage';
import Repository from '../../repositories/RepositoryFactory';
const UserRepository = Repository.get('user');
const userDb = new LocalStorageDB('user');

export const SET_USER_TOKEN = 'SET_USER_TOKEN';

const rand = () => {
  return Math.random()
    .toString(36)
    .substr(2); // remove `0.`
};

const token = () => {
  return rand() + rand(); // to make it longer
};

const mutations = {
  /**
   *
   * @param {*} state
   * @param {String} token
   */
  [SET_USER_TOKEN](state, token) {
    state.auth.token = token;
  },
};

const getters = {};

const actions = {
  async authorizeUser({ commit }) {
    const payload = {
      token: token(),
    };

    const { data, status } = await UserRepository.auth(payload);

    if (status === 200 && data.token) {
      commit(SET_USER_TOKEN, data.token);
      userDb.save('token', data.token);

      return data;
    }

    return null;
  },

  logoutUser({ commit }) {
    commit(SET_USER_TOKEN, null);
    userDb.delete('token');
  },
};
export const user = {
  namespaced: true,
  state: () => ({
    auth: {
      token: null,
    },
  }),
  mutations,
  getters,
  actions,
};

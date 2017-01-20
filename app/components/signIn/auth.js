import Relay from 'react-relay';
import RegisterMutation from '../../mutations/register';
import LoginMutation from '../../mutations/login';

export function login(email, password) {
  return new Promise((resolve, reject) => {
    Relay.Store.commitUpdate(new LoginMutation({
      input: {
        email: email,
        password: password
      }
    }), {
      onSuccess: (data) => {
        resolve(data);
      },

      onFailure: (transaction) => {
        reject(transaction.getError().message);
      }
    });
  });
}

export function register(email, name, password) {
  return new Promise((resolve, reject) => {
    Relay.Store.commitUpdate(new RegisterMutation({
      input: {
        email: email,
        name: name,
        password: password
      }
    }), {
      onSuccess: (data) => {
        resolve(login(email, password));
      },

      onFailure: (transaction) => {
        reject(transaction.getError().message);
      }
    });
  });
}



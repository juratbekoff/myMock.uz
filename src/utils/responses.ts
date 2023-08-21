class ResMessages {
  notFound = (name: string) => {
    return `${name} is not found!`;
  };
  exicted = (name: string) => {
    return `${name} is already exicted!`;
  };
  created = (name: string) => {
    return `${name} successfully created!`;
  };
  unAuth = () => {
    return `Token is not provided! Unauthorizated!`;
  };
  expiredToken = () => {
    return `Your access token already expired! Plz, get new one!`;
  };
  wrongPassword = () => {
    return "email or password is incorrect!";
  };
  deleted = (name: string) => {
    return `${name} is successfully deleted!`;
  };
}

export const {
  exicted,
  notFound,
  created,
  unAuth,
  expiredToken,
  wrongPassword,
  deleted,
} = new ResMessages();

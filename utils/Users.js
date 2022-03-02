export const Users = []

export const findUserByID = ID => {
  return Users.find(user => user.id === ID);
}

export const removeUserByID  = ID => {
  const index = Users.findIndex(user => user.id === ID);

  if (index !== -1) {
    return Users.splice(index, 1)[0];
  }
}
export const getProfileAndUserDto = (body) => {
  const {
    name,
    email,
    password,
    username,
    status,
    role,
    phone,
    address,
    dob,
    gender,
    zip,
    state,
  } = body;
  const userDto = {
    name,
    email,
    password,
    username,
    status,
    role,
  };

  const profileDto = {
    phone,
    address,
    dob,
    gender,
    zip,
    state,
  };

  return { userDto, profileDto };
};

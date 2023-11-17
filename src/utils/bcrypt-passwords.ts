import * as bcrypt from 'bcrypt';

export const hashPassword = (password: string) => {
  const hash = bcrypt.hash(password, 10);
  return hash;
};

export const comparePassword = async (
  password: string,
  hashPassword: string,
) => {
  const result = await bcrypt.compare(password, hashPassword);
  return result;
};

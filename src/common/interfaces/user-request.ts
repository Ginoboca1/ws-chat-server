export interface UserRequest extends Request {
  user: {
    name: string;
    role: string;
  };
}

export interface UserRequest extends Request {
  user: {
    id: string;
    name: string;
    role: string;
  };
}

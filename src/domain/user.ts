export interface User {
  id: string;
  name: string;
  description: string;
  skills: { id: number; name: string }[];
  github_id?: string;
  qiita_id?: string;
  x_id?: string;
}

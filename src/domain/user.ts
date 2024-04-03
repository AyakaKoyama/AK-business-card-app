export interface User {
  loginID: string;
  userName: string;
  description: string;
  favoriteSkill: { id: number; name: string }[];
  githubId?: string;
  qiitaId?: string;
  xId?: string;
}

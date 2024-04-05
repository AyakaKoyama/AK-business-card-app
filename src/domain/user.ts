export class User {
  constructor(
    public loginID: string,
    public userName: string,
    public description: string,
    public favoriteSkill: { id: number; name: string }[],
    public githubId?: string,
    public qiitaId?: string,
    public xId?: string
  ) {}
}

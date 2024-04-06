export class User {
  constructor(
    public loginID: string,
    public userName: string,
    public description: string,
    public favoriteSkill: FavoriteSkill | null,
    public githubId?: string,
    public qiitaId?: string,
    public xId?: string
  ) {}
}
//オブジェクト
export class FavoriteSkill {
  constructor(public id: number, public name: string) {}
}

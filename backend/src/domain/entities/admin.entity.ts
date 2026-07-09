export class Admin{
    constructor(
        public readonly id: string,
        public readonly email : string,
        public password : string,
        public  readonly refreshToken?: string,
    ){}
}
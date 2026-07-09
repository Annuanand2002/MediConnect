import bctypt from "bcrypt";


export class BcryptService{
    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return await bctypt.hash(password, saltRounds);
    }

    async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
        return await bctypt.compare(password, hashedPassword);
    }
}
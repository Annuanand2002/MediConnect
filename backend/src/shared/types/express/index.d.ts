import { Admin } from "../../../domain/entities/admin.entity.ts";

declare global {
    namespace Express{
        interface Request{
            admin?: Admin
        }
    }
}

export {};
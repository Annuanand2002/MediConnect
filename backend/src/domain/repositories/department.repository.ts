import { Department } from "../entities/department.entity.js";



export interface IDepartmentRepository{
    create(department:Department):Promise<Department>;
    findByName(name:string):Promise<Department|null>
    findById(id:string):Promise<Department|null>;
    findAll():Promise<Department[]>
}
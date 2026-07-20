import { Department } from "../../domain/entities/department.entity.js";
import { IDepartmentRepository } from "../../domain/repositories/department.repository.js";
import departmentModel from "../database/models/department.model.js";




export class DepartmentRepository implements IDepartmentRepository{
    async create(department:Department):Promise<Department>{
        return (await departmentModel.create(department)).toObject() as Department
    }

    async findByName(name:string):Promise<Department|null>{
        return (await departmentModel.findOne({name}).lean()) as Department | null;
    }
    async findById(id: string): Promise<Department | null> {
        return (await departmentModel.findById(id).lean()) as Department|null
    }
    async findAll():Promise<Department[]>{
        return (await departmentModel.find().sort({name:1}).lean()) as Department[];
    }
}
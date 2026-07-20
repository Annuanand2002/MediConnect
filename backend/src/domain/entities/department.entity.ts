



export class Department {
    constructor(public name : string,
        public description?: string,
        public isActive : boolean = true,
        public id?: string,
        public createdAt?: Date,
        public updatedAt?: Date
    ){}
}
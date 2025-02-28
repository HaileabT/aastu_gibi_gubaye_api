import { StudentD } from './student.entity';
export declare class DepartmentD {
    department: string;
    students?: StudentD[] | undefined;
    id?: string;
    constructor(department: string, students?: StudentD[] | undefined);
}

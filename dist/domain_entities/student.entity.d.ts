import { ConfessionFatherD } from './confession_father.entity';
import { DepartmentD } from './department.entity';
import { LanguageD } from './language.entity';
import { ServiceD } from './service.entity';
export declare class StudentD {
    first_name: string;
    last_name: string;
    id?: string;
    constructor(first_name: string, last_name: string, student_id: string, phone_number: string, gender: string, language: LanguageD, department: DepartmentD, baptismal_name?: string, email?: string, service?: ServiceD[], role?: string, current_year?: number, confession?: ConfessionFatherD);
}

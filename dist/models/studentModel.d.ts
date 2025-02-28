import 'reflect-metadata';
import { Department } from './departmentModel';
import { Confession } from './confessionModel';
import { Service } from './serviceModel';
import { Language } from './languageModel';
export declare class Student {
    id: string;
    first_name: string;
    last_name: string;
    student_id: string;
    gender: string;
    baptismal_name?: string;
    phone_number: string;
    password?: string;
    language: Language[];
    department: Department;
    email?: string;
    service?: Service[];
    role?: string;
    current_year?: string;
    confession?: Confession;
}

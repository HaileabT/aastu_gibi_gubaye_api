import { SelectQueryBuilder } from 'typeorm';
import { Student } from '../../models/studentModel';
export interface filterOption {
    department?: string;
    language?: string;
    service?: string;
    current_year?: string;
    confession?: string;
    role?: string;
    gender?: string;
    sort?: string;
    page?: number;
    limit?: number;
}
export declare const filterUtils: (queryBuilder: SelectQueryBuilder<Student>, filters: filterOption) => SelectQueryBuilder<Student>;

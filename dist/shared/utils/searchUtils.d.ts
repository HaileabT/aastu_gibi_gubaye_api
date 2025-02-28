import { SelectQueryBuilder } from 'typeorm';
import { Student } from '../../models/studentModel';
export declare const searchUtils: (queryBuilder: SelectQueryBuilder<Student>, keyword: string) => SelectQueryBuilder<Student>;

import { StudentD } from './student.entity';
export declare class ConfessionFatherD {
    confession: string;
    students?: StudentD[] | undefined;
    id?: string;
    constructor(confession: string, students?: StudentD[] | undefined);
}

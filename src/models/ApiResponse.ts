import { Animal } from "./Animal";

export class ApiResponse {
    constructor (
        public allAnimals: Animal[]
    ) {}
}
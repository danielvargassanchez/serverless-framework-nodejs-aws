export class Book {
    id: string; 
    title: string;
    description: string;
    createdAt: Date;
    constructor() {
        this.id = ''; 
        this.title = '';
        this.description = '';
        this.createdAt = new Date();
    }   
}

export class EditBook {
    title: string;
    description: string;
    constructor() {
        this.title = '';
        this.description = '';
    }
}
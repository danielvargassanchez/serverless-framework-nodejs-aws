import { APIGatewayProxyEvent, APIGatewayProxyEventPathParameters, APIGatewayProxyResult } from 'aws-lambda';
import { BadRequestException } from '../exceptions/exceptions';
import { Book, EditBook } from '../models/book.model';
import { BooksService } from '../services/book.service';
import { v4 as uuidv4 } from 'uuid';

export class BooksController {
    private bookService;
    constructor(bookService: BooksService) {
        this.bookService = bookService;
    }

    async createBook(bodyString: string | null): Promise<APIGatewayProxyResult> {
        if (!bodyString) {
            throw new BadRequestException('Invalid data');
        }
        const book = JSON.parse(bodyString) as Book;
        book.createdAt = new Date();
        book.id = uuidv4();
        return await this.bookService.createBook(book);
    }

    async getBooks(): Promise<APIGatewayProxyResult> {
        return await this.bookService.getBooks();
    }

    async getBookById(parameters: APIGatewayProxyEventPathParameters | null): Promise<APIGatewayProxyResult> {
        const id = parameters?.id;
        if (!id) {
            throw new BadRequestException('Invalid data');
        }
        return await this.bookService.getBookById(id);
    }

    async updateBook(request: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        if (!request.body || !request.pathParameters?.id) {
            throw new BadRequestException('Invalid data');
        }
        const id = request?.pathParameters.id;
        const book = JSON.parse(request.body) as EditBook;
        return await this.bookService.updateBook(id, book);
    }
 
    async deleteBook(parameters: APIGatewayProxyEventPathParameters | null): Promise<APIGatewayProxyResult> {        
        const id = parameters?.id;
        if (!id) {
            throw new BadRequestException('Invalid data');
        }
        return await this.bookService.deleteBook(id);
    }

    async croneJob(): Promise<APIGatewayProxyResult> {
        const book = new Book();
        book.id = uuidv4();
        book.id = 'Libro creado desde una crone job';
        book.description = 'Descripción del libro creado desde una crone job';
        return await this.bookService.createBook(book);
    }
}
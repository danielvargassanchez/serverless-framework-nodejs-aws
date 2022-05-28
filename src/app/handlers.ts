import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { BooksController } from './controllers/book.controller';
import { BooksService } from './services/book.service';
import { HandlerException } from './utils/manage.exception';

const service = new BooksService();
const controller = new BooksController(service);

export const create =  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    return await controller.createBook(event.body);
  } catch (exception: any) {
    return HandlerException.manageException(exception);
  }
};

export const getAll =  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    return await controller.getBooks();
  } catch (exception: any) {
    return HandlerException.manageException(exception);
  }
};

export const getBookById =  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    return await controller.getBookById(event.pathParameters);
  } catch (exception: any) {
    return HandlerException.manageException(exception);
  }
};

export const updateBook = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    return await controller.updateBook(event);
  } catch (exception: any) {
    return HandlerException.manageException(exception);
  }
}

export const deleteBook = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    return await controller.deleteBook(event.pathParameters);
  } catch (exception: any) {
    return HandlerException.manageException(exception);
  }
}

export const croneJob = async (event: any): Promise<void> => {
  try {
    const result = await controller.croneJob();
  } catch (exception: any) {
    const error = HandlerException.manageException(exception);
    console.error(error);
  }
}

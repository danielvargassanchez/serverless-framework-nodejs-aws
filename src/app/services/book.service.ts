import { APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Book, EditBook } from '../models/book.model';
import { MessageUtil } from '../utils/messages';

export class BooksService {
    private dynamoDBClient = new DynamoDB.DocumentClient();

    constructor() {
    }

    async createBook(book: Book): Promise<APIGatewayProxyResult> {
        const params = {
            TableName: process.env.BOOKS_TABLE,
            Item: {
                id: book.id,
                title: book.title,
                description: book.description,
                createdAt: book.createdAt
            },
        } as DocumentClient.PutItemInput;

        await this.dynamoDBClient.put(params).promise();
        return MessageUtil.success();
    }

    async getBooks(): Promise<APIGatewayProxyResult> {
        const params = {
            TableName: process.env.BOOKS_TABLE,
        } as DocumentClient.ScanInput;
        const result = await this.dynamoDBClient.scan(params).promise();
        const books = result.Items;
        return MessageUtil.success(books);
    }

    async getBookById(id: string): Promise <APIGatewayProxyResult> {
        const params = {
            TableName: process.env.BOOKS_TABLE,
            Key: {
                id
            }
        } as DocumentClient.GetItemInput;
        const book = await this.dynamoDBClient.get(params).promise();
        return MessageUtil.success(book);
    }

    async updateBook(id: string, book: EditBook): Promise<APIGatewayProxyResult> {
        const params = {
            TableName: process.env.BOOKS_TABLE,
            Key: { 
                id: id
            },
            UpdateExpression: 'set title = :title, description = :description',
            ExpressionAttributeValues: {
                ':title': book.title,
                ':description': book.description
            },
            ReturnValues: 'ALL_NEW'
        } as DocumentClient.UpdateItemInput;

        await this.dynamoDBClient.update(params).promise();
        return MessageUtil.success();
    }

    async deleteBook(id: string): Promise<APIGatewayProxyResult> {
        const params = {
            TableName: process.env.BOOKS_TABLE,
            Key: {
                id
            }
        } as DocumentClient.DeleteItemInput;

        await this.dynamoDBClient.delete(params).promise();
        return MessageUtil.success();
    }
}
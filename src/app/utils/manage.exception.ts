import { APIGatewayProxyResult } from 'aws-lambda';
import { BadRequestException, NotCreatedException } from '../exceptions/exceptions';
import { StatusCode } from './commons';
import { MessageUtil } from './messages';

export class HandlerException {
    static manageException(exception: Error): APIGatewayProxyResult {
        if (exception instanceof NotCreatedException) {
            return MessageUtil.error(StatusCode.notFound, exception.message);
        } else if (exception instanceof BadRequestException) {
            return MessageUtil.error(StatusCode.badRequest, exception.message);
        } else {
            return MessageUtil.error(StatusCode.internalError, exception.message);
        }
    }
}
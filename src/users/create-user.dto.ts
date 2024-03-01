import { Book } from "./book.entity";

export class CreateUserDto {
  firstName: string;
  lastName: string;
  organizationId: string;
  books: Book[];
}
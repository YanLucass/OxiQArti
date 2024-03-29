export class AppError extends Error {
   constructor(
      public readonly message: string,
      public readonly statusCode = 400,
   ) {
      super();
      this.message = message;
      this.statusCode = statusCode;
   }
}

export class ApiResponse<T> {
  public success: boolean;
  public message: string;
  public data: T;
  public statusCode: number;

  constructor(statusCode: number, data: T, message = 'Success') {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

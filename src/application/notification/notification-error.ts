export type NotificationErrorProps = {
  type: string;
  message: string;
};

export interface INotificationError {
  addError: (error: NotificationErrorProps) => void;
  hasErrors: () => boolean;
  getErros: () => NotificationErrorProps[];
  getMessages: (type?: string) => string;
}

export class NotificationError implements INotificationError {
  private errors: NotificationErrorProps[] = [];

  addError(error: NotificationErrorProps): void {
    this.errors.push(error);
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  getErros(): NotificationErrorProps[] {
    return this.errors;
  }

  getMessages(type?: string): string {
    let messages = '';
    this.errors.forEach((erro) => {
      if (!erro.type || erro.type === type) {
        messages += `${erro.type}: ${erro.message}`;
      }
    });
    return messages;
  }
}

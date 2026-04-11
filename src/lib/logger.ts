export class Logger {
  static security(event: string, data: Record<string, unknown>) {
    console.log(JSON.stringify({
      type: 'SECURITY',
      timestamp: new Date().toISOString(),
      event,
      ...data
    }));
  }

  static error(error: Error, context: Record<string, unknown>) {
    console.error(JSON.stringify({
      type: 'ERROR',
      timestamp: new Date().toISOString(),
      error: error.message,
      stack: error.stack,
      ...context
    }));
  }
}

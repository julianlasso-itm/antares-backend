class AntaresException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PersistenceException';
  }
}

export default AntaresException;

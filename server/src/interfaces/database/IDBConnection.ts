export abstract class IDBConnection {
  abstract execute(query: string, params: string): any;
}

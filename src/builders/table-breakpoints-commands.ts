import { ITableManager } from '@joseaburt/react-table-manager';

export type Columns<T> = (keyof T | 'action')[];

export type BreakpointCallbacks = {
  onPass: () => void;
  onFail: () => void;
};

export type BreakpointCommands = Record<string, BreakpointCallbacks>;

export default class TableBreakpointCommands<T> {
  private commands: BreakpointCommands = {};

  constructor(private manager: ITableManager<T>) {}

  public static from<T>(manager: ITableManager<T>): TableBreakpointCommands<T> {
    return new TableBreakpointCommands<T>(manager);
  }

  public addBreakpoint(cssBreakpoint: string, columnNames: Columns<T>): TableBreakpointCommands<T> {
    this.commands[cssBreakpoint] = {
      onPass: () => columnNames.forEach((columnName) => this.manager.columnManager.setIsHidden(columnName as keyof T, true)),
      onFail: () => columnNames.forEach((columnName) => this.manager.columnManager.setIsHidden(columnName as keyof T, false)),
    };
    return this;
  }

  public get(): BreakpointCommands {
    return this.commands;
  }
}

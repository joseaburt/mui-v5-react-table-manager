import { Entity } from '../shared/types';
import React, { useEffect, ComponentType } from 'react';
import useMediaQuery from '../hooks/useMediaQuery';
import { createTable } from '../factories/createTable';
import { ITableManager } from '@joseaburt/react-table-manager';
import TableBreakpointCommands, { Columns } from './table-breakpoints-commands';
import { useCommandOnElementBoundsBreakpoints } from '../hooks/useCommandOnBreakpoints';

/**
 * ### TableViews
 *
 * This class abstract the logic of the responsive table views
 * by joining the table manager with the table visibility.
 *
 * @author <pino0071@gmail.com> Jose Aburto
 */
export class ResponsiveTableViewsBuilder<T extends Entity = Entity> {
  private tableVisibility: TableBreakpointCommands<T>;
  private smallView: JSX.Element | null = null;

  public static new<T extends Entity = Entity>(manager: ITableManager<T>): ResponsiveTableViewsBuilder<T> {
    return new ResponsiveTableViewsBuilder<T>(manager);
  }

  private constructor(private manager: ITableManager<T>) {
    this.tableVisibility = new TableBreakpointCommands<T>(manager);
    this.get = this.get.bind(this);
    this.addBreakpoint = this.addBreakpoint.bind(this);

    this.registerSmallView = this.registerSmallView.bind(this);
  }

  public addBreakpoint(cssBreakpoint: string, columnNames: Columns<T>): Omit<ResponsiveTableViewsBuilder<T>, 'get' | 'registerBigView'> {
    this.tableVisibility.addBreakpoint(cssBreakpoint, columnNames);
    return this;
  }

  public registerSmallView(smallView: JSX.Element): Omit<ResponsiveTableViewsBuilder<T>, 'addBreakpoint' | 'registerSmallView'> {
    this.smallView = smallView;
    return this;
  }

  /**
   * ### Get the Component including the tables.
   * @param debugWidth - If true, it will show the width of the element in the console.
   * @returns
   */
  public get({ debugWidth }: { debugWidth?: boolean }): ComponentType {
    const manager = this.manager;
    const smallView = this.smallView;
    const BaseTable = createTable(manager);
    const bigView = <BaseTable />;
    const visibilityCommands = this.tableVisibility.get();

    function Component(): JSX.Element {
      const isSmallDevice = useMediaQuery((bp) => bp.down('sm'));
      const ref = useCommandOnElementBoundsBreakpoints(visibilityCommands, debugWidth);

      useEffect(() => {
        manager.commands.init();
      }, []);

      useEffect(() => {
        manager.reInit();
      }, [isSmallDevice]);

      return <div ref={ref}>{isSmallDevice ? smallView : bigView}</div>;
    }

    return Component;
  }
}

# mui-v5-react-table-manager

A [Material UI V5](https://mui.com/material-ui/getting-started/) implementation for [react-table-manager](https://www.npmjs.com/package/@joseaburt/react-table-manager)

```ts
import { BackendResponse, PaginableRepository, QueryState, TableManagerBuilder, ResponsiveTableViewsBuilder } from '@joseaburt/mui-v5-react-table-manager';

type User = {
  id: number;
  email: string;
  username: string;
};

class CommonRepository implements PaginableRepository<User[]> {
  constructor(baseURL: string) {}

  getAll(query: Partial<QueryState>, signal: AbortSignal): Promise<BackendResponse<User[]>> {
    throw new Error('Method not implemented.');
  }
}

const manager = TableManagerBuilder.fromDataProvider<User>(new CommonRepository('/'))
  .addColumn({
    label: 'ID',
    name: 'id',
    type: 'text',
  })
  .addColumn({
    type: 'text',
    isSortable: true,
    isQueryable: true,
    label: 'Username',
    name: 'fullName',
    render({ value, record }: RenderProps<User>) {
      return (
        <>
        <Stack direction="row" alignItems="center" gap={1}>
          <Avatar sx={{ width: '2rem', height: '2rem' }} src={record.thumbnail} />
          <Box>
            <Typography>{record.fullName}</Typography>
            <Typography variant="caption" color="blue">
              {record.email}
            </Typography>
          </Box>
        </Stack>
      );
    },
  })
  .addColumn({
    label: 'Phone',
    name: 'phone',
    type: 'text',
  })
  .addColumn({
    label: 'Address',
    name: 'address',
    type: 'text',
  })
  .addColumn({
    label: 'Action',
    name: 'action',
    render({ value, record }: RenderProps<User>) {
      return (
        <Box>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Box>
      );
    },
  })
  .get();

const TableResponsive = ResponsiveTableViewsBuilder.new<User>(manager)
  .addBreakpoint('(max-width: 636)', ['username'])
  .addBreakpoint('(max-width: 519)', ['action'])
  .addBreakpoint('(max-width: 690.390625)', ['id'])
  .addBreakpoint('(max-width: 900)', ['email', 'username'])
  .registerSmallView(<></>)
  .get({ debugWidth: true });

export default function Application(): JSX.Element {
  useEffect(() => {
    manager.commands.init();
  }, []);

  return <TableResponsive />;
}
```

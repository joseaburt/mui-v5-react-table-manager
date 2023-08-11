import { Container, TableManager as MuiV5TableManager, connectHeaderCell, connectHeaderSortCell } from '@joseaburt/react-table-manager';

import LabelSort from './components/sorts';
import TextFilter from './components/filters/Text';
import SelectFilter from './components/filters/Select';
import DateRangeFilter from './components/filters/DateRange';

Container.addSortHeaderComponent('sort', connectHeaderSortCell({ Component: LabelSort }));

Container.addFilterHeaderComponent('text', connectHeaderCell({ Component: TextFilter, defaultValue: '' }));
Container.addFilterHeaderComponent('date-range', connectHeaderCell({ Component: DateRangeFilter, defaultValue: '' }));
Container.addFilterHeaderComponent('select', connectHeaderCell({ Component: SelectFilter, defaultValue: undefined }));

export default MuiV5TableManager;

import React from 'react';
import ReactMarkdown from 'react-markdown';
import NotificationSystem from 'react-notification-system';
import Dropzone from 'react-dropzone';
import TimezonePicker from 'react-timezone';
import { Editor } from 'react-draft-wysiwyg';
import Recaptcha from 'react-recaptcha';
import * as ReactCodeMirror from 'react-codemirror2';
import * as DraftJS from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import SplitPane from 'react-split-pane';
import { ClipLoader, SyncLoader, BarLoader, BeatLoader } from 'react-spinners';

import AnimateHeight from 'react-animate-height';
import * as RB from 'react-bootstrap';
import ClipLoaderWithContext from './ReactSpinners/ClipLoader';
import FilteredList from './FilteredList/FilteredList';
import Spinner from './Spinner/Spinner';
import TwitterFeed from './TwitterFeed/TwitterFeed';
import FilteredTable from './FilteredTable/1/FilteredTable';
import FilteredTableV2, {
    ResponsiveFilteredTable,
} from './FilteredTable/2/FilteredTable';
// // import FilteredTableV2 from './FilteredTable/2/FilteredTable';
// // import ResponsiveFilteredTable from './ResponsiveFilteredTable/FilteredTable';
import IsotopeGrid from './IsotopeGrid/IsotopeGrid';
import PasswordValidator, * as PasswordValidatorUtils from './PasswordValidator/PasswordValidator';
import Draggable, { withContext } from './Draggable/Draggable';
import DashboardBox from './DashboardBox/DashboardBox';
import DashboardCard from './DashboardCard/DashboardCard';
import UserDrawer from './UserDrawer/UserDrawer';
import Drawer from './Drawer/Drawer';
import GroupsDrawer from './GroupsDrawer/GroupsDrawer';
import DisqusFeed from './DisqusFeed/index';
import LoadingComponent from './LoadingComponent/LoadingComponent';
import CollapsibleFilter from './CollapsibleFilter/CollapsibleFilter';
import PanelFilter from './PanelFilter/PanelFilter';
import Filters from './Filters/Filters';
import FilterItem from './Filters/FilterItem';
import Card from './Card/Card';
import ModalDialog from './ModalDialog/ModalDialog';
import * as CascadingPane from './CascadingPane';
import ThreeColumnView from './ThreeColumnView/ThreeColumnView';
import * as Search from './Search';
import * as FormFields from './FormFields';
import * as FilterFields from './Filters/renderFilterItem';
import Description from './FormFields/Description';
import WFUIDropdown from './WFUIDropdown/WFUIDropdown';
import Notifications from './Notifications/Notifications';
import Query from './util/Query';
import SwitchButton from './SwitchButton/SwitchButton';
import Button from './Button/Button';

import * as Utils from './util';

import Glyphicon from './Icon/Icon';

export * from 'react-bootstrap';

require('./i18n/i18n.js');

const DraggableWithContext = withContext;
const Icon = Glyphicon;
/**
 * Hubs between React Bootstrap 0.34 and 1.0.0
 */
const ControlLabel = RB.Form.Label;
const FormControl = RB.Form.Control;
const HelpBlock = RB.Form.Text;
const FormGroup = RB.Form.Group;
const MenuItem = RB.DropdownItem;
const Label = RB.Badge;
const Grid = RB.Container;
const Radio = props => <RB.Form.Check {...props} type="radio" />;
const Checkbox = props => <RB.Form.Check {...props} type="checkbox" />;

// Temporary
// const WFUIDropdown = RB.Dropdown;

export {
    FilteredList,
    Recaptcha,
    Spinner,
    TwitterFeed,
    FilteredTable,
    FilteredTableV2,
    ResponsiveFilteredTable,
    IsotopeGrid,
    PasswordValidator,
    PasswordValidatorUtils,
    Draggable,
    DraggableWithContext,
    DashboardBox,
    DashboardCard,
    UserDrawer,
    Drawer,
    GroupsDrawer,
    DisqusFeed,
    // Third Party Components
    NotificationSystem,
    Dropzone,
    TimezonePicker,
    LoadingComponent,
    FormFields,
    Search,
    CollapsibleFilter,
    ReactMarkdown,
    Filters,
    FilterItem,
    FilterFields,
    Card,
    ModalDialog,
    CascadingPane,
    PanelFilter,
    Description,
    WFUIDropdown,
    DraftJS,
    Editor,
    draftToHtml,
    htmlToDraft,
    Notifications,
    Utils,
    ReactCodeMirror,
    AnimateHeight,
    SplitPane,
    ThreeColumnView,
    Checkbox,
    ClipLoader,
    ClipLoaderWithContext,
    SyncLoader,
    BarLoader,
    BeatLoader,
    Query,
    SwitchButton,
    // React Bootstrap Hubs
    Glyphicon,
    Icon,
    ControlLabel,
    FormControl,
    HelpBlock,
    Radio,
    Grid,
    Label,
    MenuItem,
    FormGroup,
    Button,
};

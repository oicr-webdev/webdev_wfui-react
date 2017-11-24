import React from 'react';
import classNames from 'classnames';
import TableBody from './TableBody';
import Search from '../util/searchUtil';

/*
 * Applies the filtering to the articles and then passes its' props to List for display.
 */
class FilteredTable extends React.Component {
    constructor(props) {
        super(props);
        this.onCheck = this.onCheck.bind(this);
        this.onAllCheck = this.onAllCheck.bind(this);
        this.lastResultsCount = -1;
        this.state = {
            currentPage: props.currentPage,
            checkedItems: new Array(props.data.length).fill(false),
            sortedIdx: props.sortedIdx,
            sortedOrientation: 'desc',
            dataWithState: this.transformData(props.data),
            uid: new Date().getTime(),
            contentWidth: 0,
        };
        this.resizeTable = this.resizeTable.bind(this);
        this.toggleSort = this.toggleSort.bind(this);
        this.filteredData = [];
    }

    componentDidMount() {
        this.onFilter(
            this.generateFilteredArticles(this.applySearch(this.props.data)),
        );
        window.addEventListener('resize', this.resizeTable);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeTable);
    }

    transformData(data) {
        return data.map((obj, i) => {
            const _obj = JSON.stringify(obj)
                ? JSON.parse(JSON.stringify(obj))
                : {};
            _obj.checked = false;
            _obj.idx = i;
            return _obj;
        });
    }
    componentWillReceiveProps(nextProps) {
        /* Also note: JSON.stringify is the cheapest arbitrary comparison function
        * since it runs on native code. */
        const thisData = this.props.data;
        const nextData = nextProps.data;

        if (JSON.stringify(thisData) !== JSON.stringify(nextData)) {
            this.setState({
                dataWithState: this.transformData(nextData),
            });
        }
    }

    componentDidUpdate() {
        const { data } = this.props;
        this.onFilter(this.generateFilteredArticles(this.applySearch(data)));
    }

    /* This is called when a individual item's checkbox is clicked */
    onCheck(index) {
        const { dataWithState } = this.state;
        const newArray = dataWithState.slice(0);
        newArray[index].checked = !newArray[index].checked;

        /* We do this since setstate does not immediately mutate the state */
        this.setState({ dataWithState: newArray }, () =>
            this.selectionChanged(),
        );
    }

    onAllCheck() {
        const { dataWithState } = this.state;
        const newArray = dataWithState.slice(0);

        if (newArray.every(item => item.checked)) {
            /* If all items are checked, then uncheck everything */
            newArray.forEach(item => {
                item.checked = false;
            });
        } else {
            /* Else check everything */
            newArray.forEach(item => {
                item.checked = true;
            });
        }

        this.setState({ dataWithState: newArray }, () =>
            this.selectionChanged(),
        );
    }

    toggleSort(event, idx) {
        const { sortedIdx, sortedOrientation } = this.state;
        event.preventDefault();
        if (sortedIdx === idx) {
            if (sortedOrientation === 'desc') {
                this.setState({ sortedOrientation: 'asc' });
            } else {
                this.setState({ sortedOrientation: 'desc' });
            }
        } else {
            this.setState({ sortedOrientation: 'desc', sortedIdx: idx });
        }
    }

    /* Passes the list of filtered articles to the callbacks in the props. */
    onFilter(filteredArticles) {
        const { onResultsNumUpdate } = this.props;

        /* Now sort the articles*/
        const resultsCount = filteredArticles.length;
        if (this.lastResultsCount !== resultsCount) {
            this.lastResultsCount = resultsCount;
            if (onResultsNumUpdate) {
                onResultsNumUpdate(resultsCount);
            }
        }
    }

    generateFilteredArticles(articles) {
        const { filterList, itemFormat } = this.props;
        const { sortedIdx, sortedOrientation } = this.state;

        let filteredArticles = articles;
        filterList.forEach(
            filter => (filteredArticles = filteredArticles.filter(filter)),
        );

        if (sortedIdx !== -1) {
            filteredArticles = filteredArticles.sort((a, b) => {
                const getSortingData = itemFormat[sortedIdx].sortingKey;
                const aData = getSortingData(a);
                const bData = getSortingData(b);
                if (sortedOrientation === 'desc') {
                    if (typeof aData === 'string') {
                        return bData
                            .toLowerCase()
                            .localeCompare(aData.toLowerCase());
                    }
                    return bData - aData;
                }
                if (typeof aData === 'string') {
                    return aData
                        .toLowerCase()
                        .localeCompare(bData.toLowerCase());
                }
                return aData - bData;
            });
        }

        return filteredArticles;
    }

    applySearch(articles) {
        const {
            searchTerm,
            simpleSearch,
            searchKeys,
            wholeWord,
            searchLogic,
        } = this.props;
        if (searchTerm) {
            const filteredArticles = simpleSearch
                ? Search.simpleSearch(
                      articles,
                      searchTerm,
                      searchKeys,
                      wholeWord,
                      searchLogic,
                  )
                : Search.search(articles, searchTerm);
            return filteredArticles;
        }

        return articles;
    }

    /* Return a list of the indices of all selected items */
    selectionChanged() {
        const { onSelectionChange } = this.props;
        const { dataWithState } = this.state;

        const indexes = [];
        const checkedItems = dataWithState.filter((item, i) => {
            if (item.checked) indexes.push(i);
            return item.checked;
        });

        onSelectionChange(indexes, checkedItems);
    }

    generatePaginatorObject() {
        const { currentPage } = this.state;
        const { pageSize, data } = this.props;

        const filteredData = this.applySearch(
            this.generateFilteredArticles(data),
        );
        const dataLength = filteredData ? filteredData.length : 0;
        const numPages = Math.ceil(dataLength / pageSize);

        const Paginator = {
            currentPage,
            numPages,
            /* Returns a function that will open the page 'page'
            * or undefined if the page does not exist.  */
            getOpenPage: page => {
                if (page > 0 && page <= numPages) {
                    return () => this.setState({ currentPage: page });
                }
                return undefined;
            },
        };
        return Paginator;
    }

    render() {
        const {
            itemFormat,
            className,
            paginatorDisplay,
            pageSize,
            selectable,
            onSelectionChange,
            onRowClick,
            rowSelect,
            contentHeight,
        } = this.props;

        const {
            currentPage,
            dataWithState,
            sortedOrientation,
            sortedIdx,
            uid,
            contentWidth,
        } = this.state;
        this.filteredData = this.applySearch(
            this.generateFilteredArticles(dataWithState),
        );

        /* We have to do this to avoid breaking backwards compatibility */
        const table = (
            <TableBody
                className={className}
                data={this.filteredData}
                itemFormat={itemFormat}
                pageSize={pageSize}
                currentPage={currentPage}
                selectable={selectable}
                onSelectionChange={onSelectionChange}
                onCheck={this.onCheck}
                checks={this.state.checkedItems}
                onRowClick={onRowClick}
                allCheckbox={
                    <input
                        type="Checkbox"
                        onChange={this.onAllCheck}
                        checked={dataWithState.every(item => item.checked)}
                    />
                }
                toggleSort={this.toggleSort}
                sortedOrientation={sortedOrientation}
                sortedIdx={sortedIdx}
                rowSelect={rowSelect}
                contentWidth={contentWidth}
                contentHeight={contentHeight}
            />
        );

        if (paginatorDisplay) {
            const paginatorObject = this.generatePaginatorObject();
            const InjectedPaginatorDisplay = React.cloneElement(
                paginatorDisplay,
                paginatorObject,
            );
            return (
                <div
                    className={classNames(className, 'wfui-filtered-table')}
                    id={`wfui-filtered-table-${uid}`}
                >
                    {table}
                    {InjectedPaginatorDisplay}
                </div>
            );
        }
        return (
            <div
                className={classNames(className, 'wfui-filtered-table')}
                id={`wfui-filtered-table-${uid}`}
            >
                {table}
            </div>
        );
    }
    componentDidUpdate() {
        this.resizeTable();
    }
    resizeTable() {
        const { uid, contentWidth } = this.state;
        const element = document.getElementById(`wfui-filtered-table-${uid}`);
        if (element && element.offsetWidth !== contentWidth) {
            this.setState({ contentWidth: element.offsetWidth });
        }
    }
}

FilteredTable.propTypes = {
    className: React.PropTypes.string,
    paginatorDisplay: React.PropTypes.element,
    data: React.PropTypes.arrayOf(React.PropTypes.any).isRequired,
    pageSize: React.PropTypes.number,
    currentPage: React.PropTypes.number,
    filterList: React.PropTypes.arrayOf(React.PropTypes.func),
    searchTerm: React.PropTypes.string,
    selectable: React.PropTypes.bool,
    rowSelect: React.PropTypes.bool,
    onSelectionChange: React.PropTypes.func,
    itemFormat: React.PropTypes.arrayOf(React.PropTypes.object),
    onResultsNumUpdate: React.PropTypes.func,
    simpleSearch: React.PropTypes.bool,
    searchKeys: React.PropTypes.arrayOf(React.PropTypes.string),
    sortedIdx: React.PropTypes.number,
    wholeWord: React.PropTypes.bool,
    searchLogic: React.PropTypes.oneOf(['and', 'or']),
    onRowClick: React.PropTypes.func,
    contentHeight: React.PropTypes.number,
};

FilteredTable.defaultProps = {
    pageSize: 100000,
    currentPage: 1,
    filterList: [],
    searchTerm: '',
    selectable: false,
    rowSelect: true,
    sortedIdx: -1,
    wholeWord: false,
    onSelectionChange: f => f,
    onRowClick: f => f,
    searchLogic: 'and',
};

export default FilteredTable;

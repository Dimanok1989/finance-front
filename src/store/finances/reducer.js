import * as ACTIONS from './actions';

const defaultState = {
    open: false,
    data: [],
    pagination: {
        current: 1,
        pageSize: 10,
    },
    chartMonths: [],
    chartYears: [],
};

const mapData = data => {
    return data.map(row => ({
        ...row,
        key: row.id,
    }));
}

export const financesReducer = (state = defaultState, action) => {
    switch (action.type) {

        case ACTIONS.SET_OPEN:
            return { ...state, open: action.payload }

        case ACTIONS.SET_DATA:
            return { ...state, data: mapData(action.payload) }

        case ACTIONS.CREATED_ROW:
            return { ...state, data: mapData([action.payload, ...state.data].slice(0, state.pagination.pageSize)) }

        case ACTIONS.SET_PAGINATION:
            return { ...state, pagination: action.payload }

        case ACTIONS.CHART_MONTHS_DATA:
            return { ...state, chartMonths: action.payload }

        case ACTIONS.CHART_YEARS_DATA:
            return { ...state, chartYears: action.payload }

        case ACTIONS.APPEND_CHARTS_DATA:

            let chartMonths = [...state.chartMonths],
                chartYears = [...state.chartYears],
                appendedMonth = false,
                appendedYearSumma = false,
                appendedYearTax = false;

            chartMonths.forEach((row, i) => {
                if (action.payload.month === row.month) {
                    appendedMonth = true;
                    chartMonths[i].summa += action.payload.summa;
                }
            });

            chartYears.forEach((row, i) => {
                if (action.payload.year === row.year && row.type === "Сумма" && action.payload.summa > 0) {
                    appendedYearSumma = true;
                    chartYears[i].summa += action.payload.summa;
                }
                if (action.payload.year === row.year && row.type === "Налог" && action.payload.tax > 0) {
                    appendedYearSumma = true;
                    chartYears[i].summa += action.payload.tax;
                }
            });

            if (!appendedMonth)
                chartMonths.push({ summa: action.payload.summa, month: action.payload.month });

            if (!appendedYearSumma && action.payload.summa > 0) {
                chartYears.push({
                    summa: action.payload.summa,
                    type: "Сумма",
                    year: action.payload.year,
                });
            }

            if (!appendedYearTax && action.payload.tax > 0) {
                chartYears.push({
                    summa: action.payload.tax,
                    type: "Налог",
                    year: action.payload.year,
                });
            }

            return { ...state, chartMonths, chartYears }

        // case ACTIONS.APPEND_YEARS_DATA:
        //     return { ...state, chartYears: action.payload }

        default:
            return state;
    }
}
import 'react-tabulator/css/tabulator_bootstrap3.css';
import { ReactTabulator } from 'react-tabulator';



function MarketTable ({ data, current_market, setMarket }) {

    // Nếu số dương thì màu XANH, âm thì màu ĐỎ
    const update_percentage_color = (cell) => {
        let cell_percentage = cell.getValue();
        
        if (cell_percentage < 0) { cell.getElement().style.color = "rgb(185, 28, 27)"; }
        else { cell.getElement().style.color = "rgb(23, 128, 61)"; }

        return cell_percentage + "%";
    }

    // Định nghĩa, định dạng headers của các cột
    const columns = [
        {
            title: "Thị trường",
            field: "market_symbol",
            width: 130,
            cellClick: (e, cell) => {
                setMarket(cell.getData().market_symbol);
            },
            formatter: (cell) => {
                //cell - the cell component
                //formatterParams - parameters set for the column
                //onRendered - function to call when the formatter has been rendered
                let cell_market = cell.getValue();
                if (cell_market === current_market) {
                    cell.getElement().style.fontWeight = "bold";
                }
                return cell.getValue();
            },
        },
        { title: "Giá", field: "price_close" },
        { title: "%D", field: "day", formatter: update_percentage_color },
        { title: "%W", field: "week", formatter: update_percentage_color },
        { title: "%M", field: "month", formatter: update_percentage_color },
        { title: "%3M", field: "three_month", formatter: update_percentage_color },
        { title: "Y", field: "year", formatter: update_percentage_color }
    ];
    const market_table = [];

    // Đây là hàm để group by key
    let groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };

    // Sau khi group theo market_symbol, ta duyệt từng group
    // Mỗi group là một hàng dữ liệu
    // Hàm forEach sẽ tính toán số lượng từng Market trong trong từng group
    // Và push vào mảng json market_table
    let groupedByMarket = groupBy(data, 'market_symbol')

    const markets = Object.keys(groupedByMarket)
    console.log(groupedByMarket)
    markets.forEach(key => {
        let by_market = groupedByMarket[key]

        by_market = by_market.map(item => ({
            ...item,
            trading_date: new Date(item.trading_date).getTime()
        }));

        by_market.sort((a, b) => b.trading_date - a.trading_date);

        const price_close = by_market.map(item => item.price_close);

        const priceDiff = (i) => {
            return ((price_close[0] - price_close[i]) / price_close[i] * 100).toFixed(2)
        };

        const market_row = {
            market_symbol: key,
            price_close: price_close[0],
            day: priceDiff(1),
            week: priceDiff(5),
            month: priceDiff(20),
            three_month: priceDiff(60),
            year: priceDiff(240)
        };

        market_table.push(market_row)
    });



    return (
        <ReactTabulator
            data={market_table}
            columns={columns}
            layout="fitColumns"
            height="350px"
        />
    );
}

export default MarketTable;
$().ready(function() {
    $("#btnSbmt").click(function() {
        let quantity = [];

        quantity[0] = parseFloat($("#tv_sold").val());
        quantity[1] = parseFloat($("#vrc_sold").val());
        quantity[2] = parseFloat($("#rem_con_sold").val());
        quantity[3] = parseFloat($("#cd_sold").val());
        quantity[4] = parseFloat($("#tp_rec_sold").val());

        let unit_price = [400.00, 220.00, 35.20, 300.00, 150.00];
        let total_price = [];
        let sub_total = 0.00;

        for (let i = 0; i < unit_price.length; i++) {
            total_price[i] = unit_price[i] * quantity[i];
            sub_total += total_price[i];
        }

        let tax = sub_total * 0.0825;

        let total = sub_total + tax;

        $("#tv_entry").html(`<td>${quantity[0]}</td> <td>TV</td> <td>${unit_price[0].toFixed(2)}</td> <td>${total_price[0].toFixed(2)}</td>`)
        $("#vrc_entry").html(`<td>${quantity[1]}</td> <td>VRC</td> <td>${unit_price[1].toFixed(2)}</td> <td>${total_price[1].toFixed(2)}</td>`)
        $("#rem_con_entry").html(`<td>${quantity[2]}</td> <td>Remote Controller</td> <td>${unit_price[2].toFixed(2)}</td> <td>${total_price[2].toFixed(2)}</td>`)
        $("#cd_entry").html(`<td>${quantity[3]}</td> <td>CD</td> <td>${unit_price[3].toFixed(2)}</td> <td>${total_price[3].toFixed(2)}</td>`)
        $("#tp_rec_entry").html(`<td>${quantity[4]}</td> <td>Tape Recorder</td> <td>${unit_price[4].toFixed(2)}</td> <td>${total_price[4].toFixed(2)}</td>`)

        $("#sales_table").append(`
            <tr id="sub_total_entry">
                <td colspan="2"></td> <!-- Empty first 2 columns -->
                <td>SUBTOTAL</td> 
                <td><strong>${sub_total.toFixed(2)}</strong></td>
            </tr>
            <tr id="tax_entry">
                <td colspan="2"></td>
                <td>TAX</td>
                <td><strong>${tax.toFixed(2)}</strong></td>
            </tr>   
            <tr id="total_entry">
                <td colspan="2"></td>
                <td>TOTAL</td>
                <td><strong>${total.toFixed(2)}</strong></td>
            </tr>
        `);
    });
});
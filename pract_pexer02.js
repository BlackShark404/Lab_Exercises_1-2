$().ready(function() {
    $("#bntSbmt").click(function() {
        let item_price = parseFloat($("#item_price").val()) * 100;
        let tendered_amount = parseFloat($("#tendered_amount").val()) * 100;

        let change = tendered_amount - item_price;

        $("#change").html((change/100).toFixed(2));

        let coins = [2000, 1000, 500, 100, 25, 10, 5];
        let results = [0, 0, 0, 0, 0, 0, 0];

        for(let i = 0; i < coins.length; i++) {
            results[i] = Math.floor(change / coins[i]);
            change %= coins[i];
        }

        $("#p20").text(results[0]);
        $("#p10").text(results[1]);
        $("#p5").text(results[2]);
        $("#p1").text(results[3]);
        $("#c25").text(results[4]);
        $("#c10").text(results[5]);
        $("#c05").text(results[6]);

    });
});
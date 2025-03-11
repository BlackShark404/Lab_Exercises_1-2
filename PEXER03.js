function convertTo12HourFormat(hours, minutes) {
    let period = hours >= 12 ? 'PM' : 'AM';
    let twelveHour = hours % 12;
    twelveHour = twelveHour === 0 ? 12 : twelveHour;
    return `${twelveHour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
}

$().ready(function() {

    $("#calculateCharge").click(function() {
        const MAX_MINUTES = 60;

        const CAR_FREE_HOURS = 3;
        const CAR_EXTRA_HOUR_RATE = 10.00;

        const TRUCK_INITIAL_HOURS = 2;
        const TRUCK_INITIAL_RATE = 30.00;
        const TRUCK_EXTRA_HOUR_RATE = 15.25;

        const BUS_INITIAL_HOURS = 1;
        const BUS_INITIAL_RATE = 60.00;
        const BUS_EXTRA_HOUR_RATE = 30.15;

        let vehicleType = $("#vehicleType").val();
        let entryHours = parseInt($("#entryHours").val());
        let entryMinutes = parseInt($("#entryMinutes").val());
        let exitHours = parseInt($("#exitHours").val());
        let exitMinutes = parseInt($("#exitMinutes").val());

        if (!vehicleType) {
            alert("Error: Please select a vehicle type.");
            return;
        }

        if (
            isNaN(entryHours) || entryHours < 0 || entryHours > 23 ||
            isNaN(entryMinutes) || entryMinutes < 0 || entryMinutes > 59 ||
            isNaN(exitHours) || exitHours < 0 || exitHours > 23 ||
            isNaN(exitMinutes) || exitMinutes < 0 || exitMinutes > 59
        ) {
            alert("Error: Please enter valid time values.\nHours: 0-23\nMinutes: 0-59");
            return;
        }

        let entryTotalMinutes = (entryHours * MAX_MINUTES + entryMinutes);
        let exitTotalMinutes = (exitHours * MAX_MINUTES + exitMinutes);

        if (exitTotalMinutes < entryTotalMinutes) {
            alert("Error: No vehicle is allowed to stay past midnight.");
            return;
        }

        let totalMinutes = exitTotalMinutes - entryTotalMinutes;
        let totalRoundedHours = Math.ceil(totalMinutes/MAX_MINUTES);

        let parkTimeHours = Math.floor(totalMinutes / MAX_MINUTES);
        let parkTimeMinutes = totalMinutes % MAX_MINUTES;

        let totalCharges = 0.00;
        
        switch(vehicleType) {
            case "Car":
                totalCharges = totalRoundedHours <= CAR_FREE_HOURS
                    ? 0.00
                    : (totalRoundedHours - CAR_FREE_HOURS) * CAR_EXTRA_HOUR_RATE;
                break;

            case "Truck":
                totalCharges = totalRoundedHours <= TRUCK_INITIAL_HOURS
                    ? totalRoundedHours * TRUCK_INITIAL_RATE 
                    : (TRUCK_INITIAL_HOURS * TRUCK_INITIAL_RATE) + ((totalRoundedHours - TRUCK_INITIAL_HOURS) * TRUCK_EXTRA_HOUR_RATE);
                break;

            case "Bus":
                totalCharges = totalRoundedHours <= BUS_INITIAL_HOURS
                    ? totalRoundedHours * BUS_INITIAL_RATE
                    : BUS_INITIAL_RATE + ((totalRoundedHours - BUS_INITIAL_HOURS) * BUS_EXTRA_HOUR_RATE);
                break;

            default:
                totalCharges = 0;
        }

        let formattedTimeIn = convertTo12HourFormat(entryHours, entryMinutes);
        let formattedTimeOut = convertTo12HourFormat(exitHours, exitMinutes);   
        let formattedParkingTime = `${parkTimeHours.toString().padStart(2, '0')}:${parkTimeMinutes.toString().padStart(2, '0')}`;
        
        $("#typeOfVehicle").text(vehicleType);
        $("#timeIn").text(formattedTimeIn);
        $("#timeOut").text(formattedTimeOut);

        $("#parkingTime").text(formattedParkingTime);
        $("#roundedTotal").text(totalRoundedHours);

        $("#totalCharges").text(totalCharges.toFixed(2));
    });

    
});
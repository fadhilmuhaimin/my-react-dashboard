const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export const mapDealsData = (data) => {
    if (!data || !data.data || !data.data.dealStages) {
        console.error("Invalid data structure:", data);
        return [];
    }
    
    const { dealStages } = data.data;
    const aggregatedData = {};

    // Iterate through each deal stage
    dealStages.nodes.forEach((stage) => {
        const state = stage.id === "5" ? "Won" : "Lost";

        // Aggregate deals
        stage.dealsAggregate.forEach((deal) => {
            const month = deal.groupBy.closeDateMonth;
            const year = deal.groupBy.closeDateYear;
            const value = deal.sum.value;
            const timeText = `${monthNames[month - 1]} ${year}`;

            // Initialize the timeText entry if it doesn't exist
            if (!aggregatedData[timeText]) {
                aggregatedData[timeText] = { timeText, wonValue: 0, lostValue: 0 };
            }

            // Assign values based on state
            if (state === "Won") {
                aggregatedData[timeText].wonValue += value;
            } else if (state === "Lost") {
                aggregatedData[timeText].lostValue += value;
            }
        });
    });

    // Convert the aggregated data object to an array
    const result = Object.values(aggregatedData);

    console.log("Mapped data for chart:", result); // Log the final chart data
    return result;
};

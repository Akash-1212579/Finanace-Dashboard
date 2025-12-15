const prisma = require("../config/db.config");

async function getTransactionsByDateRange({userId,from,to}) {

    const whereClasue = {
        userId,
        date:{
            gte:new Date(from),
            lte : new Date(to)
        }
    }
    const dateRangeTransactions = await prisma.transaction.findMany({
        where:whereClasue,
        orderBy:{
            date:"desc"
        }
    });
    return dateRangeTransactions;
}

module.exports = {getTransactionsByDateRange};
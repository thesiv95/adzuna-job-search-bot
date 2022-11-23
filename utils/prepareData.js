
const { DateTime } = require('luxon');

const formatDate = (datetimeTS) => {
    const dt = DateTime.fromISO(datetimeTS);
    return dt.setLocale('en-gb').toLocaleString(DateTime.DATETIME_SHORT);
}

const prepareData = (data) => {
    try {
        if (!data) return '';
        const { results } = data;

        return results.map((result) => `
*Publication date:* ${formatDate(result.created)}

*Company:* ${result.company.display_name}
*Category:* ${result.category.label}

*Location:* ${result.location.display_name}

*Title:* ${result.title}
*Description*: ${result.description}

[Link to the job page](${result.redirect_url})
        `)
    } catch (error) {
        console.error(error);
    }
}

module.exports = prepareData;
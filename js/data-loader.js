/**
 * Fetches and parses CSV data from a URL.
 * @param {string} url - The URL of the CSV file.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of objects representing the CSV rows.
 */
async function fetchCSVData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch data from ${url}: ${response.statusText}`);
        }
        const csvText = await response.text();
        return parseCSV(csvText);
    } catch (error) {
        console.error("Error loading CSV data:", error);
        return [];
    }
}

/**
 * Parses CSV text into an array of objects.
 * Assumes the first row contains headers.
 * Handles quoted fields containing commas.
 * @param {string} csvText - The raw CSV text.
 * @returns {Array<Object>} - Array of data objects.
 */
function parseCSV(csvText) {
    const lines = csvText.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length < 2) return [];

    const headers = parseCSVLine(lines[0]);
    const data = [];

    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        if (values.length === headers.length) {
            const entry = {};
            for (let j = 0; j < headers.length; j++) {
                entry[headers[j].trim()] = values[j].trim();
            }
            data.push(entry);
        }
    }
    return data;
}

/**
 * Helper to parse a single CSV line, handling quotes.
 * @param {string} text 
 * @returns {Array<string>}
 */
function parseCSVLine(text) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];

        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current);
    return result;
}

const express =reqire('express')
const cors=require('cors')
const app =express()
const PORT =3000;

app.use(express.json());

const WINDOW_SIZE =10;
let numbersWindow=[];

const fetchNumbers =(type) => {
    if(type ==='p') return [2,3,5,7,11];
    if(type==='f') return [1,1,2,3,5];
    if(type==='e') return [2,4,6,8,10];
    if(type==='r') return[4,7,2,9,5];
    return [];
}

app.get('/numbers/:numberid', (req, res) => {
    const numberid = req.params.numberid;
    const validTypes = ['p', 'f', 'e', 'r'];

    if (!validTypes.includes(numberid)) {
        return res.status(400).json({ error: 'Invalid number type' });
    }

    const fetchedNumbers = fetchNumbers(numberid);
    const windowPrevState = [...numbersWindow];

    fetchedNumbers.forEach(number => {
        if (!numbersWindow.includes(number)) {
            if (numbersWindow.length >= WINDOW_SIZE) {
                numbersWindow.shift(); 
            }
            numbersWindow.push(number);
        }
    });

    const windowCurrState = [...numbersWindow];
    const avg = windowCurrState.length > 0 
                ? windowCurrState.reduce((a, b) => a + b, 0) / windowCurrState.length
                : 0;

    res.json({
        windowPrevState,
        windowCurrState,
        numbers: fetchedNumbers,
        avg
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
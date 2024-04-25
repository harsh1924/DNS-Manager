import app from './app.js';
import connectToDb from './Database/dbConfig.js'

const PORT = 5100;
app.listen(PORT, async() => {
    await connectToDb();
    console.log(`Server is running at PORT: ${PORT}`);
})


import dbConnect from '../../../utils/dbConnect'
import Cook from '../../../models/Cook'


export default async function handler(req, res){
    await dbConnect()
    const cook = new Cook(req.body)
    try {
        await cook.save();
    } catch (e) {
        console.log(e);
    }
    res.json(cook);
}
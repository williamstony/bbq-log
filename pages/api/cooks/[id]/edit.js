import dbConnect from '../../../utils/dbConnect'
import Cook from '../../../../models/Cook'

export default async function handler(req, res){
    const { query: {id}} = req
    await dbConnect()
    if (req.method === 'POST'){
    const cook = await Cook.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true
    }).exec()

    res.json(cook)
}
}
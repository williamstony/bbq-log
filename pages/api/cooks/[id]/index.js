import Cook from '../../../../models/Cook'

export default async function handler(req, res){
    const {query:{id}} = req
    const cook = await Cook.findById(id)
    res.json(cook);
}
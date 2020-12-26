import Cook from '../../../../models/Cook'

export default async function handler(req, res){
    const { query: {id}} = req
    if (req.method === 'POST'){
        let cook = await Cook.findOne({ _id: id })

        cook.cookLog.push(req.body)
    
        cook.save()
    
        res.json(cook)
    }
}
const adsSchema = require('./ads-model');
const companiesSchema = require('./companies-model');

const getData = (req, res) => {
    companiesSchema.aggregate([{
        $lookup: {
            from: 'ads',
            localField: '_id',
            foreignField: 'companyId',
            as: 'companyInfo'
        }
    }]).then(data => {
        res.status(200).send({ads: data, type: true});
    }).catch(err => {
        res.status(500).send("Internal Server Error");
    })
}

const getSearch = (req, res) => {

    adsSchema.aggregate([{
        $lookup: {
            from: 'comapnies',
            localField: 'companyId',
            foreignField: '_id',
            pipeline: [{
                $match: {
                    companyName: { $regex: req.query.text, $options: 'i' }
                }
            }],
            as: 'companyInfo'
        }
    }]).then(data => {
        let temp = data.filter((d) => {
            return d.companyInfo.length !== 0
        })
        if(temp.length !== 0) {
            res.status(200).send({ads: temp, type: false});
        } else {
            companiesSchema.aggregate([{
                $lookup: {
                  from: 'ads',
                  localField: '_id',
                  foreignField: 'companyId',
                  pipeline:[{$match: {
                    $or:[{primaryText:{$regex: req.query.text, $options:'i'}},
                    {headline:{$regex: req.query.text, $options:'i'}},
                    {description:{$regex: req.query.text, $options:'i'}}]
                  }}],
                  as: 'companyInfo'
                }
            }]).then(data => {
                let temp = data.filter((d)=>{
                    return d.companyInfo.length !== 0
                })
                res.status(200).send({ads: temp, type:true});
            })
        }
    })

    
}

module.exports = {
    getData,
    getSearch
}


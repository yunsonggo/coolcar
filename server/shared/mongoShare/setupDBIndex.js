// 为mongodb中字段添加索引 在数据库客户端运行一次就设置成功
// 实现同一个状态下只能有一个在线
// 比如同一个用户只能有一个进行中的行程

// account表创建索引
/****
db.account.createIndex({
    open_id: 1, // 1 表示 从小到大
},{
    unique:true,
})

// trip表创建索引
db.trip.createIndex({
    "trip.accountid":1, // 1 表示 从小到大
    "trip.status":1, // 1 表示 从小到大
},{
    unique:true,
    partialFilterExpression:{
        "trip.status":1, // trip.status的值是1
    }
})
**/

db.account.createIndex({
    open_id: 1,
},{
    unique:true,
})

db.trip.createIndex({
    "trip.accountid":1,
    "trip.status":1,
},{
    unique:true,
    partialFilterExpression:{
        "trip.status":1,
    }
})

db.profile.createIndex({
    "accountid" : 1,
},{
    unique:true,
})

db.gun.createIndex({
    "cardid" : 1,
},{
    unique:true,
})

db.gun.insertMany([
    {
        "_id": ObjectId("60af01e5a21ead3dccbcd1d8"),
        "gun": {
            "status": 1,
            "position": {
                "latitude": 35.77745,
                "longitude": 115.03732
            },
            "type": "AC-97",
            "class": "押运一大队",
            "cardid": "202101234567890001"
        }
    },
    {
        "_id": ObjectId("60af01e5a21ead3dccbcd1d9"),
        "gun": {
            "status": 1,
            "position": {
                "latitude": 35.77745,
                "longitude": 115.03732
            },
            "type": "AC-97",
            "class": "押运一大队",
            "cardid": "202101234567890002"
        }
    },
    {
        "_id": ObjectId("60af01e5a21ead3dccbcd1da"),
        "gun": {
            "status": 1,
            "position": {
                "latitude": 35.77745,
                "longitude": 115.03732
            },
            "type": "AC-97",
            "class": "押运一大队",
            "cardid": "202101234567890003"
        }
    },
    {
        "_id": ObjectId("60af01e5a21ead3dccbcd1db"),
        "gun": {
            "status": 1,
            "position": {
                "latitude": 35.77745,
                "longitude": 115.03732
            },
            "type": "AC-97",
            "class": "押运一大队",
            "cardid": "202101234567890004"
        }
    },
    {
        "_id": ObjectId("60af01e5a21ead3dccbcd1dc"),
        "gun": {
            "status": 1,
            "position": {
                "latitude": 35.77745,
                "longitude": 115.03732
            },
            "type": "AC-97",
            "class": "押运一大队",
            "cardid": "202101234567890005"
        }
    },
])

db.trip.deleteOne({
    "_id":ObjectId("11111")
})
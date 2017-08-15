host = "120.76.239.104",
port = "21520",
username = "suzao",
password = "T!7jKFeR3NMre4^q",
dbname = "suzaodata_test"
tablename = 'sz_news_gather'

exports.db = `postgres://${username}:${password}@${host}:${port}/${dbname}`

exports.table = tablename

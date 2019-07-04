/*import mongoose from 'mongoose';
let url : string = 'mongodb+srv://caleb:Misael15@cluster0-aqv0w.mongodb.net/test?retryWrites=true';
export const connectDB = () => {
    mongoose.connect(url, {useNewUrlParser: true})
        .then(() => {
            return console.info('Successfully connected to AtlasDB')
        })
        .catch(error => {
          console.error('Error connecting to AtlasDB', error)
          return process.exit(1);
        });
    mongoose.connection.on('disconnected', connectDB)
};*/

import mongoose from 'mongoose'

type TInput = {
    db : string
}

export default ({db} : TInput) => {
    const connect = () => {
        mongoose.connect(db, {useNewUrlParser : true})
            .then(() => {
                return console.info('Successfully connected to AtlasDB')
            })
            .catch(error => {
                console.error('Error connecting to AtlasDB', error)
                return process.exit(1)
            })
    }
    connect()
    mongoose.connection.on('disconected', connect)
}
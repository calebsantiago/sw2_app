import mongoose from 'mongoose';
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
};
import { Schema, model } from "mongoose";

const domainSchema = new Schema({
    name: String,
    type: {
        type: String,
        enum: ['A', 'AAAA', 'CNAME', 'MX', 'NS', 'PTR', 'SOA', 'SRV', 'TXT', 'DNSSEC', 'undefined']
    },
    ttl: Number,
    data: {
        type: String,
    }
});

const domainModel = model('Domains', domainSchema);
export default domainModel;
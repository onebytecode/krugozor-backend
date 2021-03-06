import { assert, expect } from 'chai';
import * as Mongoose from 'mongoose';
import { clearDb } from 'mongo-interlude';
import { Visit } from './visit.model';
import { Visitor } from './visitor.model';

describe('Visit model tests', () => {
    afterEach(async () => {
        await clearDb({
            mongoose: Mongoose,
            silent: true 
        })
    })

    it ('should start visit', async () => {
        const visitor = await Visitor.create({
            fname: 'Ivan',
            email: 'ivan@mail.ru',
            phoneNumber: '8-880-888-88-88'
        })
        const visit = await Visit.start({ visitorId: visitor._id })
        const uVisitor = await Visitor.find({ _id: visitor._id })
        
        expect(visit.visitorId).to.be.equal(visitor._id)
        expect(visit.startDate).to.not.be.undefined
        expect(visit.endDate).to.be.undefined
        expect(uVisitor.currentVisit).to.deep.equal(visit._id)
        expect(uVisitor.visitsHistory[0]).to.be.undefined;
    })

    it ('should stop visit', async () => {
        const visitor = await Visitor.create({
            fname: 'Ivan',
            email: 'ivan@mail.ru',
            phoneNumber: '8-880-888-88-88'
        })
        await Visit.start({ visitorId: visitor._id })
        const visit = await Visit.stop({ visitorId: visitor._id })
        const uVisitor = await Visitor.find({ _id: visitor._id })

        expect(visit.visitorId).to.deep.equal(visitor._id)
        expect(visit.startDate).to.not.be.undefined
        expect(visit.endDate).to.not.be.undefined 
        expect(uVisitor.currentVisit).to.be.undefined 
        expect(uVisitor.visitsHistory[0]).to.deep.equal(visit._id)
    })

    it ('should get duration time', async () => {
        const visitor = await Visitor.create({
            fname: 'Ivan',
            email: 'ivan@mail.ru',
            phoneNumber: '8-880-888-88-88'
        })
        await Visit.start({ visitorId: visitor._id })
        await Visit.stop({ visitorId: visitor._id })
        const visit = await Visit.find({ visitorId: visitor._id })

        expect(visit.duration).to.be.a('number')
        expect(visit.duration).to.not.be.undefined
    })
})
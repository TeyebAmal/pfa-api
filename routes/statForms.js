import express from 'express';
import {addForm,findById, findFormByUserId } from '../models/formModel.es6';

const router = express.Router();

router.route('/stat')
    .post((req, res) => {
        addForm(req.body).then(job => {
            res.json({ job: job })
        }).catch(err => {
            console.log(err);
            res.send(err)
        })
    });
    
router.route('/stat/:id')
    .get((req, res) => {
        findById(req.params.id).then(job => {
            res.json({ job: job })
        }).catch(err => {
            console.log(err);
            res.send(err)
        })
    });
    router.route('/statByUserId/:id')
    .get((req, res) => {
        findFormByUserId(req.params.id).then(job => {
            res.json({ job: job })
        }).catch(err => {
            console.log(err);
            res.send(err)
        })
    });
    

export default router;
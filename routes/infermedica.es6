import express from "express";
import Infermedica from "infermedica";

const infermedica = new Infermedica({
  appId: "883e0e11",
  appKey: "f2b420e13d1008dc721c78f469c73a10",
});

var router = express.Router();


router.post("/message", (req, res) => {
  console.log(req.body);
  infermedica
    .getSearch({
      phrase: req.body.message,
      sex: "male",
      maxResults: 10,
      type: "symptom",
    })
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    });
});

router.get("/getsymptomes/:id", (req, res) => {
  infermedica.getSymptom(req.params.id).then((symptom) => {
      res.status(200).json({ symptom });
  });
});

router.post("/postsymptomes", (req, res) => {
  infermedica.postDiagnosis(req.body).then((result) => {
    res.status(200).json(result)
  }).catch(err => console.log(err))
});

router.post('/getSearch', (req, res) => {
  infermedica.postParse(req.body).then(search => {
    res.status(200).json(search)
}).catch(err =>res.status(500).send({err}))
})

export default router;

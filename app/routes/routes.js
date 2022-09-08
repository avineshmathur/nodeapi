const bodyParser = require("body-parser");
module.exports = (app) => {
    var jsonParser = bodyParser.json();
    const controller = require("../controller/controller.js");
    app.post("/loginDetails", jsonParser, controller.create);
    app.get("/getDetails", jsonParser, controller.find);
    app.get("/getoneDetails/:id", jsonParser, controller.findOne);
    app.put("/updateRecord/:id", jsonParser, controller.update);
    app.post("/insertDataIntoBc", jsonParser, controller.insertion);
   app.get("/getDataIntoBc", jsonParser, controller.fetching);
}
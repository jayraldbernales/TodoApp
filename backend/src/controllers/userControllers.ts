import express from 'express'
const UserControllers = {

    //do something here

    init: (req:express.Request, res:express.Response) => {

        try {
            
            res.status(200).json({ test: "this is test" });

            
        } catch (error) {

            return res.status(400).json({ error: "Error"});
        }
    }
    
}

export default UserControllers
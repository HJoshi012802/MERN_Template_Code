import { Request, Response, NextFunction } from 'express';
import { jwtDecode } from "jwt-decode";

interface RoleCheckOptions {
  allowedRoles: string[];
}
const checkRole = (options: RoleCheckOptions) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.cookies.authToken ;   
    const refreshToken = req.cookies.refreshToken ;

    if(!authToken || !refreshToken){
        return res.status(401).json({message : " Authentication Failed : No authToken or refreshToken is provided "})
    }

    try{
        const decoded:any = jwtDecode(authToken);
        const { allowedRoles } = options;
        const isAllowed = allowedRoles.includes(decoded.role);
        
        if(!isAllowed){
            res.status(500).send("You Don't Have Access to This Resource")
        }else{
            req.genid=decoded.genid;
            console.log("next()");
            next();
        }
    }catch{
        res.status(400).send(`You Don't Have Access to This Resource`)
    }
  };
};
export { checkRole };


const checkaccess = (options: RoleCheckOptions) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.params.key ;   

    if(!authToken){
        return res.status(401).json({message : " Access Failed : No access Key is provided "})
    }

    try{
        const decoded:any = jwtDecode(authToken);
        const { allowedRoles } = options;
        const isAllowed = allowedRoles.includes(decoded.role);
        
        if(!isAllowed){
            res.status(500).send("You Don't Have Access to This Resource")
        }else{
            req.genid=decoded.genid;
            next();
        }
    }catch{
        res.status(400).send(`You Don't Have Access to This Resource`)
    }
  };
};
export { checkaccess };

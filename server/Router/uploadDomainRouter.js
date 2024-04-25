import { Router } from "express";
import { deleteDomain, getAllDomains, updateDomain, uploadDomain, uploadDomainManually } from "../Controller/uploadDomainController.js";
import { authorizeRoles, isLoggedIn } from "../Middleware/authMiddleware.js";

const uploadDomainRouter = Router();

uploadDomainRouter.route('/upload')
    .post(isLoggedIn, authorizeRoles('ADMIN') ,uploadDomain);
uploadDomainRouter.route('/upload-manually')
    .post(isLoggedIn, authorizeRoles('ADMIN') ,uploadDomainManually);
uploadDomainRouter.route('/domains')
    .get(isLoggedIn, getAllDomains);
uploadDomainRouter.route('/edit/:id')
    .put(isLoggedIn, updateDomain);
uploadDomainRouter.route('/delete/:id')    
    .delete(isLoggedIn, deleteDomain);

export default uploadDomainRouter;
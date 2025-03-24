import express from "express";
import uploadFile, { isAuth } from "./middleware.js";
import { addAlbum, addSongs, addThumbnail, deleteAlbum, deleteSong } from "./controller.js";


const router =  express.Router();


router.post('/album/new',isAuth,uploadFile,addAlbum);
router.post('/song/new',isAuth,uploadFile,addSongs);
router.post('/song/:id',isAuth,uploadFile,addThumbnail);
router.post('/album/:id',isAuth,uploadFile,deleteAlbum);
router.delete('/album/:id',isAuth,uploadFile,deleteAlbum);
router.delete('/song/:id',isAuth,uploadFile,deleteSong);











export default router;

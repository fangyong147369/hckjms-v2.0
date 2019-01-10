'use strict'
const Busboy = require('busboy')
const fs=require('fs');

/**
 * 图片上传
 * @param ctx
 * @param next
 * @returns {Promise<*>}
 */
exports.uploadImage=async (ctx,next)=>{
    let result=await uploadImage(ctx);
    return ctx.body=result;
}

function uploadImage (ctx){
    const _emmiter = new Busboy({headers: ctx.req.headers});
    let fstream;
    return new Promise((resolve, reject) => {
        _emmiter.on('file', function (fieldname, file, filename, encoding, mimetype) {
            let name = new Date().getTime() + filename.match(/(\.\w+)$/)[1];
            let newFilename = "/upload/" + (new Date().getMonth() + 1) + name;
            let path = "../static" + newFilename;
            let filesize = 0;
            file.pipe(fs.createWriteStream(path))
            file.on('end', function () {
                resolve(JSON.stringify({
                    "originalName": filename,
                    "name": name,
                    "url": newFilename,
                    "size": filesize,
                    "type": 'image',
                    "state": "SUCCESS"
                }));
            })
            file.on('data', function (data) {
                filesize = data.length;
            });
        })

        _emmiter.on('finish', function () {
            console.log('finished...')
        })

        _emmiter.on('error', function (err) {
            console.log('err...')
            reject(err)
        })
        ctx.req.pipe(_emmiter)
    });
}
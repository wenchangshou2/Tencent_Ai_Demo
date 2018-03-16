import { randomStr, getReqSign } from './utils.js'
import ImageCompressor from 'image-compressor.js';
// const webcam=require('webcamjs')
import webcamjs from 'webcamjs'
var qs = require('qs');
let arr=[]
require('./webcam.js')
console.log(11,webcam);

var imgBase64 = ''
function init() {
    // navigator.mediaDevices.enumerateDevices()
    //     .then(function (devices) {
    //         devices.forEach(function (device) {
    //             arr.push(device.deviceId)
    //         })
    //     })
    // var video=document.getElementById('video')
    // if(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia){
    //     navigator.mediaDevices.getUserMedia({
    //         // 'video':{
    //         //     optional:[{
    //         //         sourceId:arr[3]
    //         //     }]
    //         // }
    //         video:{
    //           width:{exact:320},
    //           height:{exact:240}
    //         }
    //     }).then(function(stream){
    //         video.src=window.URL.createObjectURL(stream)
    //         video.play()
    //     })
    // }
}
window.onload = function () {
    let img_upload = document.getElementById('img_upload');
    // let btn = document.getElementById('btn1')
    // let base64_code = document.getElementById('base64_code');
    // let img_area = document.getElementById('img_area');
    var canvas = document.getElementById('canvas')
    var context = canvas.getContext('2d')
    var video = document.getElementById('video')
    img_upload.addEventListener('change', readFile, false);
    // btn.addEventListener('click', requestImage, false)
    document.getElementById('video').addEventListener('click',function(){
        context.drawImage(video,0,0,320,240)
         let img=canvas.toDataURL().replace(/data:image\/png;base64,/,'')
         // img=canvas.toDataURL().replace(/data:image\/jpg;base64,/,'')
         // img=canvas.toDataURL().replace(/data:image\/png;base64,/,'')
        requestImage(img)
    })
    init();
}

function requestImage(img) {
    let reqJson = {
        app_id: '1106689245',
        time_stamp: parseInt(Date.now() / 1000),
        nonce_str: randomStr(),
        // text:'wenchangshou',
        'image': img,
    }
    let options={
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    reqJson['sign'] = getReqSign(reqJson, 'm5hJR9KzN7RNmi0w')
    let url = Object.keys(reqJson).map(function(k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(reqJson[k])
    }).join('&')
    axios.post('/fcgi-bin/ocr/ocr_generalocr', url,options).then(function (response) {
        if(response.data.ret===0){
            response.data.data.item_list.forEach(function(k,v){
              // console.log('11',k,v)
              alert(k.itemstring)
            })
            // alert(JSON.stringify(response.data.item_list[0]))
        }else{
            alert('error:'+response.data.ret)
        }
        // console.log('data', response);
    })
        .catch(function (err) {
            console.log('err', err);
            alert('err:'+err)
        })

}

function readFile() {
    let file = this.files[0]
    console.log('file',file);
    if (!/image\/\w+/.test(file.type)) {
        alert("请确保文件为图像类型");
        return false;
    }
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        requestImage(this.result.replace(/data:image\/jpeg;base64,/,''))
    }
    // new ImageCompressor(file,{
    //     quality:.2,
    //     success(result){
    //         // console.log('file',result.getBlob())
    //         const formData = new FormData();
    //         formData.append('file', result, result.name);
    //         console.log('result',formData)

    //     }
    // })
}

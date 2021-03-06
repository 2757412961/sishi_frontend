import AWS from 'aws-sdk';
import { openNotificationWithIcon } from '@utils/common.js';

export default function s3Upload({
                                   ak, // 上传用到的sk
                                   sk, // 上传用到的ak
                                   server, // 上传的桶所在的域名
                                   bucketName, // 上传的桶名
                                   absolutePath, // 存储在obs上的位置
                                   file, // 文件本体
                                   defProgress, // 进度条函数
                                   callback, // 上传文件后的正确返回
                                   permission,
                                   securityToken,
                                 }) {
  let config = {
    apiVersion: '2006-03-01',
    accessKeyId: ak,
    secretAccessKey: sk,
    endpoint: bucketName+"."+server,
    sslEnabled: false,
    s3ForcePathStyle: true,
    region: '',
  };
  AWS.config.update(config);
  // Use S3 ManagedUpload class as it supports multipart uploads
  let upload = new AWS.S3.ManagedUpload({
    params: {
      // Bucket: bucketName + '/' + absolutePath,
      Bucket: absolutePath,
      Key: file.name,
      Body: file,
      ACL: permission,
    },
  });
  upload.on('httpUploadProgress', function(progress) {
    defProgress(progress);
  });
  let promise = upload.promise();
  promise.then(
    function(data) {
      console.log(data);
      openNotificationWithIcon(200, `${file.name}上传成功`);
      callback();
    },
    function(err) {
      openNotificationWithIcon(500, `${file.name}上传失败`);
    },
  );
}

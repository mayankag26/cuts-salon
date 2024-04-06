import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";


const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});


async function uploadFileToS3(file,filename){
    const fileBuffer = file;
    // console.log(filename);

    const params = {
        Bucket : process.env.AWS_BUCKET_NAME,
        Key : `${filename}-${Date.now()}`,
        Body : fileBuffer,
        ContentType: "image/jpeg"
    } 

    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    return filename;
}

export async function POST(request){
    try{
        const formData = await request.formData();
        const file = formData.get("file");

        if(!file){
            return NextResponse.json({error:"File is required"},{status:400});
        }
        // console.log(file);

        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = await uploadFileToS3(buffer,file.name);
        console.log(fileName);
        const imageUrl = `${fileName}-${Date.now()}`;
        console.log(imageUrl);

        return NextResponse.json({success:true,imageUrl})

    }catch(error){
        return NextResponse.json({error:"Error uploading file",error});
    }
}
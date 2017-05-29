Create bucket

Upload files

Change bucket permissions:
{
    "Version": "2012-10-17",
    "Id": "S3PolicyIPRestrict",
    "Statement": [
        {
            "Sid": "IPAllow",
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Action": [
                "s3:List*",
                "s3:GetObject"
            ],
            "Resource": "arn:aws:s3:::myjgbucket/*",
            "Condition": {
                "IpAddress": {
                    "aws:SourceIp": [
                        "1.1.1.1/32",
                        "2.2.2.2/32"
                    ]
                }
            }
        }
    ]
}

Allow CORS:
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <CORSRule>
        <AllowedOrigin>https://s3-eu-west-1.amazonaws.com</AllowedOrigin>
        <AllowedMethod>GET</AllowedMethod>
        <MaxAgeSeconds>3000</MaxAgeSeconds>
        <AllowedHeader>Authorization</AllowedHeader>
    </CORSRule>
</CORSConfiguration>

Create Cognito Identity pool:
 Cognito -> federated -> Create identity pool

Use Amazon app id:
amzn1.application.188a56d827a7d6555a8b67a5d

Create restricted IAM role to be able to sync Cognito after Cognito is done:
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "mobileanalytics:PutEvents",
                "cognito-sync:*"
            ],
            "Resource": [
                "*"
            ]
        },
        {
            "Sid": "DynamoDBAccess",
            "Effect": "Allow",
            "Action": [
                "dynamodb:BatchGetItem",
                "dynamodb:DescribeStream",
                "dynamodb:DescribeTable",
                "dynamodb:GetItem",
                "dynamodb:GetRecords",
                "dynamodb:GetShardIterator",
                "dynamodb:ListStreams",
                "dynamodb:Query",
                "dynamodb:Scan"
            ],
            "Resource": [
                "arn:aws:dynamodb:eu-west-1:547643024202:table/good-test1"
            ]
        }
    ]
}


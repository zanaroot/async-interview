# Async interview

## Docker environment

Here's the process to launch this project with docker.

Refer to the `bash` script if you have some limitation through docker in your machine.

### Prepare

```bash
bash 1.prepare.sh
```

### Build

```bash
bash 2.build.sh
```

### Start

```bash
bash 3.start.sh
```

### Run

```bash
bash 4.run.sh
```

### Stop

```bash
bash 5.stop.sh
```


## Environment variables

You don't need to create any extra file. It will be automatically loaded if you use docker.

## Minio

Minio is a S3 compatible object storage server. It is used to store media files.

#### Minio setup

Navigate to localhost:9000 and create a new bucket named `mybucket`.

#### Minio strategy

Inside `mybucket` set the following policy:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": ["s3:GetObject"],
            "Resource": "arn:aws:s3:::mybucket/*"
        },
        {
            "Effect": "Deny",
            "Principal": "*",
            "Action": [
                "s3:PutObject",
                "s3:DeleteObject",
                "s3:AbortMultipartUpload"
            ],
            "Resource": "arn:aws:s3:::mybucket/*"
        }
    ]
}
```

### Minio configuration

| Name | Value |
| --- | --- |
| MINIO_ACCESS_KEY | minio |
| MINIO_SECRET_KEY | password |
| MINIO_BUCKET_NAME | mybucket |
| MINIO_REGION | eu-central-003 |
| MINIO_DOMAIN | minio |

## Postgres

Postgres is a relational database management system.

### Postgres configuration

| Name | Value |
| --- | --- |
| POSTGRES_USER | root |
| POSTGRES_PASSWORD | password |
| POSTGRES_DB | next-app |

## Next.js

Next.js is a React framework for server-side rendering and static site generation.

### Next.js configuration

| Name | Value |
| --- | --- |
| NEXT_PUBLIC_MINIO_SSL | true |
| NEXT_PUBLIC_MINIO_DOMAIN | minio |
| NEXT_PUBLIC_MINIO_PORT | 9000 |
| NEXT_PUBLIC_MINIO_BUCKET_NAME | mybucket |
| NEXT_PUBLIC_MINIO_REGION | eu-central-003 |
| NEXT_PUBLIC_MINIO_ACCESS_KEY | minio |
| NEXT_PUBLIC_MINIO_SECRET_KEY | password |
| NEXT_PUBLIC_POSTGRES_USER | root |
| NEXT_PUBLIC_POSTGRES_PASSWORD | password |
| NEXT_PUBLIC_POSTGRES_DB | next-app |

## Contributors

- [@tchirubick](https://github.com/tchirubick)
- [@tophy](https://github.com/tophy)

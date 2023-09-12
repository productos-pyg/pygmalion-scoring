

Docker Local test
docker build -t pygma-score .
docker run -p 3000:3000 pygma-score



gcloud auth login
gcloud auth configure-docker

-----------
Artifacts:

-- Login
gcloud auth login

-- Create Repositorie
gcloud artifacts repositories create pygma-scoring-repo --repository-format=docker --location=us-east1

--Configure Auth
gcloud auth configure-docker us-east1-docker.pkg.dev

-- Build project
docker build -t us-east1-docker.pkg.dev/pygmalion-scoring-project/pygma-scoring-repo/pygma-scoring-image:1 .

-- Push project
docker push  us-east1-docker.pkg.dev/pygmalion-scoring-project/pygma-scoring-repo/pygma-scoring-image:1 

--source
https://www.cloudskillsboost.google/focuses/52830?parent=catalog

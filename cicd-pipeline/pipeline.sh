# MUST APPLY CHANGES TO CORRESPONDING FILE IN EC2 INSTANCE

if [ -z $1 ]
then
  echo "[ERROR] Empty branch name";
  echo "Exit building process";
  exit;
fi

if [ -z $2 ]
then
  echo "[ERROR] Empty .env";
  echo "Exit building process";
  exit;
fi

BRANCH_NAME=$1
DOT_ENV=$2

# Define a timestamp function
timestamp() {
  date +"%Y-%m-%d_%H-%M-%S" # current time
}

if [ ! -d "$BRANCH_NAME" ]
then
  git clone git@bitbucket.org:dapatvista/mypay-api-nodejs.git -b $BRANCH_NAME $BRANCH_NAME
fi
cd "$BRANCH_NAME"
git pull
echo $DOT_ENV | base64 --decode > .env
IMAGE_NAME="mypay-api:$(timestamp)"
SERVICE_NAME="mypay-api"
SERVICES=$(sudo docker service ls --filter name=$SERVICE_NAME --quiet | wc -l)
echo "BUILDING DOCKER IMAGE..."
sudo docker build -t $IMAGE_NAME .
if [[ "$SERVICES" -eq 0 ]]; then
  echo "CREATING SERVICE..."
  sudo docker service create --name $SERVICE_NAME -p 3030:3030 --replicas=1 $IMAGE_NAME;
  echo "SERVICE CREATED";
else
  echo "UPDATING SERVICE..."
  sudo docker service update --force --image $IMAGE_NAME $SERVICE_NAME
  echo "REMOVING EXITED DOCKER CONTAINER... "
  sudo docker rm $(sudo docker ps -aq --filter status=exited)
fi

sudo nginx -s reload
